export interface YearsFilterProps {
  availableYears: number[];
  selectedYear: number;
  onYearSelected: (year: number) => void;
}
