import openai
from dotenv import load_dotenv
import os
from flask import Flask, request, send_file
from flask_cors import CORS

load_dotenv()
openai.api_key=os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app) # これがCORSを許可する設定です

@app.route("/chat")
def chat_with_gpt(): 
    req = request.args
    prompt = req.get("prompt", "")
    response = openai.Completion.create(
        engine='text-davinci-003',  # 使用するエンジンを指定します
        prompt=prompt,
        max_tokens=500,  # ChatGPTの応答の最大トークン数
        temperature=0.7,  # 生成される応答の多様性を制御します
        n=1,  # 生成する応答の数
        stop=None,  # 応答を停止するトリガーワードを指定します（必要に応じて使用）
    )

    reply = response.choices[0].text.strip()

    return reply

if __name__ == "__main__":
    app.run(host="0.0.0.0")

