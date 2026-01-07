#!/bin/bash
[ -f dist/index.html ] || {
	echo "Error: dist/index.html not found."
	exit 1
}
[ -s dist/index.html ] || {
	echo "Error: dist/index.html is empty."
	exit 1
}

[ -f sammi_deck.json ] || {
	echo "Error: sammi_deck.json not found."
	exit 1
}
[ -s sammi_deck.json ] || {
	echo "Error: sammi_deck.json is empty."
	exit 1
}

[ -f raw_src/insert_script.js ] || {
	echo "Error: raw_src/insert_script.js not found."
	exit 1
}
[ -s raw_src/insert_script.js ] || {
	echo "Error: raw_src/insert_script.js is empty."
	exit 1
}

[ -f raw_src/insert_command.js ] || {
	echo "Error: raw_src/insert_command.js not found."
	exit 1
}
[ -s raw_src/insert_command.js ] || {
	echo "Error: raw_src/insert_command.js is empty."
	exit 1
}

temp_output=$(mktemp)

html_placeholder_found=0
deck_data_placeholder_found=0
script_placeholder_found=0
command_placeholder_found=0
while IFS= read -r line; do
	line="${line//\{\{ version \}\}/$VERSION}"

	if [[ "$line" == *"{{ html }}"* ]]; then
		html_placeholder_found=1
		cat dist/index.html >>"$temp_output"
	elif [[ "$line" == *"{{ deckdata }}"* ]]; then
		deck_data_placeholder_found=1
		cat sammi_deck.json >>"$temp_output"
	elif [[ "$line" == *"{{ script }}"* ]]; then
		script_placeholder_found=1
		cat raw_src/insert_script.js >>"$temp_output"
	elif [[ "$line" == *"{{ command }}"* ]]; then
		command_placeholder_found=1
		cat raw_src/insert_command.js >>"$temp_output"
	else
		echo "$line" >>"$temp_output"
	fi
done <sammi-companion.sef

if [ "$html_placeholder_found" -eq 1 ] && [ "$deck_data_placeholder_found" -eq 1 ] && [ "$script_placeholder_found" -eq 1 ] && [ "$command_placeholder_found" -eq 1 ]; then
	echo "HTML content, Deck data, Script, and Command inserted successfully."
	mv "$temp_output" sammi-companion.built.sef
else
	echo "Missing placeholders in template." >&2
	echo "Status: HTML=$html_placeholder_found, Deck=$deck_data_placeholder_found, Script=$script_placeholder_found, Command=$command_placeholder_found"
	rm "$temp_output"
	exit 1
fi
