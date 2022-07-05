import ejs from "ejs";
import fs from "fs";
import { padLeft } from "./Util.js";

export default class Presenter {
	constructor() {
		this.start = Date.now();
		this.end = null;
		this.sessions = [];
		fs.existsSync("report") || fs.mkdirSync("report");
	}

	addSession = (session) => this.sessions.push(session);

	run = () => {
		this.end = Date.now();
		ejs.renderFile(
			"report.ejs",
			{ start: this.start, end: this.end, sessions: this.sessions, padLeft: padLeft },
			(err, str) => {
				if (err) throw err;
				fs.writeFileSync("./report/index.html", str, { flag: "w" });
			}
		);
	};
}
