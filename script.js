/* first function should solely retrieve the input text from the user (inputText) */
/* This defines a function named getInputText. It is responsible for retrieving the value that the user typed into the Input text field*/
/* doc.getelembyID("userInput") gets the DOM element with the ID in the brackets, in this case userInput*/
/* .value retrieves the current text value from the input field */
function getInputText() {
    return document.getElementById("userInput").value;
}

/* second function should encode the user input into a format suitable for the API URL */
/* The function here takes the parameter inputText which is the value from the step before */
/* const baseUrl defines the base URL for the Yoda API */
/* encodeURIComponent encodes the inputText do that is can be included in the URL - this is important because certain characters like spaces aren't allowed in URLs */
/* ${baseUrl}?text={encodeURIComponent(inputText)} constructs the full URL by appending the encoded text to the base URL, return then returns the complete URL that is used in the API request */
function buildapiUrl(inputText) {
    const baseUrl = "https://api.funtranslations.com/translate/yoda.json";
    return `${baseUrl}?text=${encodeURIComponent(inputText)}`;
}

/* third function should use the fetch API to make a GET request to the API endpoint with the encoded user input */
/* the async function defines an asynchronous function that takes the URL built beforehand as it's input - Async allows await and await means that it is telling JS yo wait for the async action to finish before continuing the function*/
/* const response = await fetch sends a GET request to the API using the fetch function the await bit makes the code wait until the fetch is complete before continuing, the result is stored in response */
/* const data = await response.json() takes the JSON from the response. This is then stored in the data variable */
/*  return data returns the JSON data from the API which contains the translation and none of the other symbols/characters*/
async function fetchTranslation(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;  
}

/* fourth function should handle the response from the API and extract the translated text from the response */
/* This function takes the data which is the JSON from beforehand and tries to extract the translated text */
/* the if statement checks if the data exists and if the contents and translated text exist */
/* && is the AND operator and will check both conditions are true, if this is the case on this line then it will return the translated text from the API response*/
/* if the translation is not available or if it isnt in the structure it was anticipated then the error message is output */
function extractTranslateText(data) {
    if (data && data.contents && data.contents.translated) {
        return data.contents.translated;
    } else {
        return "Asleep I am, Translate I cannot!";
    }
}

/* fifth function should update the output box with the translated text or display an error message if the translation fails */
/* This function updates the output box with the translated text which is the final output from beforehand */
/* .innerText = translatedText updates the innerText of the outputBox with the translatedText. */
function updateOutputBox(translatedText) {
    document.getElementById("outputBox").innerText = translatedText;
}

/* put it all together and have a catch at the end for any errors returning a response */
async function translateToYoda() {
    try {
        const inputText = getInputText(); /* retrieve the users input */
        const apiUrl = buildapiUrl(inputText); /* build the API URL by passing the users input into the function */
        const data = await fetchTranslation(apiUrl); /* This makes the API request and waits for the response to be processed */
        const translatedText = extractTranslateText(data); /* This extracts the translated Yoda text from the API response */
        updateOutputBox(translatedText); /* This updates the outputBox with the translated Yoda text */
    } catch (error) { /* if an error occurs in the code above then the catch block handles it and updates the outputBox with the error message */
        updateOutputBox("Asleep I am, Translate I must not!");
        console.error("Error translating:", error);
    }
}

