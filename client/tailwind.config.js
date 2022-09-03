module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"nunito-regular": ["NunitoSans-Regular", "sans-serif"],
				"nunito-semibold": ["NunitoSans-SemiBold", "sans-serif"],
				"nunito-bold": ["NunitoSans-Bold", "sans-serif"],
			},
			colors: {
				primary: "#7412f7",
				hover: "#4e09ab",
				offwhite: "#F5F5F5",
			},
			screens: {
				xs: "22em",
			},
		},
	},
	plugins: [],
};
