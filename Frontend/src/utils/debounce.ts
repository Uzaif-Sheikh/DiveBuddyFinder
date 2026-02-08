
export const debounce = (apifunc: (arg: string) => void, time: number) => {
    let timeout: NodeJS.Timeout;
    return (arg: string) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => apifunc(arg), time)
    };
} 