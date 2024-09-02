"use client"

import { useGetDashboardMetricsQuery } from "@/redux/state/api";
import CardHeader from "../shared/Header";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ExpenseByCategorySummary, ExpenseSums } from "@/types";
import { colors } from "@/contants";
import { TrendingUp } from "lucide-react";



const ExpenseSummary = () => {
    const { data:DashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
    const expenseByCategorySummary = DashboardMetrics?.expenseByCategorySummary || [];
    const expenseSummary = DashboardMetrics?.expenseSummary[0]
    const expenseSums = expenseByCategorySummary.reduce(
      (acc: ExpenseSums, curr: ExpenseByCategorySummary) => {
        const category = curr.category + " Expenses";
        const amount = parseInt(curr.amount, 10);
        if (!acc[category]) {acc[category] = 0;}
        acc[category] += amount;
        return acc;
      },
      {}
    );
    const expenseCategories = Object.entries(expenseSums).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
    const totalExpenses = expenseCategories.reduce((acc,category:{value:number})=>(
        acc+category.value
    ),0)
    const formattedTotalExpenses = totalExpenses.toFixed(2);
  return (
    <div className="row-span-3 flex flex-col rounded-2xl justify-between bg-white shadow-md">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <CardHeader title="Expense Summary" />
          {/**Body */}
          <div className="xl:flex jutify-between pr-7">
            <div className="relative basis-3/5">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={50}
                    outerRadius={60}
                    fill="#888fd8"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                <span className="font-bold text-xl">
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>
            {/**labels */}
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-sm"
                >
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
          {/**Footer */}
          <div className="">
            <hr />
            {expenseSummary && (
              <div className="mt-3 flex justify-between items-center px-7 mb-4">
                <div className="pt-2">
                  <p className="text-sm">
                    Average:{" "}
                    <span className="font-semibold">
                      ${expenseSummary.totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className="mr-2 text-green-500" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default ExpenseSummary