/// <reference path="./sammi.d.ts" />
function companion_handleSongRecoPacket(data) {
	switch (data.type) {
		case 'songreco_lyric':
			SAMMI.setVariable('lyric', data.body, 'companion-songreco')
			break;
		case 'songreco_lyrics':
			SAMMI.setVariable('lyrics', data.body, 'companion-songreco')
			break;
		case 'songreco_details':
			SAMMI.setVariable('track', data.body, 'companion-songreco').catch((e) => {
				comsole.error("SAMMI Failed to set track details variable")
			})
			break;
		default:
			console.error("Unknown songreco packet", data)
			break;
	}
	SAMMI.triggerExt(`companion-songreco`)
}
function companion_handleTTSStatusPacket(data) {
	SAMMI.setVariable('status', data.body, 'companion-tts')
	SAMMI.triggerExt(`companion-tts`)
}
function companion_handleMemoryUpdatePacket(data) {
	SAMMI.setVariable(data.body.key, data.body.value, 'companion-memory')
	SAMMI.triggerExt(`companion-memory`)
}
function companion_reconnect() {
	const companionConnectButton = document.getElementById('companion-websocket-connect')
	const companionConnectStatus = document.getElementById('companion-websocket-status')

	if (!companionConnectButton || !companionConnectStatus) {
		SAMMI.alert("Companion [Extension] Error")
		return
	}
	const saved_companion_port = localStorage.getItem('companion_port') ?? '19135'
	const saved_companion_host = localStorage.getItem('companion_host') ?? 'localhost'
	try {
		let ws = new WebSocket(`ws://${saved_companion_host}:${saved_companion_port}`)
		ws.addEventListener('open', () => {
			console.info('Companion WS Open')
			companionConnectButton.innerText = `Disconnect`
			companionConnectStatus.innerText = `Connected`
		})
		ws.addEventListener('close', () => {
			console.info('Companion WS Closed')
			companionConnectButton.innerText = `Connect`
			companionConnectStatus.innerText = `Waiting`
		})
		ws.addEventListener("message", (evt) => {
			if (typeof evt.data != "string") {
				console.warn("Ignored non string packet", evt)
				return
			}
			try {
				const parsed = JSON.parse(evt.data);
				if (!parsed) return;
				if (parsed.type.includes("songreco_")) {
					companion_handleSongRecoPacket(parsed)
					return
				}
				if (parsed.type.includes("tts_status")) {
					companion_handleTTSStatusPacket(parsed)
					return
				}
				if (parsed.type.includes("memory_update")) {
					companion_handleMemoryUpdatePacket(parsed)
					return
				}
				SAMMI.triggerExt(`companion-${parsed.type}`, parsed)
			} catch (error) {
				console.warn("Error Receiving Message", error)
			}
		})
		return ws;
	} catch (err) {
		return companion_reconnect()
	}
}
function companion_main() {
	console.info("Bridge Connected, Loading Companion [Extension]");
	localStorage.setItem('companion_autoconnect', "true")
	const companionConnectButton = document.getElementById('companion-websocket-connect')
	const companionConnectStatus = document.getElementById('companion-websocket-status')

	if (!companionConnectButton || !companionConnectStatus) {
		SAMMI.alert("Companion [Extension] Error")
		return
	}

	let ws = companion_reconnect()

	companionConnectButton.addEventListener("pointerdown", () => {
		if (ws && (ws.readyState == ws.OPEN)) {
			localStorage.setItem('companion_autoconnect', "false")
			ws.close()
		}
		else {
			localStorage.setItem('companion_autoconnect', "true")
			ws = companion_reconnect()
			return;
		}
	})

	setInterval(() => {
		if (ws && (ws.readyState == ws.OPEN)) return;
		if (localStorage.getItem('companion_autoconnect') == "true") {
			companionConnectStatus.innerText = "Retrying..."
			ws = companion_reconnect()
		}
	}, 30 * 1000)

	sammiclient.on('Companion: TTS Request', (payload) => {
		const { FromButton } = payload.Data

		const text = payload.Data.text
		const packet = {
			version: 1,
			type: 'tts_request',
			body: text
		}

		if (!ws || (ws.readyState != ws.OPEN)) {
			SAMMI.alert("Companion Not Connected, TTS Request Lost")
			return;
		}
		ws.send(JSON.stringify(packet))
	});
	sammiclient.on('Companion: TTS Request (Consistent)', (payload) => {
		const { FromButton } = payload.Data

		const text = payload.Data.text
		const key = payload.Data.key
		const hashedKey = window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
		const packet = {
			version: 1,
			type: 'tts_request_wkey',
			body: {
				text,
				key
			}
		}

		if (!ws || (ws.readyState != ws.OPEN)) {
			SAMMI.alert("Companion Not Connected, TTS Request Lost")
			return;
		}
		ws.send(JSON.stringify(packet))
	});
	sammiclient.on('Companion: TTS Request (Select Voice)', (payload) => {
		const { FromButton } = payload.Data

		const text = payload.Data.text
		const voice = payload.Data.voice
		const packet = {
			version: 1,
			type: 'tts_request_wvoice',
			body: {
				text,
				voice
			}
		}

		if (!ws || (ws.readyState != ws.OPEN)) {
			SAMMI.alert("Companion Not Connected, TTS Request Lost")
			return;
		}
		ws.send(JSON.stringify(packet))
	});
	sammiclient.on('Companion: TTS Skip', (payload) => {
		const packet = {
			version: 1,
			type: 'tts_skip',
		}

		if (!ws || (ws.readyState != ws.OPEN)) {
			SAMMI.alert("Companion Not Connected, TTS Request Lost")
			return;
		}
		ws.send(JSON.stringify(packet))
	});
	sammiclient.on('Companion: TTS Queue Continue', (payload) => {
		const packet = {
			version: 1,
			type: 'tts_queuecontinue',
		}

		if (!ws || (ws.readyState != ws.OPEN)) {
			SAMMI.alert("Companion Not Connected, TTS Request Lost")
			return;
		}
		ws.send(JSON.stringify(packet))
	});
	sammiclient.on('Companion: TTS Queue Pause', (payload) => {
		const packet = {
			version: 1,
			type: 'tts_queuestop',
		}

		if (!ws || (ws.readyState != ws.OPEN)) {
			SAMMI.alert("Companion Not Connected, TTS Request Lost")
			return;
		}
		ws.send(JSON.stringify(packet))
	});
	sammiclient.on('Companion: TTS Rate', (payload) => {
		const { FromButton } = payload.Data

		const text = payload.Data.text
		const packet = {
			version: 1,
			type: 'tts_rate',
			body: text
		}

		if (!ws || (ws.readyState != ws.OPEN)) {
			SAMMI.alert("Companion Not Connected, TTS Request Lost")
			return;
		}
		ws.send(JSON.stringify(packet))
	});
	sammiclient.on('Companion: TTS Volume', (payload) => {
		const { FromButton } = payload.Data

		const text = payload.Data.text
		const packet = {
			version: 1,
			type: 'tts_volume',
			body: text
		}

		if (!ws || (ws.readyState != ws.OPEN)) {
			SAMMI.alert("Companion Not Connected, TTS Request Lost")
			return;
		}
		ws.send(JSON.stringify(packet))
	});

	sammiclient.on('Companion: STT Start', () => {
		if (!ws || ws.readyState != ws.OPEN) return;
		ws.send(JSON.stringify({ version: 1, type: 'stt_start' }));
	});

	sammiclient.on('Companion: STT Stop', () => {
		if (!ws || ws.readyState != ws.OPEN) return;
		ws.send(JSON.stringify({ version: 1, type: 'stt_stop' }));
	});

	sammiclient.on('Companion: STT Clear', () => {
		if (!ws || ws.readyState != ws.OPEN) return;
		ws.send(JSON.stringify({ version: 1, type: 'stt_clear' }));
	});

	sammiclient.on('Companion: Set Memory', (payload) => {
		if (!ws || ws.readyState != ws.OPEN) return;
		const { key, value, scope } = payload.Data;
		ws.send(JSON.stringify({
			version: 1,
			type: 'memory_set',
			body: { variable: key, value, scope }
		}));
	});

	sammiclient.on('Companion: Get Memory', (payload) => {
		if (!ws || ws.readyState != ws.OPEN) return;
		const { key, scope } = payload.Data;
		ws.send(JSON.stringify({
			version: 1,
			type: 'memory_query',
			body: { variable: key, scope }
		}));
	});

	SAMMI.alert("Companion Ready")
}

