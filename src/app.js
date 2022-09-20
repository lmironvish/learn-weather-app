import Forecast from "./forecast.js"

const cityForm = document.querySelector("form")
const card = document.querySelector(".card")
const details = document.querySelector(".details")
const time = document.querySelector("img.time")
const icon = document.querySelector(".icon img")

const forecast = new Forecast()

const updateUI = (data) => {
  const { cityDets, weather } = data

  details.innerHTML = `
  <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
  `

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute("src", iconSrc)

  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg"
  time.setAttribute("src", timeSrc)

  if (card.classList.contains("d-none")) card.classList.remove("d-none")
}

const updateCity = async (city) => {
  const cityDets = await forecast.getCity(city)
  const weather = await forecast.getWeather(cityDets.Key)
  return { cityDets, weather }
}

cityForm.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault()

  // get city value
  const city = cityForm.city.value.trim()
  cityForm.reset()

  // update the ui with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err))

  localStorage.setItem("city", city)
})

if (localStorage.getItem("city")) {
  updateCity(localStorage.setItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err))
}
