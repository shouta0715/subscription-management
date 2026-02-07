/* eslint-disable @typescript-eslint/no-explicit-any */
type EmptyObject = Record<any, never>;

export const isEmpty = <V>(
  value: V,
): value is Extract<undefined | null | "" | [] | EmptyObject, V> => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value === "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value.constructor === Object) {
    return Object.keys(value).length === 0;
  }

  return false;
};
