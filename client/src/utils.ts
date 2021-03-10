export async function fetchObject<T>(url: string): Promise<T> {
    let res = await fetch(url);
    let obj = await res.json();
    return obj;
}

export function postObject<T>(url: string, obj: T): void {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    });
}

export function buzz(name: string): void {
    fetch('/buzz', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: name
    });
}

export function containsDuplicates<T>(xs: T[]): boolean {
    return xs.length !== new Set(xs).size;
}

export const buzzKeys = [
    { code: "Space",        name: "Space"        },
    { code: "NumpadEnter",  name: "Numpad Enter" },
    { code: "Numpad0",      name: "Numpad 0"     },
    { code: "ShiftRight",   name: "Right Shift"  },
    { code: "Enter",        name: "Enter"        },
    { code: "ShiftLeft",    name: "Left Shift"   },
    { code: "ControlLeft",  name: "Left Control" },
    { code: "ControlRight", name: "Right Control"}
];
