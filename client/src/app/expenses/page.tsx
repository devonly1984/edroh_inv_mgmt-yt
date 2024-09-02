"use client"

import SharedHeader from "@/components/shared/SharedHeader";
import { classNames } from "@/contants";
import { useGetExpensesByCategoryQuery } from "@/redux/state/api";
import { useMemo, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {AggregatedData, AggregatedDataItem, ExpenseByCategorySummary} from '@/types'
import { parseDate } from "@/lib/utils";
const Expenses = () => {
const {
  data: expensesData,
  isLoading,
  isError,
} = useGetExpensesByCategoryQuery();
const [activeIndex, setActiveIndex] = useState(0)
const [selectedCategory, setSelectedCategory] = useState('All')
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("")
const expenses = useMemo(() => expensesData ?? [], [expensesData]);
const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesCategory && matchesDate;
      })
      .reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
        const amount = parseInt(data.amount);
        if (!acc[data.category]) {
          acc[data.category] = { name: data.category, amount: 0 };
          acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          acc[data.category].amount += amount;
        }
        return acc;
      }, {});

    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);
if(isLoading) {
    return <div className="py-4">Loading...</div>;
}
if (isError || !expensesData) {
  return (
    <div className="text-center text-red-500 py-4">
      Failed to fetch Expenses Data
    </div>
  );
}

  return (
    <div className="mb-5">
      {/**Header */}
      <SharedHeader name="Expenses" />
      <p className="text-sm text-gray-500">
        A Visual Representation of Expenses over Time
      </p>
      {/**Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter By Category and Date
          </h3>
          <div className="space-y-4">
            <div className="">
              <label htmlFor="category" className={`${classNames.label}`}>
                Category
              </label>
              <select
                name="category"
                id="category"
                className={`${classNames.selectedInput}`}
                defaultValue={"All"}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                <option value="">Office</option>
                <option value="">Professional</option>
                <option value="">Salaries</option>
              </select>
            </div>
            <div className="">
              <label htmlFor="Start Date" className={`${classNames.label}`}>
                Start Date
              </label>
              <input
                name="start-date"
                id="start-date"
                className={`${classNames.selectedInput}`}
                value={startDate}
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="">
              <label htmlFor="Start Date" className={`${classNames.label}`}>
                End Date
              </label>
              <input
                name="end-date"
                id="end-date"
                className={`${classNames.selectedInput}`}
                value={endDate}
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/**Chart */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map(
                  (entry: AggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "rgb(29,78,216)" : entry.color
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default Expenses;
