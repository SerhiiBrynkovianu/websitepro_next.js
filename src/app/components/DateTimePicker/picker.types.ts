import { ReactNode } from "react";

export interface DateTimeValue {
  date?: Date | null;
  hour?: string;
  minute?: string;
  dayTime?: "AM" | "PM";
}
export interface DateTimePickerProps {
  className?: string;
  value: DateTimeValue;
  children?: ReactNode;
  disabled?: boolean;
  onChange?: (value: DateTimeValue) => void;
}
