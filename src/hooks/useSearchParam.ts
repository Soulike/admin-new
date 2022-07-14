import {useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';

type SetterType = (_value: string | null) => void;

export function useSearchParam(paramName: string): [string | null, SetterType] {
    const [searchParams, setSearchParams] = useSearchParams();
    const value = searchParams.get(paramName);

    const setValue: SetterType = useCallback(
        (value) => {
            if (value !== null) {
                searchParams.set(paramName, value);
            }
            else {
                searchParams.delete(paramName);
            }
            setSearchParams(searchParams);
        },
        [paramName, searchParams, setSearchParams],
    );

    return [value, setValue];
}
