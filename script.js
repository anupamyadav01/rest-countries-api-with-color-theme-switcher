const URL = "https://restcountries.com/v3.1/all";
const container = document.getElementById("countries_container");

const displayData = (data) => {
  container.innerHTML = "";
  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `<div 
    class="w-[250px] country_cart shadow-md rounded overflow-hidden hover:scale-105 transition duration-300 ease-in-out hover:bg-gray-200"
  >
    <a href="./country.html?name=${element.name.common}">
      <img src="${element.flags.png}" class="h-[167px]" />
      <div class="px-5 py-6">
        <h3 class="text-xl mt-1 mb-2 font-bold">${element.name.common}</h3>
        <p class="mb-1"><b>Population</b>: ${element.population.toLocaleString('en-IN')}</p>
        <p class="mb-1"><b>Region</b>: ${element.region}</p>
        <p class="mb-1"><b>Capital</b>: ${element.capital?.[0]}</p>
      </div>
      </a>
      </div>`;

    container.appendChild(div);
  })
}
let allCountriesData;
const fetchData = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  allCountriesData = data;
  displayData(data);
}
window.addEventListener("load", fetchData);

// code for filter data
let userSelect = document.getElementById("user_select");
userSelect.addEventListener("change", async () => {
  if (userSelect.value !== "all") {
    let response = await fetch(`https://restcountries.com/v3.1/region/${userSelect.value}`)
    let countryData = await response.json();
    displayData(countryData);
  } else {
    fetchData();
  }
})

// user search data 
const userSearch = document.getElementById("user_search");
userSearch.addEventListener("input", (e) => {
  console.log(e.target.value);
  let filteredCountry = allCountriesData.filter((country) => {
    return country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
  })
  displayData(filteredCountry);
})