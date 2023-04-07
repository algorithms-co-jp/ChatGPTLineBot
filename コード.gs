// グローバル変数を定義
const CHANNEL_ACCESS_TOKEN = 'your_channel_access_token';
const CHANNEL_SECRET = 'your_channel_secret';
const SPREADSHEET_ID = 'your_spreadsheet_id';
const OPENAI_API_KEY = 'your_openai_api_key';

// LINEからのイベント（メッセージ）を処理
function doPost(e) {
  // イベントの内容を取得
  const contents = JSON.parse(e.postData.contents);
  const events = contents.events;
  const replyToken = events[0].replyToken;

  // replyTokenがundefinedの場合、処理を終了
  if (typeof replyToken === 'undefined') {
    return;
  }

  // メッセージとユーザーIDを取得
  const message = events[0].message.text;
  const userId = events[0].source.userId;

  // ChatGPTから応答を取得
  const chatGPTResponse = fetchChatGPTResponse(message, userId);

  // スプレッドシートにユーザーID、メッセージ、応答を記録
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
  sheet.appendRow([new Date(), userId, message, chatGPTResponse]);

  // 応答メッセージを作成
  const replyMessage = {
    type: 'text',
    text: chatGPTResponse,
  };

  // ユーザーに応答メッセージを送信
  sendReply(replyToken, [replyMessage]);
}

// ChatGPTから応答を取得する関数
function fetchChatGPTResponse(prompt, userId) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + OPENAI_API_KEY,
  };

  // メッセージ履歴を取得
  const messageHistory = getMessageHistory(userId);

  // APIリクエストのペイロードを作成
  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      ...messageHistory,
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 50,
  };

  // APIリクエストのオプションを作成
  const options = {
    method: 'post',
    headers: headers,
    payload: JSON.stringify(payload),
  };

  // APIリクエストを実行し、レスポンスを取得
  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());
  return jsonResponse.choices[0].message.content;
}

// ユーザーIDに基づいてメッセージ履歴を取得する関数
function getMessageHistory(userId) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const messageHistory = [];

// ユーザーIDが一致する行のメッセージと応答を取得
  for (const row of data) {
    if (row[1] === userId) {
      messageHistory.push({role: 'user', content: row[2]});
      messageHistory.push({role: 'assistant', content: row[3]});
    }
  }

  return messageHistory;
}

// LINEに応答メッセージを送信する関数
function sendReply(replyToken, messages) {
// LINE Messaging APIのエンドポイント
  const url = 'https://api.line.me/v2/bot/message/reply';
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };

// APIリクエストのペイロードを作成
  const payload = {
    replyToken: replyToken,
    messages: messages,
  };

// APIリクエストのオプションを作成
  const options = {
    method: 'post',
    headers: headers,
    payload: JSON.stringify(payload),
  };

// APIリクエストを実行
  UrlFetchApp.fetch(url, options);
}
