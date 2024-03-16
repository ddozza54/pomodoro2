import { atom } from 'recoil';

// export const POMO_TOTAL = 0.1 * 60;
export const POMO_TOTAL = 3;
export const pomoTimeAtom = atom({
  key: 'pomoTime',
  default: POMO_TOTAL,
});

export const ROUND_TOTAL = 2;
export const roundAtom = atom({
  key: 'round',
  default: 0,
});

export const GOAL_TOTAL = 12;
export const goalAtom = atom({
  key: 'goal',
  default: 0,
});
