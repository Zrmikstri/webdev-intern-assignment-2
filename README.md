# Golden Owl webdev intern assignment
This is an unfinish project for Golden Owl webdev intern assignment. As I'm not familiar with React nor Django, through this project I realize I have little to no experience with backend and webdev position . I'm sorry for the inconvenience.

# Requirements satisfaction 
## Must Have:
- All API processing is handled on the backend:

    - The backend has a view for fetching weather data based on query parameters (exact location supported by api provider, current location using coordinates) in [weather](./backend/core/weather/views.py). 

- Search for a city or country and display weather information:

    - I have implemented the search functionality in the frontend [handleFormSubmit()](./frontend/src/routes/Home.jsx) and display components for current weather and forecast (CurrentWeatherCard(), ForecastWeatherList() in [Weather.jsx](./frontend/src/components/Weather.jsx)).
    - The search query is sent to the backend, which then fetches weather data from the API and returns it to the frontend for display. But I have not correct the location query before send to the api and  handle error return by the api.

- Show the weather includes temperature, wind speed, humidity... for present day:

    - This is implemented in the [Home.jsx](./frontend/src/routes/Home.jsx).

- Show forecast 4 days later and more (load more):

    - The ForecastWeatherList() component displays the forecast, but there's no "load more" functionality implemented. I am missing a mechanism to fetch and display additional forecast data beyond the initial set.

- Save temporary weather information history and allow display again during the day:
    - Missing a way to implement a way to store weather data (possibly in the backend) and retrieve it for display without making additional API calls within the same day.

- There is a function to register and unsubscribe to receive daily weather forecast information via email address:

    - I can send verification email successfuly to inbox but missing process in the front end to handle verification link. 
    - Backend functionality for managing subscriptions and a frontend interface for users to manage their preferences also not yet implemented.

- Email confirmation is required:

    - The registration process includes an alert that prompts users to check their email to activate their account.
    - However, the specifics of this process (e.g., sending the email, handling the confirmation) are not finished yet.

- Deploy the application to go live:
    - I have no experience with deploying Django and React applications, so I don't meet this requirement.

## Nice to Have:
I also don't meet any of the "Nice to Have" requirements. As lack of experience with Django and React, and the time constraints, I was unable to implement any of these features.

- The application is responsive and works well on mobile devices.

- Smooth animation.

- Set up project with Docker.

# Self-assessment
- I have litte experience with Django, React and webdev as general, so I was unable to complete the project as required.

- This project has helped me realize my lack of experience with backend and webdev position. I will continue to learn and improve my skills in these areas.

# How to run
- Clone the repository
    
- Run the backend server:
    - Navigate to the `backend` directory
    - Run `pip install -r requirements.txt` to install the required packages
    - Run `python manage.py runserver` to start the server
- Run the frontend server:
    - Navigate to the `frontend` directory
    - Run `npm install` to install the required packages
    - Run `npm start` to start the server



