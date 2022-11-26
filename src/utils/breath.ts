export default (sec: number, min: number, max: number) => {
  const a = 1/Math.E;
  const b = Math.E - a;
  return (Math.exp(Math.sin(sec * 3 * Math.PI)) - a) * (max-min) / b + min;
}
