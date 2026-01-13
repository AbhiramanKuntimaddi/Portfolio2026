"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const GlobalGlow = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Tightened radius (400px) and condensed Gaussian stops
    const smoothGradient = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `
            radial-gradient(
                400px circle at ${x}px ${y}px, 
                rgba(0, 89, 255, 0.15) 0%, 
                rgba(0, 89, 255, 0.08) 25%, 
                rgba(0, 89, 255, 0.02) 50%, 
                transparent 80%
            )
        `
    );

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-1">
            <motion.div
                className="absolute inset-0"
                style={{ 
                    background: smoothGradient,
                    mixBlendMode: "screen" 
                }}
            />
        </div>
    );
};