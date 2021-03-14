export type Contestant = { name: string; blocked: boolean; buzzKey: string; };

export type Buzzer = { state: string; owner: string | null; };

export type Player = { name: string; score: number; };

export type HistEntry = { time: number[]; name: string; score: number; };
