import type { HistEntry, Contestant } from './types';

export function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => i)
}

export const socket = new WebSocket(`ws://${window.location.host}/ws`);

export function containsDuplicates<T>(xs: T[]): boolean {
    return xs.length !== new Set(xs).size;
}

export function logHistory(h: HistEntry[], n: string, s: number): void {
    var d = new Date();
    h = [{
        time: [d.getHours(), d.getMinutes()],
        name: n,
        score: s
    }, ...h];
}

export const buzzKeys = [
    { code: "Space",        name: "Space"        },
    { code: "NumpadEnter",  name: "Numpad Enter" },
    { code: "ControlLeft",  name: "Left Control" },
    { code: "Numpad0",      name: "Numpad 0"     },
    { code: "ShiftLeft",    name: "Left Shift"   },
    { code: "ShiftRight",   name: "Right Shift"  },
    { code: "Enter",        name: "Enter"        },
    { code: "ControlRight", name: "Right Control"}
];
