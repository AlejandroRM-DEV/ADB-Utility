import crypto from "crypto";
import fs from "fs";
import inquirer from "inquirer";
import { banner, padLeft } from "./Util.js";
import { BASE_DIR } from "./constants.js";
import Adb from "./Adb.js";

export default class ScreenshotsManager {
	constructor() {
		this.count = 1;
		this.id = crypto.randomUUID();
		fs.mkdirSync(`${BASE_DIR}/${this.id}`);
	}

	nextFilename = () => `${BASE_DIR}/${this.id}/IMG-${padLeft(this.count++, 6)}.png`;

	run = async () => {
		let end = false;
		while (!end) {
			banner();
			const answers = await inquirer.prompt([
				{
					type: "list",
					name: "action",
					message: "¿Qué acción deseas hacer?",
					choices: [
						"Captura de pantalla y deslizar ▼",
						"Captura de pantalla y deslizar ▲",
						"Captura de pantalla",
						"Terminar",
					],
				},
			]);
			if (answers.action === "Captura de pantalla y deslizar ▼") {
				Adb.screenshot(this.nextFilename());
				Adb.swipeDown();
			} else if (answers.action === "Captura de pantalla y deslizar ▲") {
				Adb.screenshot(this.nextFilename());
				Adb.swipeUp();
			} else if (answers.action === "Captura de pantalla") {
				Adb.screenshot(this.nextFilename());
			} else if (answers.action === "Terminar") {
				end = true;
			}
		}
		return { id: this.id, count: this.count };
	};
}
