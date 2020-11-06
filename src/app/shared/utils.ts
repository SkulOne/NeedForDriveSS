
export function checkInterface<T>(key: string, object: any): object is T {
  return key in object;
}
