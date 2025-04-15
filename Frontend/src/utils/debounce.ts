
export const debounce = (apifunc: (arg: string) => void, time: number) => {
    let timeout: number;
    return (arg: string) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => apifunc(arg), time)
    };
} 