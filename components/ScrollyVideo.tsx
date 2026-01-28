"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface ScrollyVideoProps {
    onLoaded: () => void;
}

export default function ScrollyVideo({ onLoaded }: ScrollyVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { scrollYProgress } = useScroll();

    // We use a ref to track the "target" time from scroll, 
    // so the animation loop can read it without re-rendering.
    const targetTimeRef = useRef(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            video.pause();
            onLoaded();
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        if (video.readyState >= 1) onLoaded();

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [onLoaded]);

    // Update target time whenever scroll changes
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const video = videoRef.current;
        if (video && video.duration) {
            targetTimeRef.current = latest * video.duration;
        }
    });

    // Animation Loop for Smooth Scrubbing (Lerp)
    useEffect(() => {
        let animationFrameId: number;

        const loop = () => {
            const video = videoRef.current;
            if (video && video.duration) {
                // Current deviation
                const diff = targetTimeRef.current - video.currentTime;

                // If difference is significant, move towards it
                // Adjusted to 0.25 for a balance of smoothness and responsiveness
                if (Math.abs(diff) > 0.01) {
                    video.currentTime += diff * 0.25;
                } else if (Math.abs(diff) > 0.001) {
                    // Snap if very close
                    video.currentTime = targetTimeRef.current;
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

}, []);

return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        <video
            ref={videoRef}
            src="/seq_mov.mov"
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
        />
    </div>
);
}
