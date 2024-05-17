import requests

from decouple import config
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def weather(request):
    base_url = config("WEATHER_API_BASE_URL")
    key = config("WEATHER_API_KEY")
    language = config("WEATHER_API_LANGUAGE")

    # response = requests.get(
    #     f"{base_url}/current.json?key={key}&q=auto:ip&lang={language}"
    # )

    # return Response(response.json())
    # return Response({"weather": "sunny"})
