import {prefix as serverPrefix} from '../Function';

export function prefix(url: string): string {
    return serverPrefix(`/blog${url}`);
}
