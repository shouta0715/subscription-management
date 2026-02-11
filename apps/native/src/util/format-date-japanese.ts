import { Yyyymmdd } from "@package/model/common";

/**
 * YYYY-MM-DD形式の日付を「M月D日」形式に変換
 */
export function formatDateShort(date: Yyyymmdd): string {
  const [, mm, dd] = date.split("-");
  const month = Number(mm);
  const day = Number(dd);

  return `${month}月${day}日`;
}

/**
 * YYYY-MM-DD形式の日付を「YYYY年M月D日」形式に変換
 */
export function formatDateFull(date: Yyyymmdd): string {
  const [yyyy, mm, dd] = date.split("-");
  const year = Number(yyyy);
  const month = Number(mm);
  const day = Number(dd);

  return `${year}年${month}月${day}日`;
}

/**
 * YYYY-MM-DD形式の日付をDateオブジェクトに変換
 */
export function parseDate(date: Yyyymmdd): Date {
  const [yyyy, mm, dd] = date.split("-");

  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
}
