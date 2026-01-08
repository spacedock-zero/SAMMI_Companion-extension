/// <reference path="./sammi.d.ts" />
/* Request */
SAMMI.extCommand('Companion: TTS Request', 3355443, 52, {
	text: ['Text', 14, 'Hello!'],
});
SAMMI.extCommand('Companion: TTS Request (Consistent)', 3355443, 52, {
	text: ['Text', 14, 'Hello!'],
	key: ['Username', 15, 'username_variable']
});
SAMMI.extCommand('Companion: TTS Request (Select Voice)', 3355443, 52, {
	text: ['Text', 14, 'Hello!'],
	voice: ['Voice', 14, 'Voice Name']
});
/* Control */
SAMMI.extCommand('Companion: TTS Skip', 3355443, 52, {
	text: ['Will Skip to next TTS in queue', 30, 'Skip!']
});
SAMMI.extCommand('Companion: TTS Queue Pause', 3355443, 52, {
	text: ['Will Pause the Queue', 30, 'Pause Queue']
});
SAMMI.extCommand('Companion: TTS Queue Continue', 3355443, 52, {
	text: ['Will Resume the Queue', 30, 'Resume Queue']
});

SAMMI.extCommand('Companion: STT Start', 3355443, 52, {
	text: ['Will Start the STT Engine', 30, 'Start']
});
SAMMI.extCommand('Companion: STT Stop', 3355443, 52, {
	text: ['Will Stop the STT Engine', 30, 'Stop']
});
SAMMI.extCommand('Companion: STT Clear', 3355443, 52, {
	text: ['Will Clear the STT recognition log', 30, 'Clear']
});
/* Param */
SAMMI.extCommand('Companion: TTS Rate', 3355443, 52, {
	text: ['Rate', 11, 1]
});
SAMMI.extCommand('Companion: TTS Volume', 3355443, 52, {
	text: ['Volume', 11, 0.7]
});
/* Soundboard */
SAMMI.extCommand('Companion: Soundboard Play', 3355443, 52, {
	name: ['Sound Name', 14, 'sound_name']
});
SAMMI.extCommand('Companion: Soundboard Stop', 3355443, 52, {});
SAMMI.extCommand('Companion: Soundboard Volume', 3355443, 52, {
	volume: ['Volume (0-1)', 11, 1]
});

/* Memory Control */
SAMMI.extCommand('Companion: Set Memory', 3355443, 52, {
	key: ['Memory Name', 14, 'myVar'],
	value: ['Value', 14, 'value'],
	scope: ['Scope (SHORT/LONG)', 14, 'SHORT']
});
SAMMI.extCommand('Companion: Get Memory', 3355443, 52, {
	key: ['Memory Name', 14, 'myVar'],
	scope: ['Scope (SHORT/LONG)', 14, 'SHORT']
});


companion_main();

