import "./style.css"

const COMPANION_MAIN = () => {
	const companionPortInput: HTMLInputElement | null = document.getElementById('companion-websocket-port') as HTMLInputElement | null
	const companionHostInput: HTMLInputElement | null = document.getElementById('companion-websocket-host') as HTMLInputElement | null
	if (!companionPortInput) return;
	if (!companionHostInput) return;

	const saved_companion_port = parseInt(localStorage.getItem('companion_port') ?? '')
	if (!saved_companion_port || isNaN(saved_companion_port)) {
		localStorage.setItem('companion_port', '19135')
	}

	companionPortInput.value = `${saved_companion_port}`
	companionPortInput.addEventListener('change', () => {
		localStorage.setItem('companion_port', companionPortInput.value);
	});

	const saved_companion_host = localStorage.getItem('companion_host')
	if (!saved_companion_host) {
		localStorage.setItem('companion_host', 'localhost')
		companionHostInput.value = 'localhost'
	} else {
		companionHostInput.value = saved_companion_host
	}

	companionHostInput.addEventListener('change', () => {
		localStorage.setItem('companion_host', companionHostInput.value);
	});
}

COMPANION_MAIN()