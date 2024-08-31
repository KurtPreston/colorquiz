import {RGB} from './color';

// How close are the colors
export function colorDiff(a: RGB, b: RGB): number {
  return Math.sqrt(
    Math.pow(b.r - a.r, 2) +
    Math.pow(b.g - a.g, 2) +
    Math.pow(b.b - a.b, 2)
  );
}

export function colorDiffPerc(guess: RGB, target: RGB): number {
  const actualDistance = colorDiff(guess, target);
  const corners = [];
  for(const r of [0, 255]) {
    for(const g of [0, 255]) {
      for(const b of [0, 255]) {
        corners.push({r, g, b});
      }
    }
  }
  const maxDistance = Math.max(...corners.map((corner) => (
    colorDiff(corner, target)
  )));

  const ratio = actualDistance / maxDistance;
  return (1 - ratio) * 100;
}