import * as v from "valibot";
import type { GenericSchema } from "valibot";

/**
 * 指定したスキーマに従ってデータをバリデーションし、その結果を返します。
 *
 * @template T 使用するスキーマの型
 * @param {T} schema バリデーションに使用する valibot スキーマ
 * @param {unknown} data バリデーションするデータ
 * @returns {v.InferOutput<T>} バリデーションされたデータ
 */
export const parseSchema = <T extends GenericSchema>(
  schema: T,
  data: unknown,
): v.InferOutput<T> => v.parse(schema, data);

/**
 * 指定したスキーマに従ってデータを安全にバリデーションし、成功・失敗を含む結果を返します。
 *
 * @template T 使用するスキーマの型
 * @param {T} schema バリデーションに使用する valibot スキーマ
 * @param {unknown} data バリデーションするデータ
 * @returns {v.SafeParseResult<T>} バリデーションの安全な結果（成功またはエラーを含む）
 */
export const safeParseSchema = <T extends GenericSchema>(
  schema: T,
  data: unknown,
): v.SafeParseResult<T> => v.safeParse(schema, data);

/**
 * 指定したスキーマで配列データをバリデーションし、バリデーション結果の配列を返します。
 *
 * @template T 使用するスキーマの型
 * @param {T} schema 配列の要素に使用する valibot スキーマ
 * @param {unknown} data バリデーションするデータ（配列）
 * @returns {v.InferOutput<T>[]} バリデーション済みのデータ配列
 */
export const parseToArraySchema = <T extends GenericSchema>(
  schema: T,
  data: unknown,
): v.InferOutput<T>[] => v.parse(v.array(schema), data);
