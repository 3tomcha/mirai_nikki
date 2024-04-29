import openai
from dotenv import load_dotenv
import os
from flask import Flask, request, send_file
from flask_cors import CORS
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
from PIL import Image
import io
import requests

load_dotenv()
openai.api_key=os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app) # これがCORSを許可する設定です

stability_api = client.StabilityInference(
    key=os.environ.get("STABILITY_KEY"),
    verbose=True,
)

@app.route("/chat")
def chat_with_gpt(): 
    req = request.args
    prompt = req.get("prompt", "")
    response = openai.Completion.create(
        engine='gpt-3.5-turbo-0125',  # 使用するエンジンを指定します
        prompt=prompt,
        max_tokens=1000,  # ChatGPTの応答の最大トークン数
        temperature=0.7,  # 生成される応答の多様性を制御します
        n=1,  # 生成する応答の数
        stop=None,  # 応答を停止するトリガーワードを指定します（必要に応じて使用）
    )

    reply = response.choices[0].text.strip()

    return reply

@app.route("/image")
def generate():
    req = request.args
    propmt = req.get("prompt", "")
    answers = stability_api.generate(
        prompt=propmt
    )
    for resp in answers:
        for artifact in resp.artifacts:
            if artifact.finish_reason == generation.FILTER:
                warnings.warn(
                    "Your request activated the API's safety filters and could not be processed."
                    "Please modify the prompt and try again.")
            if artifact.type == generation.ARTIFACT_IMAGE:
                return send_file(
                    io.BytesIO(artifact.binary),
                    mimetype='image/png'
                )

@app.route("/location")
def location():
    GOOGLEMAP_API_KEY = os.getenv("GOOGLEMAP_API_KEY")

    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Tokyo&key={GOOGLEMAP_API_KEY}"
    response = requests.get(url)
    data = response.json()
    print(data)
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

