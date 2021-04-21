import type { State, Contestant } from './types';
import { ClientState } from './types';
import { writable } from 'svelte/store';

export const contestants =
    writable<Contestant[]>([{ name: "", buzzKey: "Space", added: false, }]);

export const clientState      = writable(ClientState.Setup);
export const inHistory        = writable<boolean>(false);
export const serverDown       = writable<boolean>(false);
export const closeMsg         = writable<string>("");
export const closeCode        = writable<number>(0);
export const pointValuesIndex = writable<number>(0);

export const state = writable<State>({
    buzzer: { state: "Closed", owner: null },
    scores: {},
    history: [],
    ptsworth: 200
});
