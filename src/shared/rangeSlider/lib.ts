export type TValue = number | number[];

/**
 * Return value in 0...1 stepped
 * @param value 0...1 or min...max
 * @param step
 * @param min
 * @param max
 * @param baseIsOriginal if true input and output min...max
 * @returns 0...1 or min...max
 */
const stepperize = (value: number, step: number | null, min = 0, max = 100, baseIsOriginal = false): number => {
  if (step === null) return value;

  const delta = max - min;
  const stepNormalized = baseIsOriginal ? step : (step * delta) / (delta * delta);

  return Number((Math.round(value / stepNormalized) * stepNormalized).toFixed(7));
};

/**
 * Return sorted arr with values in 0...1
 * @param value min...max
 * @param min
 * @param max
 * @returns 0...1
 */
const normalizeValue = (value: number | number[], min = 0, max = 100): number[] => {
  const arr = Array.isArray(value) ? value.sort((a, b) => a - b) : [value];

  const delta = max - min;

  return arr.map((item) => item / delta);
};

/**
 * Return sorted arr copy or number with values in min...max
 * @param value 0...1
 * @param isMultivalue
 * @param step
 * @param min
 * @param max
 * @returns min...max
 */
const normalizeInput = <T extends TValue>(
  value: number[],
  isMultivalue: boolean,
  step: number | null,
  min = 0,
  max = 100
): T => {
  const sorted = [...value].sort();

  const delta = max - min;

  const normalize = (val: number) => {
    return stepperize(val * delta + min, step, min, max, true);
  };

  return (isMultivalue === true ? sorted.map(normalize) : normalize(value[0])) as T;
};

export { stepperize, normalizeValue, normalizeInput };
