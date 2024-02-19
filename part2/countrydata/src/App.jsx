import axios from "axios";
import { useEffect, useState } from "react";

const weatherInfo = ({ country }) => {
  const [weather, setWeather] = useState([]);

  const apiKey = import.meta.env.API_KEY;
  const lat = country[0].capitalInfo.latlng[0];
  const lon = country[0].capitalInfo.latlng[1];

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
    .then((res) => {
      console.log(res.data);
      setWeather(res.data)
    })

  return weather;
};

const DisplayWeather = ({ country }) => {
  const weather = weatherInfo((country = { country }));
  console.log(weather);
  console.log(country)

  if (weather.length != 0) {
    return (
      <div>
        <h2>Weather in {country.country[0].capital}</h2>
        <p>
          temprature {weather.main.temp} °C
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    );
  }
};

const CountryInfo = ({ filteredCountries }) => {
  return (
    <div>
      <h2>{filteredCountries[0].name.common}</h2>
      <p>{filteredCountries[0].capital}</p>
      <p>{filteredCountries[0].area}</p>
      <h3>languages: </h3>
      {Object.entries(filteredCountries[0].languages).map(
        ([code, language]) => (
          <li>{language}</li>
        )
      )}

      <img src={filteredCountries[0].flags.png} />
      <DisplayWeather country={filteredCountries} />
    </div>
  );
};

const ListCountries = ({ countries, searchValue, setSearchValue }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );
  console.log(filteredCountries);
  if (
    searchValue !== "" &&
    filteredCountries.length < 11 &&
    filteredCountries.length > 1
  ) {
    return (
      <div>
        {filteredCountries.map((country, i) => (
          <div key={i}>
            <p>{country.name.common}</p>
            <button onClick={() => setSearchValue(country.name.common)}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  } else if (searchValue !== "" && filteredCountries.length > 11) {
    return (
      <div>
        <p>too many matches, specify another filter.</p>
      </div>
    );
  } else if (filteredCountries.length === 1) {
    return <CountryInfo filteredCountries={filteredCountries} />;
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchValue(event.target.value);
  };

  const getAll = () => {
    const data = axios.get(
      "https://studies.cs.helsinki.fi/restcountries/api/all"
    );
    data.then((res) => {
      setCountries(res.data);
    });
  };

  useEffect(getAll, []);

  return (
    <>
      <div>
        <p style={{ display: "inline-block" }}>find countries</p>
        <input onChange={handleSearchChange} type="text" />
      </div>
      <ListCountries
        searchValue={searchValue}
        countries={countries}
        setSearchValue={setSearchValue}
      />
    </>
  );
}

export default App;
