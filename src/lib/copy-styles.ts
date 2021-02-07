export default function copyStyles(sourceDoc: Document, targetDoc: Document) {
	Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
		if (styleSheet.cssRules) {
			// For <style> elements
			const newStyleEl = sourceDoc.createElement("style");

			Array.from(styleSheet.cssRules).forEach(cssRule => {
				// Write the text of each rule into the body of the style element
				newStyleEl.appendChild(
					sourceDoc.createTextNode(cssRule.cssText)
				);
			});

			// Append the style tag to the head of the targetDoc.
			targetDoc.head.appendChild(newStyleEl);
		}
	});
}