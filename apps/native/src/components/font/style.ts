import { tv, type VariantProps } from "tailwind-variants";

export const fontStyle = tv({
  variants: {
    font: {
      noto: "",
      inter: "",
    },
    bold: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      font: "noto",
      bold: false,
      class: "font-noto-normal",
    },
    {
      font: "noto",
      bold: true,
      class: "font-noto-semibold",
    },
    {
      font: "inter",
      bold: false,
      class: "font-inter-normal",
    },
    {
      font: "inter",
      bold: true,
      class: "font-inter-semibold",
    },
  ],
  defaultVariants: {
    font: "noto",
    bold: false,
  },
});

export type FontVariantProps = VariantProps<typeof fontStyle>;
