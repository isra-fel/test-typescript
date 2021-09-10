export function debounce<T, Y extends any[]>(
    callback: Action<T, Y>,
    delay: number
): Action<void, Y> {
    let timer: NodeJS.Timeout;
    return (...args: Y) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

type Action<T, Y extends any[]> = (...args: Y) => T;
