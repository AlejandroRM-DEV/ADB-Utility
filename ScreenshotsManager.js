import crypto from "crypto";
import fs from "fs";
import inquirer from "inquirer";
import cp from "child_process";
import { banner, padLeft } from "./Util.js";

export default class ScreenshotsManager {
	constructor() {
		const size = cp.execSync("adb shell wm size").toString().split(":")[1].trim().split("x");
		this.swipe = {
			x1: size[0] * 0.5,
			y1: size[1] * 0.5,
			x2: size[0] * 0.5,
			y2: size[1] * 0.25,
		};
		this.count = 1;
		this.id = crypto.randomUUID();
		fs.mkdirSync(`report/${this.id}`);
	}

	take = () => {
		const archivo = `report/${this.id}/CAPTURA-${padLeft(this.count++, 6)}.png`;
		cp.execSync(`adb exec-out screencap -p > ${archivo}`);
	};

	swipeDown = () => {
		cp.execSync(`adb shell input swipe ${this.swipe.x1} ${this.swipe.y1} ${this.swipe.x2} ${this.swipe.y2}`);
	};

	run = async () => {
		let ended = false;
		while (!ended) {
			banner();
			const answers = await inquirer.prompt([
				{
					type: "list",
					name: "action",
					message: "¿Qué acción deseas hacer?",
					choices: ["Captura de pantalla y deslizar", "Captura de pantalla", "Terminar"],
				},
			]);
			if (answers.action === "Captura de pantalla y deslizar") {
				this.take();
				this.swipeDown();
			} else if (answers.action === "Captura de pantalla") {
				this.take();
			} else if (answers.action === "Terminar") {
				ended = true;
			}
		}
		return { id: this.id, count: this.count };
	};
}
