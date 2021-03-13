import type { Buzzer, Player, Contestant, HistEntry } from './types';
import { writable } from 'svelte/store';

export const contestants =
    writable<Contestant[]>([{ name: "", blocked: false, buzzKey: "Space", }]);
export const clientBuzzer =
    writable<Buzzer>({ state: "Closed", owner: null });

export const amHost        = writable<boolean>    (false);
export const inHistory     = writable<boolean>    (false);
export const serverDown    = writable<boolean>    (false);
export const inSetup       = writable<boolean>    (true);
export const pointsWorth   = writable<number>     (200);
export const marker        = writable<number>     (0);
export const clientHistory = writable<HistEntry[]>([]);
export const clientScores  = writable<Player[]>   ([]);
