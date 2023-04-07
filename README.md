# ChatGPTLineBot

### 1, **LINE Developersアカウントの作成**

まず、LINE Developersアカウントを作成します。アカウントがない場合は、以下のURLで登録してください:
**[https://developers.line.biz/ja/](https://developers.line.biz/ja/)**

### 2, **LINE Messaging APIチャンネルの作成**

LINE Developersコンソールで、新しいプロバイダを作成し、それに紐づくMessaging APIチャンネルを作成します。チャンネルを作成したら、チャンネルアクセストークンとチャンネルシークレットをメモしておきます。これらは後でGASと連携させる際に使用します。

### 3, **Googleスプレッドシートの準備**

新しいGoogle スプレッドシートを作成してください。

### 4, **Google Apps Scriptの作成**

スプレッドシートのメニューから「拡張機能」>「Apps Script」を選択し、新しいGoogle Apps Scriptプロジェクトを作成します。

### 5, **GASでLINE Messaging APIを利用するための準備**

Google Apps ScriptでLINE Messaging APIを使用するには、外部APIとして追加する必要があります。以下のURLを使ってGASプロジェクトの「ライブラリ」タブから「リソース」>「ライブラリ」を選択し、ライブラリを追加します：https://github.com/kobanyan/line-bot-sdk-gas

### 6, **GASのコードを書く**

Google Apps Scriptのエディタで、LINE Botの機能を実装するためのコードを書きます。

### 7, LINE BotのWebhook URLを設定

Google Apps Scriptのエディタで、上部の「デプロイ」>「新しいデプロイ」を選択します。「アクセスできるユーザー」を「全員」に設定し、「デプロイ」してください。公開されたウェブアプリケーションのURLをコピーしておきます。これがLINE BotのWebhook URLです。

### 8, LINE DevelopersコンソールでWebhook URLを設定

LINE Developersコンソールに戻り、作成したMessaging APIチャンネルの設定画面で「Webhook送信」を「利用する」に設定し、コピーしたWebhook URLを「Webhook URL」欄に入力して保存します。

### 9, LINE Botの動作確認

LINEアプリで、作成したLINE Botを友達追加し、メッセージを送信してみてください。Botが正しく機能していれば、ChatGPTからのレスポンスが届きます。また、Google スプレッドシートにユーザーIDとメッセージが記録されるはずです。
