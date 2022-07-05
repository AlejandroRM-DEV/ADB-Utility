import chalk from "chalk";
import figlet from "figlet";

const padLeft = (num, places) => String(num).padStart(places, "0");

const banner = () => {
	console.clear();
	console.log(
		chalk.bold.cyan(
			figlet.textSync("ADB UTILITY", {
				font: "ANSI Shadow",
				width: 80,
				horizontalLayout: "fitted",
			})
		)
	);
	console.log(chalk.bold.cyan("V1.0.0 - Alejandro R.M. - https://github.com/AlejandroRM-DEV/ADB-Utility"));
	console.log();
};

export { padLeft, banner };
