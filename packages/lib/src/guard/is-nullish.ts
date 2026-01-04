export const isNullish = <T>(value: T): value is Extract<T, null | undefined> =>
  value === null || value === undefined;
