import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🌑 Dark background and foreground
        background: "hsl(220, 40%, 8%)", // Deep dark gray
        foreground: "hsl(220, 20%, 95%)", // Light gray text for readability

        // 🃏 Card elements
        card: {
          DEFAULT: "hsl(220, 30%, 12%)", // Slightly lighter than background
          foreground: "hsl(220, 25%, 85%)",
        },

        popover: {
          DEFAULT: "hsl(220, 30%, 15%)",
          foreground: "hsl(220, 20%, 90%)",
        },

        // 🎨 Primary (Blue - slightly muted for dark mode)
        primary: {
          DEFAULT: "hsl(220, 85%, 60%)", // Vibrant blue
          foreground: "hsl(220, 100%, 95%)",
          dark: "hsl(220, 75%, 45%)",
          light: "hsl(220, 90%, 70%)",
        },

        // 🌿 Secondary (Teal - cooler for balance)
        secondary: {
          DEFAULT: "hsl(180, 60%, 50%)",
          foreground: "hsl(180, 80%, 90%)",
          dark: "hsl(180, 55%, 40%)",
          light: "hsl(180, 65%, 60%)",
        },

        // 🌟 Accent (Amber - softer than pure yellow)
        accent: {
          DEFAULT: "hsl(35, 90%, 55%)",
          foreground: "hsl(35, 100%, 95%)",
          dark: "hsl(35, 85%, 45%)",
          light: "hsl(35, 100%, 65%)",
        },

        // 🌫️ Muted (Gray for subtle elements)
        muted: {
          DEFAULT: "hsl(220, 15%, 25%)", // Dark gray
          foreground: "hsl(220, 15%, 70%)",
          dark: "hsl(220, 10%, 20%)",
          light: "hsl(220, 20%, 35%)",
        },

        // 🔥 Destructive (Red - toned down for dark mode)
        destructive: {
          DEFAULT: "hsl(0, 75%, 55%)",
          foreground: "hsl(0, 100%, 95%)",
          dark: "hsl(0, 70%, 45%)",
          light: "hsl(0, 80%, 65%)",
        },

        // 🖌️ Borders and UI elements
        border: "hsl(220, 20%, 18%)",
        input: "hsl(220, 20%, 22%)",
        ring: "hsl(220, 60%, 50%)",

        // 📊 Chart Colors (well-balanced for dark mode)
        chart: {
          "1": "hsl(220, 85%, 60%)", // Blue
          "2": "hsl(180, 60%, 50%)", // Teal
          "3": "hsl(35, 90%, 55%)", // Amber
          "4": "hsl(0, 75%, 55%)", // Red
          "5": "hsl(280, 70%, 65%)", // Purple
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), heroui()],
};

export default config;
