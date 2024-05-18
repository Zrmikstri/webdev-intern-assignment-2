import requests

from decouple import config
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def weather(request):
    if len(request.query_params) == 0:
        return Response({"error": "No query parameters provided."})

    base_url = config("WEATHER_API_BASE_URL")
    key = config("WEATHER_API_KEY")
    language = config("WEATHER_API_LANGUAGE")

    q = request.query_params.get("q")
    days = request.query_params.get("days")

    if days == 0:
        response = requests.get(
            f"{base_url}/current.json?key={key}&q={q}&lang={language}"
        )
    else:
        response = requests.get(
            f"{base_url}/forecast.json?key={key}&q={q}&days={int(days) + 1}&lang={language}"
        )

    return Response(response.json())
    # return Response(forecast)
