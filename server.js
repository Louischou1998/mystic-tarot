const axios = require('axios');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const MODEL = 'anthropic/claude-haiku-4.5';

const SYSTEM_PROMPT = `你是「命運之眼」——一位神秘古老的塔羅占卜師，居住在宇宙星辰與靈魂深處的交匯點。你擁有洞悉命運的能力，透過塔羅牌的智慧引導每一位尋覓者。

【說話風格】
- 神秘、詩意、充滿靈性智慧，但同時溫暖且平易近人
- 偶爾引用星辰、宇宙、光與影的意象
- 稱呼用戶為「尋覓者」或「朋友」
- 使用繁體中文
- 語氣如同慈悲而深邃的智者
- 偶爾使用 ✦ 或 ⋯⋯ 增添神秘感

【你的能力】
1. 為用戶抽取塔羅牌並深入解讀
2. 回答關於愛情、事業、財運、人際的問題
3. 提供靈性指引與人生智慧
4. 解釋塔羅牌的深層含義

【22張大阿爾克納】
愚者(O)、魔術師(I)、女祭司(II)、女皇(III)、皇帝(IV)、教皇(V)、戀人(VI)、戰車(VII)、力量(VIII)、隱者(IX)、命運之輪(X)、正義(XI)、倒吊人(XII)、死神(XIII)、節制(XIV)、惡魔(XV)、塔(XVI)、星星(XVII)、月亮(XVIII)、太陽(XIX)、審判(XX)、世界(XXI)

【抽牌格式】
當用戶要求抽牌時，必須使用此格式標示牌卡（隨機選擇，約30%機率為逆位）：
[CARD:牌名:正逆位]
例如：[CARD:太陽:正位] 或 [CARD:月亮:逆位]
每張牌必須有深入、有溫度的解讀，結合用戶的具體問題。

【回應長度：務必簡潔】
一般對話：50-80字
抽牌解讀：80-130字（必須包含 [CARD:...] 標籤）
絕對不要超過130字，言簡意賅才是智者之道。`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  console.log('[req] 訊息數:', messages.length);

  try {
    const response = await axios({
      method: 'post',
      url: 'https://openrouter.ai/api/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:30001',
        'X-Title': 'Mystic Tarot'
      },
      data: {
        model: MODEL,
        max_tokens: 350,
        stream: true,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages]
      },
      responseType: 'stream',
      timeout: 30000
    });

    console.log('[stream] 狀態碼:', response.status);

    let buf = '';
    let charCount = 0;

    response.data.on('data', (chunk) => {
      buf += chunk.toString();
      const lines = buf.split('\n');
      buf = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6).trim();
        if (payload === '[DONE]') return;
        try {
          const data = JSON.parse(payload);
          const text = data.choices?.[0]?.delta?.content ?? '';
          if (text) {
            charCount += text.length;
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
          }
        } catch {}
      }
    });

    response.data.on('end', () => {
      console.log(`[done] 完成，共 ${charCount} 字`);
      res.write('data: [DONE]\n\n');
      res.end();
    });

    response.data.on('error', (err) => {
      console.error('[stream error]', err.message);
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    });

    req.on('close', () => response.data.destroy());

  } catch (err) {
    let msg = err.message;
    if (err.response?.data && typeof err.response.data.on === 'function') {
      // responseType:'stream' 時要從 stream 讀取錯誤內容
      try {
        const chunks = [];
        for await (const chunk of err.response.data) chunks.push(chunk);
        msg = `HTTP ${err.response.status}: ${Buffer.concat(chunks).toString().slice(0, 300)}`;
      } catch { msg = `HTTP ${err.response?.status ?? ''}: ${err.message}`; }
    }
    console.error('[error]', msg.slice(0, 300));
    res.write(`data: ${JSON.stringify({ error: msg.slice(0, 300) })}\n\n`);
    res.end();
  }
});

const PORT = process.env.PORT || 30001;
app.listen(PORT, () => {
  console.log(`\n✦ 神秘塔羅伺服器已啟動`);
  console.log(`✦ 模型：${MODEL}`);
  console.log(`✦ 開啟瀏覽器前往: http://localhost:${PORT}\n`);
});
