import { extendTheme } from "native-base";

const config = {
	useSystemColor: false,
	initialColorMode: "dark",
	fonts: {
		heading: "Dosis",
		body: "Dosis",
		mono: "Dosis",
	},
};
const fontConfig = {
	Dosis: {
		100: {
			normal: "Dosis-Light",
		},
		200: {
			normal: "Dosis-Light",
		},
		300: {
			normal: "Dosis-Light",
		},
		400: {
			normal: "Dosis-Regular",
		},
		500: {
			normal: "Dosis-Medium",
		},
		600: {
			normal: "Dosis-Medium",
		},
		700: {
			normal: "Dosis-Bold",
		},
		800: {
			normal: "Dosis-Bold",
		},
		900: {
			normal: "Dosis-Bold",
		},
	},
};
const fonts = {
	heading: "Dosis",
	body: "Dosis",
	mono: "Dosis",
};

const colors = {
	primary: {
		100: "#f6e6ff",
		200: "#dbb8fd",
		300: "#c289f7",
		400: "#a85bf2",
		500: "#8f2ced",
		600: "#7512d3",
		700: "#5b0da5",
		800: "#410877",
		900: "#270449",
	},
};

export default extendTheme({ config, colors });
