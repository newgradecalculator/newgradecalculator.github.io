const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");
const connection = new BareMux.BareMuxConnection("/baremux/worker.js")

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	await openFrame(address.value);
	
});

async function openFrame(link) {
	try {
		await registerSW();
	} catch (err) {
		error.textContent = "Failed to register service worker.";
		errorCode.textContent = err.toString();
		throw err;
	}

	// const url = search(address.value, searchEngine.value);
	// const url = address.value;
	const url = search(link, searchEngine.value);

	// let frame = document.getElementById("uv-frame");
	// frame.style.display = "block";
	let win = window.open('', "_blank");

	// let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + '150.230.42.190:8000' + "/wisp/";
	let wispUrl ="ws://" + '150.230.42.190' + "/wisp/";
	// let wispUrl = "wss://wisp.mercurywork.shop/wisp/"
	// let wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
	if (await connection.getTransport() !== "/epoxy/index.mjs") {
		await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
	}
	// frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
	win.location = __uv$config.prefix + __uv$config.encodeUrl(url);
}