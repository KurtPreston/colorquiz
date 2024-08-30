import {RGB} from './color';

// How close are the colors
export function colorDiff(a: RGB, b: RGB): number {
  return Math.sqrt(
    Math.pow(b.r - a.r, 2) +
    Math.pow(b.g - a.g, 2) +
    Math.pow(b.b - a.b, 2)
  );
}