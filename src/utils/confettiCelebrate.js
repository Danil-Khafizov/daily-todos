// src/utils/confettiCelebrate.js
import confetti from "canvas-confetti";

export const fireConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        ticks: 200,
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff7777", "#fffbc7"],
    });
};