import ejs from "ejs";
import fs from "fs";
import { padLeft } from "./Util.js";
import Adb from "./Adb.js";

let extras = {
	Agencia: "Agencia",
	"Fecha de solicitud": "01/01/2022",
};
const dateOptions = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	second: "numeric",
	timeZoneName: "short",
};

export default class Presenter {
	constructor() {
		this.start = new Date().toLocaleString("es-MX", dateOptions);
		this.end = null;
		this.sessions = [];
	}

	addSession = (session) => this.sessions.push(session);

	run = () => {
		const deviceProps = Adb.deviceProps();
		this.end = new Date().toLocaleString("es-MX", dateOptions);

		ejs.renderFile(
			"report.ejs",
			{
				data: { start: this.start, end: this.end, sessions: this.sessions, extras: extras, ...deviceProps },
				funcs: { padLeft: padLeft },
			},
			(err, str) => {
				if (err) throw err;
				fs.writeFileSync("./report/index.html", str, { flag: "w" });
			}
		);
	};
}
