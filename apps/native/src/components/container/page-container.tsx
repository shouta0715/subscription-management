import { ComponentProps, FC } from "react";
import { View } from "react-native";
import { cn } from "@/util/cn";

type Props = ComponentProps<typeof View>;
export const PageContainer: FC<Props> = ({ children, className, ...props }) => (
  <View className={cn(className, "bg-background-secondary flex-1")} {...props}>
    {children}
  </View>
);
