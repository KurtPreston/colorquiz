export function mean(nums: number[]) {
  return sum(nums) / nums.length;
}

export function sum(nums: number[]): number {
  const [first, ...rest] = nums;
  let sum = first;
  for(const val of rest) {
    sum += val;
  }
  return sum
}