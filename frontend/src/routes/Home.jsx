import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api";
import { CurrentWeatherCard, ForecastWeatherList } from "../components/Weather.jsx";


function Home() {
    const [forecast, setForecast] = useState(null);
    const [city, setCity] = useState("");
    const [status, setStatus] = useState("typing");
    const [forecastDays, setForecastDays] = useState(0);
    const [error, setError] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    async function getCurrentLocationForecast() {
        navigator.geolocation.getCurrentPosition((position) => {
            api.get("/weather/", {
                params: {
                    q: `${position.coords.latitude},${position.coords.longitude}`,
                    days: forecastDays
                }
            })
                .then((res) => {
                    setForecast(res.data);
                })
                .catch((err) => {
                    setError(err);
                });
        });
    }

    function handleTextChange(event) {
        setCity(event.target.value);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        setStatus("submitting");

        let q = city.trim().toLowerCase();

        try {
            const res = await api.get("/weather/", {
                params: {
                    q: q,
                    days: forecastDays
                }
            });

            setForecast(res.data);
            setStatus("typing");
        }
        catch (err) {
            setError(err);
            setStatus("typing");
        }
    }

    async function auth() {
        const token = localStorage.getItem("TOKEN");

        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        await api.get("api/auth/user/")
            .then(() => {
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
                localStorage.clear();

                navigate("/");
            });
    }

    useEffect(() => {
        auth();
    }, []);


    return (
        <>
            <header>
                <h1>Weather dashboard</h1>
                <nav>
                    <ul>
                        {!isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        )}
                    </ul>

                </nav>
            </header>

            {/* input city for weather info or use current location */}
            < main >
                <section>
                    <form
                        onSubmit={(event) => handleFormSubmit(event, city, setForecast, setStatus)}
                    >
                        <label htmlFor="forecastDays">Forecast Days:</label>
                        <select
                            value={forecastDays}
                            onChange={(event) => setForecastDays(event.target.value)}
                            disabled={status === "submitting"}
                        >
                            {
                                [...Array(11).keys()].map(day => (
                                    <option key={day} value={day}> {day} </option>
                                ))
                            }
                        </select>
                        <br />
                        <input
                            type="text"
                            placeholder="Enter city. E.g., New York, London, Tokyo"
                            onChange={(event) => handleTextChange(event, setCity)}
                            disabled={status === "submitting"}
                        />
                        <br />
                        <button
                            type="submit"
                            disabled={city.length === 0 || status === "submitting"}
                        >
                            Get weather
                        </button>
                        <br />
                        <br />
                        <button
                            type="button"
                            onClick={() => getCurrentLocationForecast(setForecast)}
                        >
                            Use current location
                        </button>
                    </form>
                </section >

                {
                    forecast &&
                    <CurrentWeatherCard location={forecast.location} current={forecast.current} />
                }
                {
                    forecast && Object.keys(forecast.forecast.forecastday).length > 1 &&
                    <ForecastWeatherList forecastday={forecast.forecast.forecastday} />
                }
                {error !== null &&
                    <p color="red">
                        {error}
                    </p>
                }


            </main >
        </>
    );
}

export default Home;