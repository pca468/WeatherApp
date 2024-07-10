import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
import Search from "./component/Search";

// 3. 날씨에 따라서 배경화면 바뀌게 해주기
// 4. 검색기능 만들기

function App() {
  const [weather, setWeather] = useState(null); // 날씨데이터는 ui에 보여지는 것으로 state 설정
  const cities = ["paris", "new York", "tokyo", "seoul"];
  const [city, setCity] = useState("");
  const [loading, setLodaing] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [error, setError] = useState(null); // 에러 상태 추가

  const getCurrentLocation = () => {
    // 추가 함수를 따로 넣어주지 않고 콜백 함수를 통해 하나의 함수로 해결하기.
    navigator.geolocation.getCurrentPosition((position) => {
      // position 매개변수 넣어주기
      let lat = position.coords.latitude; // 위도 받아오는 코드
      let lon = position.coords.longitude; // 경도 받아오는 코드
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // react api 받는 방법
  // await를 사용하기 위해서는 함수가 비동기처리여야 한다(async)
  const getWeatherByCurrentLocation = async (lat, lon) => {
    // 매개변수 활용하기 위해서는 달러싸인!
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=707588a5170d9338d57629b21d52d493&units=metric`;
    setLodaing(true);
    try {
      let response = await fetch(url); // response를 부를건데요. 기다려주세요 fetch(url)를 불러서 데이터를 가져올 때까지 기다려주세요.
      //api는 대부분 json
      if (!response.ok) {
        throw new Error("City not found");
      }
      let data = await response.json(); // response에서 json 파일을 가져오는 것을 기다려줘
      setWeather(data);
      setError(null); // 에러 상태 초기화
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setError("City not found");
    } finally {
      setLodaing(false);
    }
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=707588a5170d9338d57629b21d52d493&units=metric`;
    setLodaing(true);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      let data = await response.json();
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data : ", error);
      setError("City not found");
    } finally {
      setLodaing(false);
    }
  };

  const handleChangeCity = (selectedCity) => {
    if (selectedCity === "current") {
      setCity(null);
      getCurrentLocation();
    } else {
      setCity(selectedCity);
    }
    setSelectedCity(selectedCity);
  };

  const handleSearch = (searchTerm) => {
    setCity(searchTerm);
    getWeatherByCity(searchTerm);
    setSelectedCity(searchTerm);
  };

  // 앱이 실행되자마자 의 상황을 만들어주는 함수 => useEffect
  useEffect(() => {
    if (city) {
      getWeatherByCity();
    } else {
      getCurrentLocation();
    }
  }, [city]);

  const getBackground = () => {
    if (!weather)
      return "https://cdn.vectorstock.com/i/1000v/83/96/cloud-background-vector-238396.avif";

    const mainWeather = weather.weather[0].main.toLowerCase();
    const description = weather.weather[0].description.toLowerCase();

    if (mainWeather === "clear") {
      return "clear";
    } else if (
      mainWeather === "rain" ||
      mainWeather === "drizzle" ||
      description.includes("rain")
    ) {
      return "rainy";
    } else if (mainWeather === "clouds" || description.includes("clouds")) {
      return "cloudy";
    } else if (mainWeather === "snow" || description.includes("snow")) {
      return "snowy";
    } else if (description.includes("mist")) {
      return "mist"
    } else {
      return "";
    }
  };

  return (
    <div className={`App ${getBackground()}`}>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container">
          <Search onSearch={handleSearch} />
          {error ? <div className="error-message">{error}</div> : <></>}
          <WeatherBox weather={weather} weatherCity={city} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            handleChangeCity={handleChangeCity}
            selectedCity={selectedCity}
          />
        </div>
      )}
    </div>
  );
}

export default App;
