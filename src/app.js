// maak het html bestand klaar
// Maak een <article>/<div>-tag in de HTML die ik als referentie kan gebruiken in mijn JavaScript bestand
// Maak de styling in het css bestand
// schrijf een asink functie met try en catch om de gegevens op te halen
// schrijf herbruikbare functies voor de verschillende onderdelen
// maak een variabele koppeling met de html id
// maak een event lisner
// schrijf een functie om het geheel in de html ter injecteren

import axios from "axios";

function getCurrency(country) {
    if (country.currencies.length === 1) {
        // 1 valuta: and you can pay with [currency]'s
        return `and you can pay with ${country.currencies[0].name}'s`
    } else {
        // 2 valuta's: and you can pay with [currency]'s and [currency]'s
        return `and you can pay with ${country.currencies[0].name}'s and ${country.currencies[1].name}'s`
    }
}

function getLanguage(language) {
    if (language.languages.length === 1) {
        // 1 taal: They speak [language]
        return `They speak ${language.languages[0].name}`
    } else if (language.languages.length === 2) {
        // 2 talen: They speak [language] and [language]
        return `They speak ${language.languages[0].name} and ${language.languages[1].name}`
    } else if (language.languages.length === 3){
        // 3 talen: They speak [language], [language] and [language]
        return `They speak ${language.languages[0].name}, ${language.languages[1].name} and ${language.languages[2].name}`
    } else {
        return  `They speak ${language.languages[0].name}, ${language.languages[1].name} and ${language.languages[2].name} and more`
    }
}

async function searchRequest(request) {
    try {
        const countries = await axios.get('https://restcountries.com/v2/all')
        const countryDetails = document.getElementById('result')
        const country = countries.data.find(country => country.name === request)
        console.log(countries.data)
        console.log(country)
        console.log(country.currencies[0].name)
        console.log(country.languages[0].name)
        countryDetails.innerHTML = `
        <p class="country-box">
        <img src="${country.flag}" alt="Flag of ${country.name}" class="flag" />
        <span class="country">${country.name}</span></p>
        <p>${country.name} is situated in ${country.subregion}. It has a population of ${country.population
        } people.</p>
        <p>The capital is ${country.capital} ${getCurrency(country)}</p>
        <p>${getLanguage(country)}</p>`
    } catch (e) {
        console.error(e)
        if (e.name === 'TypeError') {
            console.log("Suggestie: " + suggestion)
            textSuggestion.innerHTML =`<P>Please check if the Englisch spelling is correct (case sensitive).</P>`
        }
    }
}

const inputField = document.getElementById('input')
const submitForm = document.getElementById('submit-form')
const textSuggestion = document.getElementById('suggestion')

inputField.addEventListener("click", (event) => {
    textSuggestion.innerHTML =`<P> </P>`
    console.log(inputField.value)
})

submitForm.addEventListener("submit", (event) => {
    event.preventDefault()
    void searchRequest(inputField.value)
    inputField.value = ''
})
