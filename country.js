const countryName = new URLSearchParams(location.search).get("name")
const country_section = document.getElementById("country_section");
let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
const backBtn = document.getElementById("back_btn");
backBtn.addEventListener("click", () => {
  history.back();
})


const displayData = (data) => {
  let section = document.createElement("section");
  section.innerHTML = `<section class="flex justify-left items-start mt-14 gap-20 px-10 ">
    <div class="w-[45%]">
      <img src="${data[0].flags.svg}" class="h-[100%] w-full" />
    </div>
    <div class="w-[45%]">
      <h2 class="font-bold text-2xl mb-4">${data[0].name.common}</h2>
      <p class="mb-2"><b>Native Name:</b> ${(Object.values(data[0].name.nativeName))[0].common}</p>
      <p class="mb-2"><b>Population:</b> ${data[0].population.toLocaleString('en-IN')}</p>
      <p class="mb-2"><b>Region:</b> ${data[0].region}</p>
      <p class="mb-2"><b>Sub Region:</b> ${data[0].subregion}</p>
      <p class="mb-2"><b>Capital: </b> ${data[0].capital?.[0]}</p>
      <p class="mb-2"><b>Top Level Domain:</b> ${data[0].tld[0]}</p>
      <p class="mb-2"><b>Currencies:</b> ${Object.values(data[0].currencies)[0].name}</p>
      <p class="mb-2"><b>Languages:</b> ${(Object.values(data[0].languages)).join(", ")}</p>
      <div>
      <div class="mb-5">
        <b class="text-2xl">Border Countries:</b>
      </div>
      <div class="flex gap-3 flex-wrap" id="border_conuntries_container">
       
      </div>
    </div>
    </div>
  </section>`
  country_section.appendChild(section);
}
const getCountryFullName = async (item) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${item}`)
  const data = await response.json();
  console.log(data[0].name.common);
  let a = document.createElement("a");
  a.innerHTML = `<div class="bg-[#d4d4d4] px-4 py-2 rounded">${data[0].name.common}</div>`;
  a.href = `./country.html?name=${data[0].name.common}`
  document.getElementById("border_conuntries_container").appendChild(a);
}

const fetchCountryData = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  if ("borders" in data[0]) {
    data[0].borders.forEach((item) => {
      getCountryFullName(item);
    });
  }
  displayData(data);
}
fetchCountryData();