/**
 * Calculates the sine of an angle given in degrees.
 * @param degree - The angle in degrees.
 * @returns The sine of the input angle.
 */
export function sine(degree: number): number {
  const radians = degree * (Math.PI / 180);
  return Math.sin(radians);
}

/**
 * Calculates the cosine of an angle given in degrees.
 * @param degree - The angle in degrees.
 * @returns The cosine of the input angle.
 */
export function cosine(degree: number): number {
  const radians = degree * (Math.PI / 180);
  return Math.cos(radians);
}

/**
 * Calculates the tangent of an angle given in degrees.
 * @param degree - The angle in degrees.
 * @returns The tangent of the input angle.
 */
export function tangent(degree: number): number {
  const radians = degree * (Math.PI / 180);
  return Math.tan(radians);
}

/**
 * Calculates the arccosine of a given number in degrees.
 *
 * @param x - The input value for which the arccosine needs to be calculated.
 * @returns The calculated arccosine value in degrees.
 */
export function acosine(x: number): number {
  const radians = Math.acos(x);
  const degrees = (radians * 180) / Math.PI;
  const normalizedDegrees = (degrees + 360) % 360;
  return normalizedDegrees;
}

/**
 * Calculates the arcsine of a given number in degrees.
 *
 * @param x - The input number for which the arcsine needs to be calculated.
 * @returns The calculated arcsine of the input number in degrees.
 */
export function asine(x: number): number {
  const degreesPerRadian = 180 / Math.PI;
  return Math.asin(x) * degreesPerRadian;
}
