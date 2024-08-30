export function splitCamelCase(camelCase: string): string {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1 $2');
}