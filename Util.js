import chalk from "chalk";
import figlet from "figlet";
import { APP_NAME, APP_VERSION, APP_REPO } from "./constants.js";

const padLeft = (num, places) => String(num).padStart(places, "0");

const banner = () => {
	console.clear();
	console.log(
		chalk.bold(
			figlet.textSync(APP_NAME, {
				font: "ANSI Shadow",
				width: 80,
				horizontalLayout: "fitted",
			})
		)
	);
	console.log(chalk.bold(`Versión ${APP_VERSION} - ${APP_REPO}`));
	console.log();
};

export { padLeft, banner };
