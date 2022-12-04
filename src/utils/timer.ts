export const timer = () => {
    const start = Date.parse('2022-08-17 00:00:00');
    const now = Date.now();
    const diff = now - start;
    const dayInMs = 1000 * 60 * 60 * 24;
    const days = Math.floor(diff / dayInMs);
    return {
        days,
        timeStr: `${(diff / dayInMs).toFixed(10)}`,
    }
}

export const sec = () => {
    return new Date().getTime() / 1000;
}