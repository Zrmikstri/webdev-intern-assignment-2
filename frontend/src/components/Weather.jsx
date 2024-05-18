import * as React from 'react';

export function CurrentWeatherCard({ location, current }) {
    const date = new Intl.DateTimeFormat('vi-VN').format(new Date(current?.last_updated_epoch * 1000));

    return (
        <section>
            <h2>{location?.name}</h2>
            <h3>{date}</h3>
            <p>Temperature: {current?.temp_c}°C </p>
            <p>Wind: {current?.wind_kph} km/h</p>
            <p>Humidity: {current?.humidity}%</p>
            <img src={`http:${current?.condition.icon}`} alt="Weather Icon" />
        </section>
    );
}

export function ForecastWeatherList({ forecastday }) {
    return (
        <section>
            <h2>Forecast</h2>
            <ul>
                {
                    forecastday.slice(1).map((day) => {
                        const date = new Intl.DateTimeFormat('vi-VN').format(new Date(day.date_epoch * 1000));

                        return (
                            <li key={day.date_epoch}>
                                <h3>{date}</h3>
                                <p>Max: {day.day.maxtemp_c}°C</p>
                                <p>Min: {day.day.mintemp_c}°C</p>
                                <p>Wind: {day.day.maxwind_kph} km/h</p>
                                <p>Humidity: {day.day.avghumidity}%</p>
                                <img src={`http:${day.day.condition.icon}`} alt="Weather Icon" />
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    );
}

