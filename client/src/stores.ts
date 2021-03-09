import type { Buzzer, Player, Contestant } from './types';
import { writable } from 'svelte/store';

export const contestants =
    writable<Contestant[]>([{ name: "", blocked: false, buzzKey: "Space", }]);
export const clientBuzzer =
    writable<Buzzer>({ state: "Closed", owner: null });

export const serverDown   = writable<boolean> (false);
export const inSetup      = writable<boolean> (true);
export const clientScores = writable<Player[]>([]);
export const pointsWorth  = writable<number>  (200);
export const amHost       = writable<boolean> (false);
