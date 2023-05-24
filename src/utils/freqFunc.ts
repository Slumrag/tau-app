
export type FreqRange = {
  startFreq: number,
  endFreq: number,
  stepFreq: number,
}
export function getFreqRange(freqRange: FreqRange): number[] {
  const freqSries: number[] = [];
  const { startFreq, endFreq, stepFreq } = freqRange;
  const [startFreqPow, endFreqPow, stepFreqPow] = [startFreq, endFreq, stepFreq].map(item => Math.log10(item))
  const LOGBASE = 10;
  if (
    !(stepFreq > 1e-3) ||
    !(stepFreqPow !== 0) ||
    !(startFreq < endFreq) ||
    !(endFreq - startFreq > stepFreq)) {
    return [];
  }
  const numPoints = Math.floor(
    (endFreqPow - startFreqPow) / stepFreqPow);
  // console.log(endFreqPow, startFreqPow, stepFreqPow);
  // console.log(numPoints)
  try {
    for (let i = 0; i < numPoints; i++)
      freqSries.push(Math.pow(LOGBASE, startFreqPow + i * stepFreqPow));

  } catch (error) {
    console.error(error)
    return [];
  }
  return freqSries;
}