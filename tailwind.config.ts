import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontSize: {
				'xs': '13px',
				'2xl': '28px',
				'md': '16px',
			},
			colors: {
				ink: '#4A4E71',
				focus: '#6F91BC',
				success: '#27B274',
				error: '#FF8080',
				errorLight: '#FDEFEE',
				greyStart: '#F4F9FF',
				greyStop: '#E0EDFB',
				blueGradientStart: '#70C3FF',
				blueGradientStop: '#4B65FF',
				white: '#FFFFFF'
			},
			borderRadius: {
				DEFAULT: '10px'
			}
		}
	}
} satisfies Config;
