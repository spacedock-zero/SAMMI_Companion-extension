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

temp_output=$(mktemp)

html_placeholder_found=0
deck_data_placeholder_found=0
while IFS= read -r line; do
	line="${line//\{\{ version \}\}/$VERSION}"

	if [[ "$line" == *"{{ html }}"* ]]; then
		html_placeholder_found=1
		cat dist/index.html >>"$temp_output"
	elif [[ "$line" == *"{{ deckdata }}"* ]]; then
		deck_data_placeholder_found=1
		cat sammi_deck.json >>"$temp_output"
	else
		echo "$line" >>"$temp_output"
	fi
done <sammi-companion.sef

if [ "$html_placeholder_found" -eq 1 ] && [ "$deck_data_placeholder_found" -eq 1 ]; then
	echo "HTML content and Deck data inserted successfully."
	mv "$temp_output" sammi-companion.built.sef
else
	echo "Either: {{ html }} or {{ deckdata }} placeholder not found in the template." >&2
	echo $html_placeholder_found , $deck_data_placeholder_found
	rm "$temp_output"
	exit 1
fi
