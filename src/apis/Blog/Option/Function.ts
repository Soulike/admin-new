import {prefix as blogPrefix} from '../Function';

export function prefix(url: string): string {
    return blogPrefix(`/option${url}`);
}
