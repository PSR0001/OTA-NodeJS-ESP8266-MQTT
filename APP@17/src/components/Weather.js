import React from 'react'

const Weather = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c8203c86demsh9d623d0ff3b9ee4p142864jsnd72887fd09fb',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    fetch('https://weatherapi-com.p.rapidapi.com/future.json?q=London&dt=2022-12-25', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
  return (
    <div>
        
    </div>
  )
}

export default Weather