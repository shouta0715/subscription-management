import * as v from "valibot";

export const yyyymmddSchema = v.custom<"YYYY-MM-DD">((value) => {
  if (typeof value !== "string") return false;
  const [yyyy, mm, dd] = value.split("-");
  if (!yyyy || !mm || !dd) return false;

  const yyyyNumber = Number(yyyy);
  const mmNumber = Number(mm.padStart(2, "0"));
  const ddNumber = Number(dd.padStart(2, "0"));

  const date = new Date(yyyyNumber, mmNumber - 1, ddNumber);

  return (
    date.getFullYear() === yyyyNumber &&
    date.getMonth() === mmNumber - 1 &&
    date.getDate() === ddNumber
  );
});

export type Yyyymmdd = v.InferOutput<typeof yyyymmddSchema>;
