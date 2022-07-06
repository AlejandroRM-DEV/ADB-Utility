import cp from "child_process";

export default class Adb {
	static deviceProps = () => {
		let device = {};
		device.imei = cp
			.execSync(`adb shell "service call iphonesubinfo 4 | cut -c 52-66 | tr -d '.[:space:]'"`)
			.toString();
		device.manufacturer = cp.execSync("adb shell getprop ro.product.manufacturer").toString();
		device.model = cp.execSync("adb shell getprop ro.product.model").toString();
		device.serialno = cp.execSync("adb shell getprop ro.serialno").toString();
		return device;
	};

	static dimensions = () => {
		return cp.execSync("adb shell wm size").toString().split(":")[1].trim().split("x");
	};

	static screenshot = (name) => {
		cp.execSync(`adb exec-out screencap -p > ${name}`);
	};

	static swipeDown = () => {
		const dimensions = this.dimensions();
		this.swipe({
			x1: dimensions[0] * 0.5,
			y1: dimensions[1] * 0.25,
			x2: dimensions[0] * 0.5,
			y2: dimensions[1] * 0.5,
		});
	};

	static swipeUp = () => {
		const dimensions = this.dimensions();
		this.swipe({
			x1: dimensions[0] * 0.5,
			y1: dimensions[1] * 0.5,
			x2: dimensions[0] * 0.5,
			y2: dimensions[1] * 0.25,
		});
	};

	static swipe = ({ x1, y1, x2, y2 }) => {
		cp.execSync(`adb shell input swipe ${x1} ${y1} ${x2} ${y2}`);
	};
}
