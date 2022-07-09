import ejs from "ejs";
import fs from "fs";
import { padLeft } from "./Util.js";
import { BASE_DIR, APP_NAME, APP_VERSION, APP_REPO } from "./constants.js";
import Adb from "./Adb.js";

export default class Presenter {
	constructor() {
		this.sessions = [];
		fs.existsSync(BASE_DIR) || fs.mkdirSync(BASE_DIR);
		fs.existsSync(`${BASE_DIR}/extra`) || fs.mkdirSync(`${BASE_DIR}/extra`);
	}

	addSession = (session) => this.sessions.push(session);

	run = () => {
		const deviceProps = Adb.deviceProps();

		ejs.renderFile(
			"ReportTemplate.ejs",
			{
				app: { name: APP_NAME, version: APP_VERSION, repo: APP_REPO },
				device: deviceProps,
				sessions: this.sessions,
				funcs: { padLeft: padLeft },
			},
			(err, str) => {
				if (err) throw err;
				fs.writeFileSync(`./${BASE_DIR}/index.html`, str, { flag: "w" });
			}
		);
	};
}
