import openai
from dotenv import load_dotenv
import os

load_dotenv()
openai.api_key=os.getenv("OPENAI_API_KEY")

def chat_with_gpt(prompt): 
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

while True:
    user_input = input("ユーザー: ")
    if user_input.lower() == "bye":
        print("ChatGPT: さようなら！またお会いしましょう！")
        break
    
    response = chat_with_gpt(user_input)
    print("AI: " + response)