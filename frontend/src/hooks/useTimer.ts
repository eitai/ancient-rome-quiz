import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface UseTimerConfig {
  duration: number;
  showHintAtSecondsLeft: number;
  onHint: () => void;
  onQuestionTimeExpire: () => void;
  currentQuestionIndex?: number | string;
}

export const useTimer = ({ duration, showHintAtSecondsLeft, onHint, onQuestionTimeExpire, currentQuestionIndex }: UseTimerConfig): number => {
  const [timeLeft, setTimeLeft] = useState(duration);

  const onHintRef = useRef(onHint);
  const onQuestionTimeExpireRef = useRef(onQuestionTimeExpire);

  useLayoutEffect(() => {
    onHintRef.current = onHint;
    onQuestionTimeExpireRef.current = onQuestionTimeExpire;
  });

  useEffect(() => {
    const questionStartedAt = Date.now();
    let hintHasBeenShown = false;
    let timerHasExpired = false;

    const runOneTick = () => {
      if (timerHasExpired) return;

      const secondsElapsed = Math.round((Date.now() - questionStartedAt) / 1000);
      const secondsRemaining = duration - secondsElapsed;

      setTimeLeft(secondsRemaining);

      if (!hintHasBeenShown && secondsRemaining <= showHintAtSecondsLeft) {
        hintHasBeenShown = true;
        onHintRef.current();
      }

      if (secondsRemaining <= 0) {
        timerHasExpired = true;
        onQuestionTimeExpireRef.current();
      }
    };

    runOneTick();
    const countdownInterval = setInterval(runOneTick, 1000);

    return () => clearInterval(countdownInterval);
  }, [currentQuestionIndex, duration, showHintAtSecondsLeft]);

  return timeLeft;
};
