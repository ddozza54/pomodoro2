import { useEffect, useState } from 'react';
import { FaPause, FaPlay } from "react-icons/fa6";
import ddozza from '../src/assets/Ddo.png';
import { useRecoilState } from 'recoil';
import * as S from "./styles";
import * as A from './atoms';

const getMinutes = (fullSeconds: number) => {
  return String(Math.floor(fullSeconds / 60)).padStart(2, "0");
}
const getSeconds = (fullSeconds: any) => {
  return String(fullSeconds % 60).padStart(2, "0");
}
function App() {
  const [pomoTime, setPomoTime] = useRecoilState(A.pomoTimeAtom);
  const [minutes, setMinutes] = useState(getMinutes(pomoTime))
  const [seconds, setSeconds] = useState(getSeconds(pomoTime))
  const [round, setRound] = useRecoilState(A.roundAtom);
  const [goal, setGoal] = useRecoilState(A.goalAtom)
  const [isTimerWorking, setIsTimerWorking] = useState(false);
  const [IsDisableToSetTime, setIsDisableToSetTime] = useState(false);
  const onPlayBtnClick = () => {
    setIsTimerWorking(prev => !prev);
    setPomoTime(Number(minutes) * 60 + Number(seconds));
    setIsDisableToSetTime(prev => !prev)
  };

  useEffect(() => {
    if (isTimerWorking) {
      const timer = setInterval(() => {
        pomoTime > 0 &&
          setPomoTime(prev => prev - 1);
      }, 1000);
      if (pomoTime === 0) {
        setRound(prev => prev + 1);
        setIsTimerWorking(false);
        setPomoTime(A.POMO_TOTAL);
        setIsDisableToSetTime(false)
      }
      return () => clearInterval(timer);
    }
  }, [pomoTime, isTimerWorking])

  useEffect(() => {
    if (round === A.ROUND_TOTAL) {
      setGoal(prev => prev + 1)
      setRound(0)
    }
  }, [round])

  return (
    <S.AppBox>
      <img src={ddozza} width='80px' />
      <h2>DDOZZA's Pomodoro</h2>
      <span>Set Pomodoro Time</span>
      <S.Timer onSubmit={(event) => {
        event.preventDefault();
      }}>
        <S.TimeBox
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}>
          <S.TimeInput onChange={(event) => {
            Number(event.target.value) >= 0 ? setMinutes(event.target.value.padStart(2, "0")) : setMinutes("00")
          }} type='number' value={isTimerWorking ? getMinutes(pomoTime) : minutes} disabled={IsDisableToSetTime} />
        </S.TimeBox>
        <span>:</span>
        <S.TimeBox
          key={pomoTime}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <S.TimeInput onChange={(event) => {
            Number(event.target.value) >= 0 ? setSeconds(event.target.value.padStart(2, "0")) : setSeconds("00")
          }}
            type='number' value={isTimerWorking ? getSeconds(pomoTime) : seconds} disabled={IsDisableToSetTime} />
        </S.TimeBox>
      </S.Timer>
      <S.PlayBtn onClick={onPlayBtnClick} whileHover={{ scale: 1.2 }}>
        {
          isTimerWorking ? <FaPause />
            : <FaPlay />
        }
      </S.PlayBtn>
      <S.CounterBox>
        <TextBox>
          <CountNumber>{round}/{ROUND_TOTAL}</CountNumber>
          <CountTitle>Round</CountTitle>
        </TextBox>
        <TextBox>
          <CountNumber>{goal}/{GOAL_TOTAL}</CountNumber>
          <CountTitle>GOAL</CountTitle>
        </TextBox>
      </S.CounterBox>
    </S.AppBox>
  )
}

export default App
