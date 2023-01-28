import Head from "next/head";

const citiesDataSource =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const forecastDataBase = "https://api.open-meteo.com/v1/forecast";

async function myFunction() {
  const citiesData = await (await fetch(citiesDataSource)).json();

  for (var i = 0; i < 10; i++) {
    const cityName = citiesData[i].city;
    const lat = citiesData[i].latitude;
    const lon = citiesData[i].longitude;

    const weatherDataSource = `${forecastDataBase}?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const weatherData = await (await fetch(weatherDataSource)).json();

    console.log(cityName, weatherData);

    // if (weatherData.current_weather.temperature === inputTemp ) {
    //   var matchingCity = document.createElement("li")
    //   matchingCity.innerHTML = info[i].name
    //   result.appendChild(matchingCity)
    // } else {
    //   console.log(info[i].name, 'not a match')
    // }
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Reverse Weather App</title>
        <meta
          name="description"
          content="An app that asks you for weather conditions and then tells you where they're happening."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Where is it 72° and sunny right now?</h1>
        <button onClick={myFunction}>Tell me</button>
      </main>
    </>
  );
}
