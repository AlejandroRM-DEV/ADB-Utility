import chalk from "chalk";
import inquirer from "inquirer";
import { banner } from "./Util.js";
import Presenter from "./Presenter.js";
import ScreenshotsManager from "./ScreenshotsManager.js";

const main = async () => {
	const presenter = new Presenter();
	let exit = false;
	
	while (!exit) {
		banner();
		const answers = await inquirer.prompt([
			{
				type: "list",
				name: "action",
				message: "¿Qué deseas hacer?",
				choices: ["Capturas de pantalla", "Generar reporte", "Salir"],
			},
		]);
		try {
			if (answers.action === "Capturas de pantalla") {
				const screenshotsManager = new ScreenshotsManager();
				const session = await screenshotsManager.run();
				presenter.addSession(session);
			} else if (answers.action === "Generar reporte") {
				presenter.run();
				exit = true;
			} else if (answers.action === "Salir") {
				exit = true;
			}
		} catch (error) {
			console.log(error);
			console.log(chalk.bold.red("Se perdió la conexión con el dispositivo"));
			exit = true;
		}
	}
};
main();
