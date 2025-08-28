import base from "./base";

import type { Config } from "tailwindcss";

export default {
  content: base.content,
  presets: [base],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
            filter: "blur(4px)",
          },
          "100%": { opacity: "1", transform: "none", filter: "blur(0px)" },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
            filter: "blur(4px)",
          },
          "100%": { opacity: "1", transform: "none", filter: "blur(0px)" },
        },
        "image-glow": {
          "0%": {
            opacity: "0",
            "animation-timing-function": "cubic-bezier(.74,.25,.76,1)",
          },
          "10%": {
            opacity: ".7",
            "animation-timing-function": "cubic-bezier(.12,.01,.08,.99)",
          },
          "100%": {
            opacity: ".4",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "fade-in": "fade-in 1s var(--animation-delay, 0s) ease forwards",
        "fade-up": "fade-up 1s var(--animation-delay, 0s) ease forwards",
        "image-glow": "image-glow 4.1s ease-out 1s forwards",
      },
    },
  },
} satisfies Config;
