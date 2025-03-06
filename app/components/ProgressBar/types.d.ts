export interface ProgressBarProps {
  total: number;
  currentValue: number;
  style?: ProgressBarStyle;
}

export interface ProgressBarStyle {
  width?: string;
  height?: string;
  borderRadius?: string;
}
