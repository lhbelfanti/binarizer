export interface MonthsFilterProps {
  availableMonths: number[];
  selectedMonth: number;
  onMonthSelected: (month: number) => void;
}
