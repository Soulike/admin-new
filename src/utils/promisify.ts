import {setImmediate} from 'timers';

export async function setImmediatePromise() {
    return new Promise((resolve) => setImmediate(resolve));
}
