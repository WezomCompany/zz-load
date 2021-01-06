export default function (event: string, detail: { [p: string]: any } = {}) {
	return new window.CustomEvent(event, { detail });
}
