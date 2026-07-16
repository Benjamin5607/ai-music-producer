import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play } from 'lucide-react';

interface AIProducer {
  role: string;
  tool: string;
}

type AIProducers = AIProducer[];

const aiProducers: AIProducers = [
  { role: 'Executive Producer', tool: 'ChatGPT / Gemini' },
  { role: 'Lyricist', tool: 'Claude' },
  { role: 'Music Director', tool: 'Suno / Udio' }
];

function App() {
  const [concept, setConcept] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mr, setMr] = useState('');
  const [vocal, setVocal] = useState('');

  const handleConcept = async () => {
    try {
      setLoading(true);
      const prompt = "너는 글로벌 K-POP/인디 씬을 꿰뚫고 있는 천재 프로듀서야. 보컬의 매력을 극대화할 수 있는 독창적인 싱글 컨셉 3가지를 제안해줘.";
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 2048,
          temperature: 0.7
        })
      });
      const data = await response.json();
      setConcept(data.choices[0].text);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLyrics = async () => {
    try {
      setLoading(true);
      const prompt = `너는 ${concept} 컨셉에 맞는 가사를 작성해줘. 음절 수와 멜로디 라인을 고려해 벌스(Verse)-코러스(Chorus) 구조를 명확히 짜달라고 요청합니다.`;
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 2048,
          temperature: 0.7
        })
      });
      const data = await response.json();
      setLyrics(data.choices[0].text);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleMr = async () => {
    try {
      setLoading(true);
      const prompt = `너는 ${concept} 컨셉에 맞는 MR(반주)을 생성해줘. Suno용 스타일 태그(예: Lofi beats, emotional piano, R&B, 80bpm)와 가사를 주고 곡을 뽑아내게 합니다.`;
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 2048,
          temperature: 0.7
        })
      });
      const data = await response.json();
      setMr(data.choices[0].text);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleVocal = async () => {
    try {
      setLoading(true);
      const prompt = `너는 ${concept} 컨셉에 맞는 보컬을 녹음해줘. 조용한 방에서 이불을 뒤집어쓰거나(자연 흡음) 스마트폰 마이크로 MR을 이어폰으로 들으며 보컬을 녹음합니다.`;
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 2048,
          temperature: 0.7
        })
      });
      const data = await response.json();
      setVocal(data.choices[0].text);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>0코스트 AI 음악 기획팀</h1>
        <p>AI 에이전트 라인업</p>
        <ul>
          {aiProducers.map((producer) => (
            <li key={producer.role}>{producer.role}: {producer.tool}</li>
          ))}
        </ul>
        <h2>단계별 0코스트 데뷔 로드맵</h2>
        <ol>
          <li>컨셉 및 가사 기획 (비용: 0원)</li>
          <li>MR(반주) 및 멜로디 가이드 생성 (비용: 0원)</li>
          <li>본인 보컬 녹음 및 보정 (비용: 0원)</li>
        </ol>
        <button onClick={handleConcept} disabled={loading}>컨셉 제안하기</button>
        <button onClick={handleLyrics} disabled={loading}>가사 작성하기</button>
        <button onClick={handleMr} disabled={loading}>MR 생성하기</button>
        <button onClick={handleVocal} disabled={loading}>보컬 녹음하기</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
