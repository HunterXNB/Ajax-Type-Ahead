"use strict"
const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
const cities = []

fetch(endpoint).then(rseponse => rseponse.json()).then(data => {
    cities.push(...data)
})



function findMatches(word, cities) {
    return cities.filter(ele => {
        const regex = new RegExp(word, 'gi')
        return ele.city.match(regex) || ele.state.match(regex)
    })
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities)
    const html = matchArray.map(ele => {
        const regex = new RegExp(this.value, 'gi')
        const cityName = ele.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = ele.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `<li>
    <span class="name">${cityName}, ${stateName}</span>
    <span class="population">${numberWithCommas(ele.population)}</span>
    </li>`})
    suggestions.innerHTML = html.join("")
}

const searchInput = document.querySelector(".search")
const suggestions = document.querySelector(".suggestions")


searchInput.addEventListener("keyup", displayMatches)