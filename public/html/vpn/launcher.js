async function openAndInjectHTMLFromFile(path) {
    try {
        // Fetch the HTML file from the same domain
        const response = await fetch(path);
        const htmlContent = await response.text();

        // Open a new blank window
        const newWindow = window.open('', '_blank');

        if (!newWindow) {
            alert("Pop-up blocked! Please allow pop-ups for this site.");
            return;
        }

        // Inject the fetched HTML
        newWindow.document.write(htmlContent);
        newWindow.document.close();

    } catch (err) {
        console.error("Failed to load HTML file:", err);
    }
}