export const timer = () => {
    const start = new Date('2022-08-17');
    const now = Date.now();
    const diff = now - start;
    const dayInMs = 1000 * 60 * 60 * 24;
    const days = Math.floor(diff / dayInMs);
    return {
        days,
        timeStr: `${diff / dayInMs}`,
    }
}