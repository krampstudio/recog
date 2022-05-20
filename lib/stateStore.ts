import { writable } from "svelte/store";

export enum State {
    initial,
    selected,
    processing,
    processed,
    error,
}

export const stateStore = writable(State.initial);
