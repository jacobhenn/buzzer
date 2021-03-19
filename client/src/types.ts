export type Contestant = { name: string; blocked: boolean; buzzKey: string; };

export type Buzzer = { state: string; owner: string | null; };

export type Player = { score: number; blocked: boolean };

export type HistEntry = { time: number[]; name: string; score: number; };

export type State = {
    buzzer: Buzzer;
    scores: { [key: string]: Player };
    history: HistEntry[];
    ptsworth: number;
};
