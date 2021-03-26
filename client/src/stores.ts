import type { State, Contestant } from './types';
import { writable } from 'svelte/store';

export const contestants =
    writable<Contestant[]>([{ name: "", buzzKey: "Space", }]);

export const amHost     = writable<boolean>(false);
export const inHistory  = writable<boolean>(false);
export const inSetup    = writable<boolean>(true);
export const serverDown = writable<boolean>(false);

export const state = writable<State>({
    buzzer: { state: "Closed", owner: null },
    scores: {},
    history: [],
    ptsworth: 200
});
