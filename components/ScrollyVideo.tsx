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
                // We use a LERp factor of 0.1 for smooth inertia.
                // CRITICAL: We check !video.seeking to avoid hammering the decoder
                // which causes massive lag on non-keyframe videos.
                if (Math.abs(diff) > 0.01) {
                    // Only update if not currently busy seeking (unless difference is huge, then force it)
                    if (!video.seeking || Math.abs(diff) > 0.5) {
                        video.currentTime += diff * 0.1;
                    }
                } else if (Math.abs(diff) > 0.001) {
                    if (!video.seeking) {
                        video.currentTime = targetTimeRef.current;
                    }
                }
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(animationFrameId);
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
