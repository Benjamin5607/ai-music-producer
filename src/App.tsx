import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [projectStatus, setProjectStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const steps: Step[] = [
    { id: 0, name: 'AI 프로듀서', description: '음악의 기본적인 멜로디와 코드 진행을 생성합니다.' },
    { id: 1, name: 'AI 작사가', description: '음악의 가사를 생성합니다.' },
    { id: 2, name: 'AI 작곡/MR 감독', description: '음악의 편곡과 믹스를 담당합니다.' },
    { id: 3, name: '보컬 녹음 및 보정', description: '가수를 통해 보컬을 녹음하고 보정합니다.' },
    { id: 4, name: '비주얼 및 앨범 아트워크 제작', description: '음악의 비주얼과 앨범 아트워크를 제작합니다.' },
    { id: 5, name: '유통 및 홍보', description: '음악을 유통하고 홍보합니다.' }
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    document.title = `0코스트 AI 음악 기획팀 - ${steps[currentStep].name}`;
  }, [currentStep, steps]);

  return (
    <div className='container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24 flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold mb-4'>0코스트 AI 음악 기획팀</h1>
      <p className='text-lg mb-4'>현재 단계: {steps[currentStep].name}</p>
      <div className='flex justify-between w-full mb-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handlePrevStep}><ArrowLeft size={20} /> 이전 단계</button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleNextStep}>다음 단계 <Play size={20} /></button>
      </div>
      <div className='bg-gray-200 p-4 rounded-lg shadow-md w-full'>
        {steps.map((step, index) => (
          <div key={step.id} className={`py-2 ${currentStep === index ? 'bg-blue-100' : ''}`}>{step.name} - {step.description}</div>
        ))}
      </div>
    </div>
  );
}

export default App;