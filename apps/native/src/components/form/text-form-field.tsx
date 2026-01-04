import { TextField } from "heroui-native";
import { ComponentProps, useId } from "react";
import { fontStyle, FontVariantProps } from "../font/style";
import { FormItemContext, useFormField } from "./form-filed";
import { cn } from "@/util/cn";

type WithFontVariantProps = FontVariantProps & {
  className?: string;
};

type TextFormItemProps = Omit<
  ComponentProps<typeof TextField>,
  "className" | "isInvalid"
> &
  WithFontVariantProps;

function TextFormItem({ className, font, bold, ...props }: TextFormItemProps) {
  const id = useId();
  const { error } = useFormField();

  return (
    <FormItemContext value={{ id }}>
      <TextField
        className={cn(
          fontStyle({
            font,
            bold,
          }),
          "text-sm",
          className,
        )}
        isInvalid={!!error}
        nativeID={id}
        {...props}
      />
    </FormItemContext>
  );
}

type TextFormLabelProps = Omit<
  ComponentProps<typeof TextField.Label>,
  "className"
> &
  WithFontVariantProps;

function TextFormLabel({
  className,
  font,
  bold,
  ...props
}: TextFormLabelProps) {
  const { formItemId } = useFormField();

  return (
    <TextField.Label
      className={cn(
        fontStyle({
          font,
          bold,
        }),
        "text-sm",
        className,
      )}
      nativeID={formItemId}
      {...props}
    />
  );
}

type TextFieldDescriptionProps = Omit<
  ComponentProps<typeof TextField.Description>,
  "className"
> &
  WithFontVariantProps;

function TextFieldDescription({
  className,
  font,
  bold,
  ...props
}: TextFieldDescriptionProps) {
  const { formDescriptionId } = useFormField();

  return (
    <TextField.Description
      className={cn(
        fontStyle({
          font,
          bold,
        }),
        "text-sm",
        className,
      )}
      nativeID={formDescriptionId}
      {...props}
    />
  );
}

type TextFieldErrorMessageProps = Omit<
  ComponentProps<typeof TextField.ErrorMessage>,
  "className" | "children"
> &
  WithFontVariantProps;

function TextFieldErrorMessage({
  className,
  font,
  bold,
  ...props
}: TextFieldErrorMessageProps) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : null;

  if (!body) return null;

  return (
    <TextField.ErrorMessage
      className={cn(
        fontStyle({
          font,
          bold,
        }),
        "text-sm",
        className,
      )}
      nativeID={formMessageId}
      {...props}
    >
      {body}
    </TextField.ErrorMessage>
  );
}

type TextFormInputProps = Omit<
  ComponentProps<typeof TextField.Input>,
  "className"
> &
  WithFontVariantProps;

const TextFormInput = ({
  className,
  font,
  bold,
  ...props
}: TextFormInputProps) => (
  <TextField.Input
    className={cn(fontStyle({ font, bold }), className)}
    {...props}
  />
);

type TextFormInputStartContentProps = Omit<
  ComponentProps<typeof TextField.InputStartContent>,
  "className"
> &
  WithFontVariantProps;

const TextFormInputStartContent = ({
  className,
  font,
  bold,
  ...props
}: TextFormInputStartContentProps) => (
  <TextField.InputStartContent
    className={cn(fontStyle({ font, bold }), className)}
    {...props}
  />
);

type TextFormInputEndContentProps = Omit<
  ComponentProps<typeof TextField.InputEndContent>,
  "className"
> &
  WithFontVariantProps;

const TextFormInputEndContent = ({
  className,
  font,
  bold,
  ...props
}: TextFormInputEndContentProps) => (
  <TextField.InputEndContent
    className={cn(fontStyle({ font, bold }), className)}
    {...props}
  />
);

export {
  TextFormItem,
  TextFormLabel,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFormInput,
  TextFormInputStartContent,
  TextFormInputEndContent,
};
