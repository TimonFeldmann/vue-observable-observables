export default function copyStyles(sourceDoc: Document, targetDoc: Document) {
	Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
		// Attempting to copy styles not originating from the document domain to the popup may cause a CORS exception.
		// Ignore these non-origin styles.
		try {
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
		} catch (e) {
			e
		}
	});
}
