import Head from "next/head";
import { useState, useEffect } from "react";

const citiesDataSource =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const forecastDataBaseUrl = "https://api.open-meteo.com/v1/forecast";

async function findMatchingCities(temp) {
  // Get list of cities
  const citiesData = await (await fetch(citiesDataSource)).json();

  // Create array for matching cities to go into
  const matchingCities = [];

  // For each city, send an API call to the weather data source
  for (var i = 0; i < 10; i++) {
    const cityName = citiesData[i].city;
    const lat = citiesData[i].latitude;
    const lon = citiesData[i].longitude;

    const weatherDataSource = `${forecastDataBaseUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const weatherData = await (await fetch(weatherDataSource)).json();

    console.log(weatherData);

    // Then check if the given temp matches the temp of the city
    // If it does, add it to the array
    weatherData.elevation == temp && matchingCities.push(cityName);
  }

  // Return the result
  return matchingCities;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [resultsContent, setResultsContent] = useState([]);
  const [hasMatches, setHasMatches] = useState(true);

  async function handleOnClick(temp) {
    setIsLoading(true);

    const results = await findMatchingCities(temp);
    results.length ? setResultsContent(results) : setHasMatches(false);

    setIsLoading(false);
  }

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
        <button onClick={() => handleOnClick(32)}>Tell me</button>
        <br />
        {isLoading && "Loading"}
        <br />
        <ul>
          {hasMatches
            ? resultsContent.map((result, index) => (
                <li key={index}>{result}</li>
              ))
            : "There were no matching cities"}
        </ul>
      </main>
    </>
  );
}
