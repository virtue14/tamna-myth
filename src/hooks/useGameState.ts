'use client';

import { useState, useCallback } from 'react';

export interface GameState {
  isPlaying: boolean;
  currentItem: string | null;
  score: number;
  history: string[];
  startTime: Date | null;
  endTime: Date | null;
}

export interface TeamGameState extends GameState {
  team1Score: number;
  team2Score: number;
  currentTeam: 1 | 2;
  currentQuestion: string | null;
  currentAnswer: string | null;
  questions: Array<{
    question: string;
    answer: string;
    answered: boolean;
  }>;
}

export function useGameState(initialItems: string[]) {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    currentItem: null,
    score: 0,
    history: [],
    startTime: null,
    endTime: null,
  });

  const startGame = useCallback(() => {
    setGameState({
      isPlaying: true,
      currentItem: null,
      score: 0,
      history: [],
      startTime: new Date(),
      endTime: null,
    });
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      endTime: new Date(),
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      isPlaying: false,
      currentItem: null,
      score: 0,
      history: [],
      startTime: null,
      endTime: null,
    });
  }, []);

  const getRandomItem = useCallback(() => {
    const availableItems = initialItems.filter(item => !gameState.history.includes(item));
    
    if (availableItems.length === 0) {
      // 모든 아이템을 사용했으면 다시 섞기
      const randomItem = initialItems[Math.floor(Math.random() * initialItems.length)];
      setGameState(prev => ({
        ...prev,
        currentItem: randomItem,
        history: [randomItem],
      }));
      return randomItem;
    }

    const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    setGameState(prev => ({
      ...prev,
      currentItem: randomItem,
      history: [...prev.history, randomItem],
    }));
    return randomItem;
  }, [initialItems, gameState.history]);

  const addScore = useCallback((points: number = 1) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
    }));
  }, []);

  return {
    gameState,
    startGame,
    endGame,
    resetGame,
    getRandomItem,
    addScore,
  };
}

export function useTeamGameState(initialQuestions: Array<{ question: string; answer: string }>) {
  const [gameState, setGameState] = useState<TeamGameState>({
    isPlaying: false,
    currentItem: null,
    score: 0,
    history: [],
    startTime: null,
    endTime: null,
    team1Score: 0,
    team2Score: 0,
    currentTeam: 1,
    currentQuestion: null,
    currentAnswer: null,
    questions: initialQuestions.map(q => ({ ...q, answered: false })),
  });

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      startTime: new Date(),
      endTime: null,
    }));
  }, []);

  const endGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      endTime: new Date(),
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      currentItem: null,
      score: 0,
      history: [],
      startTime: null,
      endTime: null,
      team1Score: 0,
      team2Score: 0,
      currentTeam: 1,
      currentQuestion: null,
      currentAnswer: null,
      questions: initialQuestions.map(q => ({ ...q, answered: false })),
    }));
  }, [initialQuestions]);

  const getRandomQuestion = useCallback(() => {
    const availableQuestions = gameState.questions.filter(q => !q.answered);
    
    if (availableQuestions.length === 0) {
      // 모든 질문을 사용했으면 다시 섞기
      const randomQuestion = initialQuestions[Math.floor(Math.random() * initialQuestions.length)];
      setGameState(prev => ({
        ...prev,
        currentQuestion: randomQuestion.question,
        currentAnswer: randomQuestion.answer,
        questions: prev.questions.map(q => 
          q.question === randomQuestion.question ? { ...q, answered: false } : q
        ),
      }));
      return randomQuestion;
    }

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setGameState(prev => ({
      ...prev,
      currentQuestion: randomQuestion.question,
      currentAnswer: randomQuestion.answer,
      questions: prev.questions.map(q => 
        q.question === randomQuestion.question ? { ...q, answered: true } : q
      ),
    }));
    return randomQuestion;
  }, [gameState.questions, initialQuestions]);

  const switchTeam = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentTeam: prev.currentTeam === 1 ? 2 : 1,
    }));
  }, []);

  const addTeamScore = useCallback((team: 1 | 2, points: number = 1) => {
    setGameState(prev => ({
      ...prev,
      team1Score: team === 1 ? prev.team1Score + points : prev.team1Score,
      team2Score: team === 2 ? prev.team2Score + points : prev.team2Score,
    }));
  }, []);

  return {
    gameState,
    startGame,
    endGame,
    resetGame,
    getRandomQuestion,
    switchTeam,
    addTeamScore,
  };
}
