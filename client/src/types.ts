export type Contestant = { name: string; blocked: boolean; buzzKey: string }

export type Buzzer = { state: string; owner: string | null };

export type Player = { name: string; score: number; }
