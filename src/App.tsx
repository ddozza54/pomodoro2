import styled from 'styled-components'
import { motion } from "../node_modules/framer-motion"
import { useEffect, useState } from 'react';
import { FaPause, FaPlay } from "react-icons/fa6";
import ddozza from '../src/assets/Ddo.png';
import { useRecoilState } from 'recoil';
import { GOAL_TOTAL, POMO_TOTAL, ROUND_TOTAL, goalAtom, pomoTimeAtom, roundAtom } from './atoms';

const getMinutes = (fullSeconds: number) => {
  return String(Math.floor(fullSeconds / 60)).padStart(2, "0");
}
const getSeconds = (fullSeconds: number) => {
  return String(fullSeconds % 60).padStart(2, "0");
}
function App() {
  const [pomoTime, setPomoTime] = useRecoilState(pomoTimeAtom);
  const [round, setRound] = useRecoilState(roundAtom);
  const [goal, setGoal] = useRecoilState(goalAtom)
  const [isTimerWorking, setIsTimerWorking] = useState(false);

  useEffect(() => {
    if (isTimerWorking) {
      const timer = setInterval(() => {
        pomoTime > 0 &&
          setPomoTime(prev => prev - 1);
      }, 1000);
      if (pomoTime === 0) {
        setRound(prev => prev + 1);
        setIsTimerWorking(false);
        setPomoTime(POMO_TOTAL);
      }
      return () => clearInterval(timer);
    }
  }, [pomoTime, isTimerWorking])

  useEffect(() => {
    if (round === ROUND_TOTAL) {
      setGoal(prev => prev + 1)
      setRound(0)
    }
  }, [round])

  return (
    <AppBox>
      <img src={ddozza} width='80px' />
      <h2>DDOZZA's Pomodoro</h2>
      <Timer>
        <TimeBox>{getMinutes(pomoTime)}</TimeBox>
        <span>:</span>
        <TimeBox>{getSeconds(pomoTime)}</TimeBox>
      </Timer>
      <PlayBtn onClick={() => setIsTimerWorking(prev => !prev)}>
        {
          isTimerWorking ? <FaPause />
            : <FaPlay />
        }
      </PlayBtn>
      <CounterBox>
        <TextBox>
          <CountNumber>{round}/{ROUND_TOTAL}</CountNumber>
          <CountTitle>Round</CountTitle>
        </TextBox>
        <TextBox>
          <CountNumber>{goal}/{GOAL_TOTAL}</CountNumber>
          <CountTitle>GOAL</CountTitle>
        </TextBox>
      </CounterBox>
    </AppBox>
  )
}
const AppBox = styled.main`
    width: 30rem;
    margin-top: 30px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Timer = styled.div`
    display: flex;
    align-items: center;
    font-size: 6rem;
    padding-bottom: 2rem;
`;
const TimeBox = styled(motion.div)`
  width: 8rem;
  height: 12rem;
  background-color: #b4c794;
  padding: 0.5rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  `;
const PlayBtn = styled.button`
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 2rem;
    border: none;
    background-color:#dfd6cf ;
  `;
const CounterBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 1rem 0;
  `;
const TextBox = styled.div`
display: flex;
flex-direction: column;
font-size: large;
`;
const CountNumber = styled.span`
  text-align: center;
`;
const CountTitle = styled.span`
  font-weight: 800;
`;
export default App
