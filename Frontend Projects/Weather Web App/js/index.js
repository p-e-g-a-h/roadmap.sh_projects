const search = document.querySelector("#search");
const section = document.querySelector("section");
const head = document.querySelector("h2");
const details = document.querySelector("#details");
const hoursDatails = document.querySelector("#hours");
const cityInput = document.querySelector("input");

const API_KEY = "5TTJKGB8JS3Q8LGXCMHPPJQ6R";

const changeUI = (data) => {
  const { conditions, temp, windspeed, precipprob } = data.currentConditions;
  const hoursData = data.days[0].hours;

  section.style.display = "block";
  head.textContent = `${data.address} - ${conditions}`;
  details.textContent = `Temp: ${temp}° | Wind: ${windspeed} | Rain: ${precipprob}%`;

  const resultHours = hoursData.reduce((result, { temp, datetime }) => {
    return (
      result + (result ? " / " : "") + temp + "° - " + datetime.slice(0, 5)
    );
  }, "");

  hoursDatails.textContent = resultHours;
};

const fetchData = async (city) => {
  const BASE_URL =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

  try {
    const response = await fetch(
      `${BASE_URL}/${city}/next24hours?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    changeUI(data);
  } catch (error) {
    console.log(error);
  }
};

fetchData("istanbul");

search.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchData(city);
  }
});
