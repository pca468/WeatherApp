import React, { useState } from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, handleChangeCity, selectedCity}) => {
  console.log("cities?", cities);


  return (
    // array 함수 중 map 활용하기
    <div>
      <Button variant={selectedCity === "current" ? "primary" : "warning"} onClick={() => handleChangeCity("current")}>Current Location</Button>
      {cities.map((item, index) => (
        <Button variant={selectedCity === item ? "primary" : "warning"} key={index} onClick={() => handleChangeCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
