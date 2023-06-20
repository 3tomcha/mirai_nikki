# 未来日記
目標達成のために面倒なスケジュールを立てますか？  
Non!それはもう必要ありません。  
これからは、あなたは目標を入力するだけ。AIが自動的にスケジュールを立ててくれるから、その通りに行動するだけで目標が達成できちゃいます。  
それが「未来日記」です。さぁデザインされた未来へ飛び込もう！  

<img width="740" alt="スクリーンショット 2023-06-15 20 29 22" src="https://github.com/3tomcha/mirai_nikki/assets/15997287/b2b0b288-016c-4b9b-a422-dea0c6309194">

## 推奨環境
PC: Brave最新版<br>
SP: Metamaskブラウザ最新版<br>

## 動作前提
Metamaskがインストールされていること<br>
Shibuya testnetがMetamaskのネットワークに追加されていること<br>
GoalTokenを持っていること<br>

## 使い方
<img width="789" alt="スクリーンショット 2023-06-20 9 54 24" src="https://github.com/3tomcha/mirai_nikki/assets/15997287/defbb153-45a4-4b03-8d4c-312ad3b8cd16"><br>
### ユーザー
#### ①スケジュールを作る
左の入力ボックスに、目標を入力して生成ボタンを押します。<br>
#### ②スケジュールを見る
生成されたスケジュールを見ることができます。<br>
#### ③約束する
下記のスケジュールを守ることを約束します。約束するためには、10GOALTokenが必要です。<br>
#### ④見届け人を決める
下記のスケジュールを実行したかを判断する見届け人のウォレットアドレスを設定します。<br>
#### ⑤見届け人とコミュニケーションをとる（オフチェーン）
LINEなどで、このページのキャプチャと実際に行動した証拠となる写真などを送ります。<br>
このスケジュール通り過ごしたことを見届け人にPRしましょう<br>
#### ⑥トークンを引き出す
見届け人に承認されたら、トークンを引き出すことができます。GOALTokenは最初より少し増えます。
#### ⑦自慢する
GOALTokenはいっぱい目標達成できた証！みんなに自慢しよう！
<br>

### 見届け人
#### ①ユーザーから連絡を受ける（オフチェーン）
LINEなどで、このページのキャプチャと実際に行動した証拠となる写真などを貰います。<br>
大体スケジュール通り過ごしたかどうかを判断します<br>
#### ②承認
スマートコントラクト上で承認のトランザクションを送ります。（追ってUI作成予定）<br>
#### ③喜ぶ
ユーザーが目標達成できたことを一緒に喜びましょう！今度は見届け人になってほしいとお願いするのもいいでしょう<br>

### オプション
#### A リセット
スマートコントラクトをリセットすることができます。動作しない場合に使ってください。<br>
#### B 画像生成
スケジュールのランダムな1時間に対して画像を作ることができます。<br>

ユーザー

# 技術詳細
フロントエンド
・React.js
・Typescript

バックエンド
・Flask
・Python

コントラクト
・Solidity
・Astar shibuya network
GoalToken
0x9CE4b49F94E9bbc43D72152B98cc6249087B292B
GoalContract
0xa1F2C33a6fB877Ca5970834c99bb9243D6eEb6ec
