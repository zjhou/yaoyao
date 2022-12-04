
const parseDate = (dateString: string) => {
    let time = Date.parse(dateString);
    if(!time){
        time = Date.parse(dateString.replace("T"," "));
        if(!time){
            const bound = dateString.indexOf('T');
            const dateData = dateString.slice(0, bound).split('-').map(Number);
            const timeData = dateString.slice(bound+1, -1).split(':').map(Number);

            time = Date.UTC(dateData[0],dateData[1]-1,dateData[2],timeData[0],timeData[1],timeData[2]);
        }
    }
    return time;
}
export const timer = () => {
    const start = parseDate('2022-08-17T00:00:00');
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
