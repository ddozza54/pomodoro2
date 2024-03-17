import styled from 'styled-components';
import { motion } from '../node_modules/framer-motion';

export const AppBox = styled.main`
  width: 30rem;
  margin-top: 30px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const TimeInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-left: 6px;
  font-size: 5rem;
`;
export const Timer = styled.form`
  display: flex;
  align-items: center;
  font-size: 6rem;
  padding-bottom: 2rem;
`;
export const TimeBox = styled(motion.div)`
  width: 8rem;
  height: 12rem;
  background-color: #b4c794;
  padding: 0.5rem;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  text-indent: 30%;
`;
export const PlayBtn = styled(motion.button)`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 2rem;
  border: none;
  background-color: #dfd6cf;
  &:hover {
    cursor: pointer;
  }
`;
export const CounterBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 1rem 0;
`;
export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: large;
`;
export const CountNumber = styled.span`
  text-align: center;
`;
export const CountTitle = styled.span`
  font-weight: 800;
`;
