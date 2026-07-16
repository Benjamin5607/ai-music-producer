import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState(1);
  const [artist, setArtist] = useState({ name: '' });
  const [concept, setConcept] = useState({ chosen: '' });
  const [lyrics, setLyrics] = useState('');
  const [music, setMusic] = useState('');

  const stages = [
    { id: 1, icon: '🎤', label: '컨셉 및 가사 기획' },
    { id: 2, icon: '🎵', label: 'MR(반주) 및 멜로디 가이드 생성' },
    { id: 3, icon: '🎧', label: '본인 보컬 녹음 및 보정' },
    { id: 4, icon: '🎨', label: '비주얼 및 앨범 아트워크 제작' },
    { id: 5, icon: '📢', label: '유통 및 홍보' }
  ];

  const handleStageChange = (stageId) => {
    setStage(stageId);
  };

  const handleArtistChange = (artistName) => {
    setArtist({ name: artistName });
  };

  const handleConceptChange = (conceptName) => {
    setConcept({ chosen: conceptName });
  };

  const handleLyricsChange = (lyricsText) => {
    setLyrics(lyricsText);
  };

  const handleMusicChange = (musicFile) => {
    setMusic(musicFile);
  };

  const getConcept = async () => {
    try {
      const response = await fetch('https://api.example.com/concept');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch concept:', error);
      return null;
    }
  };

  const getLyrics = async (concept) => {
    try {
      const response = await fetch(`https://api.example.com/lyrics?concept=${concept}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch lyrics:', error);
      return null;
    }
  };

  const getMusic = async (lyrics) => {
    try {
      const response = await fetch(`https://api.example.com/music?lyrics=${lyrics}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch music:', error);
      return null;
    }
  };

  useEffect(() => {
    if (stage === 1) {
      getConcept().then((concept) => concept && handleConceptChange(concept));
    } else if (stage === 2) {
      getLyrics(concept.chosen).then((lyrics) => lyrics && handleLyricsChange(lyrics));
    } else if (stage === 3) {
      getMusic(lyrics).then((music) => music && handleMusicChange(music));
    }
  }, [stage, concept, lyrics]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#1a202c] text-white">
      <header className="p-3 bg-[#1a202c] text-white">
        <h1 className="text-lg font-bold mb-2">0코스트 AI 음악 기획팀</h1>
        <p className="text-sm mb-4">페르소나 에이전트 · 단계별 프롬프트 워크벤치 · 무료 툴 연결 · localStorage 프로젝트 저장</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-ghost" id="btn-export">프로젝트 JSON보내기</button>
          <button className="btn btn-ghost" id="btn-reset">초기화</button>
        </div>
      </header>
      <main className="card p-3 h-fit">
        <h2 className="text-lg font-bold mb-2">0코스트 AI 음악 기획팀</h2>
        <p className="text-sm mb-4">페르소나 에이전트 · 단계별 프롬프트 워크벤치 · 무료 툴 연결 · localStorage 프로젝트 저장</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-ghost" id="btn-export">프로젝트 JSON보내기</button>
          <button className="btn btn-ghost" id="btn-reset">초기화</button>
        </div>
        <div className="grid md:grid-cols-[240px_1fr] gap-4">
          <div className="flex flex-col items-center justify-center">
            {stages.map((stage) => (
              <button
                key={stage.id}
                className="btn btn-ghost"
                onClick={() => handleStageChange(stage.id)}
              >
                <span className="mr-2">{stage.icon}</span>
                {stage.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <input
              type="text"
              className="input input-ghost w-full max-w-xs"
              placeholder="아티스트 이름"
              value={artist.name}
              onChange={(e) => handleArtistChange(e.target.value)}
            />
            <select
              className="select select-ghost w-full max-w-xs"
              value={concept.chosen}
              onChange={(e) => handleConceptChange(e.target.value)}
            >
              <option value="">컨셉 선택</option>
              <option value="팝">팝</option>
              <option value="록">록</option>
            </select>
            <textarea
              className="textarea textarea-ghost w-full max-w-xs"
              placeholder="가사"
              value={lyrics}
              onChange={(e) => handleLyricsChange(e.target.value)}
            ></textarea>
            <input
              type="file"
              className="input input-ghost w-full max-w-xs"
              placeholder="음악 파일"
              onChange={(e) => handleMusicChange(e.target.files[0])}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
