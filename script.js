async function translateToYoda() {
    const inputText = document.getElementById("userInput").value;
    const apiUrl = `https://api.funtranslations.com/translate/yoda.json?text=${encodeURIComponent(inputText)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extracting the translated text from the API response
        if (data && data.contents && data.contents.translated) {
            document.getElementById("outputBox").innerText = data.contents.translated;
        } else {
            document.getElementById("outputBox").innerText = "Asleep I am, Translate I must not!";
        }
    } catch (error) {
        document.getElementById("outputBox").innerText = "Asleep I am, Translate I must not!";
        console.error("Error fetching the translation:", error);
    }
}
