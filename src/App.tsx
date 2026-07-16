import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const App = () => {
  const [stage, setStage] = useState(1);
  const [artist, setArtist] = useState({ name: '' });
  const [concept, setConcept] = useState({ chosen: '' });
  const [lyrics, setLyrics] = useState('');
  const [music, setMusic] = useState('');
  const [albumArt, setAlbumArt] = useState('');

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

  const handleMusicChange = (musicText) => {
    setMusic(musicText);
  };

  const handleAlbumArtChange = (albumArtText) => {
    setAlbumArt(albumArtText);
  };

  const generatePrompt = () => {
    if (stage === 1) {
      return `너는 글로벌 K-POP/인디 씬을 꿰뚫고 있는 천재 프로듀서야. 보컬의 매력을 극대화할 수 있는 독창적인 싱글 컨셉 3가지를 제안해줘.`;
    } else if (stage === 2) {
      return `현재 가장 퀄리티가 좋은 음악 생성 AI인 Suno나 Udio의 무료 크레딧을 활용해 ${concept.chosen} 장르의 ${artist.name}의 ${lyrics} 가사를 가진 곡을 생성해줘.`;
    } else if (stage === 3) {
      return `조용한 방에서 이불을 뒤집어쓰거나(자연 흡음) 스마트폰 마이크로 MR을 이어폰으로 들으며 보컬을 녹음하고, BandLab (완전 무료 DAW)을 사용해 오토튠(Auto-pitch) 기능과 무료 마스터링 프리셋을 사용해 그럴듯한 음질을 만들어줘.`;
    } else if (stage === 4) {
      return `SeaArt, Leonardo.ai, 혹은 Bing Image Creator (DALL-E 3)의 무료 크레딧을 사용해 ${concept.chosen} 컨셉에 맞는 앨범 아트를 생성해줘.`;
    } else if (stage === 5) {
      return `RouteNote 또는 Amuse 같은 무료 음원 유통사(Distributor)를 이용해 수수료(수익의 15% 내외)만 떼고 스포티파이, 애플뮤직, 멜론 등 전 세계 플랫폼에 초기 비용 0원으로 음원을 등록하고, 유튜브 쇼츠, 틱톡, 인스타그램 릴스를 메인 채널로 잡아 0원으로 앨범을 홍보해줘.`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify({
      artist: artist.name,
      concept: concept.chosen,
      lyrics: lyrics,
      music: music,
      albumArt: albumArt
    }, null, 2));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#1a202c] text-white">
      <header className="p-3 bg-[#1a202c] text-white">
        <h1 className="text-lg font-bold mb-2">0코스트 AI 음악 기획팀</h1>
        <p className="text-sm mb-4">페르소나 에이전트 · 단계별 프롬프트 워크벤치 · 무료 툴 연결 · localStorage 프로젝트 저장</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-ghost" id="btn-export" onClick={copyToClipboard}>총 재 정보 JSON로드</button>
          <button className="btn btn-ghost" id="btn-reset">총도트</button>
        </div>
      </header>
      <main className="card p-3 h-fit">
        <h2 className="text-lg font-bold mb-2">0코스트 AI 음악 기획팀</h2>
        <p className="text-sm mb-4">페르소나 에이전트 · 단계별 프롬프트 워크벤치 · 무료 툴 연결 · localStorage 프로젝트 저장</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-ghost" id="btn-export" onClick={copyToClipboard}>프로젝트 JSON보내기</button>
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
            />
            <textarea
              className="textarea textarea-ghost w-full max-w-xs"
              placeholder="음악"
              value={music}
              onChange={(e) => handleMusicChange(e.target.value)}
            />
            <textarea
              className="textarea textarea-ghost w-full max-w-xs"
              placeholder="앨범 아트"
              value={albumArt}
              onChange={(e) => handleAlbumArtChange(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm">프롬프트: {generatePrompt()}</p>
        </div>
      </main>
    </div>
  );
};

export default App;