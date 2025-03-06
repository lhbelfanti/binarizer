import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Criteria,
  CriteriaByMonth,
  CriteriaByYear,
  Filters,
  SelectedFilters,
} from '@components/CriteriaSelector/types';

// useFilters: Hook used to filter the Search Criteria based on the selection of the user. It can be filtered by year,
// by month, or by both of them.
export const useFilters = (criteria: Criteria[]) => {
  const [selected, setSelected] = useState<SelectedFilters>({ year: 0, month: 0 });
  const [filteredCriteria, setFilteredCriteria] = useState<Criteria[]>(criteria);

  // getAvailableYears returns all the available years from the criteria
  const getAvailableYears = useCallback((): number[] => {
    return Array.from(
      new Set(
        criteria.flatMap((criteria: Criteria): number[] =>
          criteria.years.map((yearData: CriteriaByYear): number => yearData.year)
        )
      )
    ).sort((a: number, b: number): number => a - b);
  }, [criteria]);

  // getAvailableMonths returns all the available months of a given year
  const getAvailableMonths = useCallback((year: number): number[] => {
    return Array.from(
      new Set(
        criteria.flatMap((criteria: Criteria): number[] =>
          criteria.years
            .filter((yearData: CriteriaByYear) => year === 0 || yearData.year === year)
            .flatMap((yearData: CriteriaByYear): number[] =>
              yearData.months.map((monthData: CriteriaByMonth): number => monthData.month)
            )
        )
      )
    ).sort((a: number, b: number): number => a - b);
  }, [criteria]);

  // Handler to filter criteria based on the selected year and month
  const filterCriteria = useCallback((): Criteria[] => {
    let filteredCriteria: Criteria[] = criteria;

    if (selected.year !== 0) {
      filteredCriteria = filteredCriteria
        .map((criteria: Criteria): Criteria => {
          return {
            ...criteria,
            years: criteria.years.filter((yearData: CriteriaByYear): boolean => yearData.year === selected.year),
          };
        })
        .filter((criteria: Criteria): boolean => criteria.years.length > 0);
    }

    if (selected.month !== 0) {
      filteredCriteria = filteredCriteria.map((criteria: Criteria): Criteria => {
        return {
          ...criteria,
          years: criteria.years
            .map((yearData: CriteriaByYear): CriteriaByYear => {
              return {
                ...yearData,
                months: yearData.months.filter(
                  (monthData: CriteriaByMonth): boolean => monthData.month === selected.month
                ),
              };
            })
            .filter((yearData: CriteriaByYear): boolean => yearData.months.length > 0),
        };
      }).filter((criteria: Criteria): boolean => criteria.years.length > 0);
    }

    return filteredCriteria;
  }, [criteria, selected]);

  // Initialize available once using useMemo
  const available = useMemo((): Filters => {
    const years: number[] = getAvailableYears();
    const months: number[] = getAvailableMonths(0);
    return { years, months };
  }, [getAvailableYears, getAvailableMonths]);

  useEffect(() => {
    setFilteredCriteria(filterCriteria());
  }, [filterCriteria]);

  // Return handlers/functions
  return {
    available,
    selected,
    filteredCriteria,
    selectYear: (year: number) => setSelected({ year, month: 0 }),
    selectMonth: (month: number) => setSelected((prev: SelectedFilters): SelectedFilters => ({ ...prev, month })),
    getAvailableMonths,
  };
};
