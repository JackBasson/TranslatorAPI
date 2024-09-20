// async function translateToYoda() {
//     const inputText = document.getElementById("userInput").value;
//     const apiUrl = `https://api.funtranslations.com/translate/yoda.json?text=${encodeURIComponent(inputText)}`;

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         if (data && data.contents && data.contents.translated) {
//             document.getElementById("outputBox").innerText = data.contents.translated;
//         } else {
//             document.getElementById("outputBox").innerText = "Asleep I am, Translate I must not!";
//         }
//     } catch (error) {
//         document.getElementById("outputBox").innerText = "Asleep I am, Translate I must not!";
//         console.error("Error fetching the translation:", error);
//     }
// }

/* first function should solely retrieve the input text from the user (inputText)*/
function getInputText() {
    return document.getElementById("userInput").value;
}
/* second function should encode the user input into a format suitable for the API URL which is my encodeURIComponent(inputText)*/
function buildapiUrl(inputText) {
    const baseUrl = "https://api.funtranslations.com/translate/yoda.json";
    return `${baseUrl}?text=${encodedURIComponent(inputText)}`;
}
/* third function should use the fetch API to make a GET request to the API endpoint with the encoded user input fetch(apiURL)*/
async function fetchTranslation(apiUrl) {
    const response = await fetch(apiUrl);
    /* when the response is not successful = !response.ok, this means it is now True and will return the error message */
    if (!response.ok) {
        throw new Error("Failed to fetch the translation, I have!");
    }
    return response.json();  
}
/* fourth function should handle the response from the API and extract the translated text from the response*/
function extractTranslateText(apiResponse) {
    if (apiResponse && apiResponse.contents && apiResponse.contents.translated) {
        return apiResponse.contents.translated;
    } else {
        return "Asleep I am, Translate I cannot!"
    }
}
/* fifth function should update the output box with the translated text or display an error message if the translation fails*/
function updateOutputBox(translatedText) {
    document.getElementById("outputBox").innerText = translatedText;
}
/* put it all together and have a catch at the end for any errors returning a response*/
async function translateToYoda() {
    try {
        const inputText = getInputText();
        const apiUrl = buildapiUrl(inputText);
        const response = await fetchTranslation(apiUrl);
        const translatedText = extractTranslateText(response);
        updateOutputBox(translatedText);
    } catch (error) {
        updateOutputBox("Asleep I am, Translate I must not!");
        console.error("Error translating:", error);
    }
}
