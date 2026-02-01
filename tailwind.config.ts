import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        border: "var(--border)",
        brand: {
          blue: "var(--brand-blue)",
          purple: "var(--brand-purple)",
          pink: "var(--brand-pink)",
          black: "#1C1F26",
          gray: "#969696",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, var(--brand-blue) 0%, var(--brand-purple) 50%, var(--brand-pink) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
