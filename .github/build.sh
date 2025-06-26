#!/bin/bash
[ -f dist/index.html ] || {
	echo "Error: dist/index.html not found."
	exit 1
}
[ -s dist/index.html ] || {
	echo "Error: dist/index.html is empty."
	exit 1
}

# Create a temporary file for the output
temp_output=$(mktemp)

# Process the file line by line to avoid command line length limitations
html_placeholder_found=0
while IFS= read -r line; do
    # Replace version placeholder if present
    line="${line//\{\{ version \}\}/$VERSION}"
    
    # Check if this line contains the HTML placeholder
    if [[ "$line" == *"{{ html }}"* ]]; then
        html_placeholder_found=1
        # Output the line with placeholder replaced by actual HTML content
        cat dist/index.html >> "$temp_output"
    else
        # Output the line as is
        echo "$line" >> "$temp_output"
    fi
done < sammi-companion.sef

# Check if we found and replaced the HTML placeholder
if [ "$html_placeholder_found" -eq 1 ]; then
    echo "HTML content inserted successfully."
    mv "$temp_output" sammi-companion.built.sef
else
    echo "Error: {{ html }} placeholder not found in the template." >&2
    rm "$temp_output"
    exit 1
fi
