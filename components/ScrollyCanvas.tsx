"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollYProgress } = useScroll();

    // Total frames in the sequence
    const frameCount = 219;

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    const indexStr = i.toString().padStart(3, "0"); // 000...218
                    img.src = `/sequence/frame_${indexStr}.webp`;

                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load frame ${i}`);
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Responsive Canvas Sizing
        // We rely on window dimensions here, which is standard for full screen canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Draw Image Cover logic
        // This effectively mimics object-fit: cover for the canvas context
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = canvas.height;
            drawWidth = drawHeight * imgRatio;
            offsetY = 0;
            offsetX = (canvas.width - drawWidth) / 2;
        } else {
            drawWidth = canvas.width;
            drawHeight = drawWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        // Map 0-1 scroll progress to frame index
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(latest * frameCount)
        );

        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Initial render after load
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            renderFrame(0);
        }
    }, [isLoaded, images]);

    // Handle Resize implies redrawing current frame, but MotionValue handles it on scroll.
    // Ideally we should add a resize listener to redraw the static frame when stopped.
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded && images.length > 0) {
                const currentScroll = scrollYProgress.get();
                const frameIndex = Math.min(frameCount - 1, Math.floor(currentScroll * frameCount));
                renderFrame(frameIndex);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, images, scrollYProgress]);


    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full object-cover"
            />
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-sans text-xs md:text-sm">
                    LOADING SEQUENCE...
                </div>
            )}
        </div>
    );
}
