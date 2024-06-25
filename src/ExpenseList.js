import React from "react";
import { ExpenseItem } from "./ExpeneseItem";

export const ExpenseList = ({
  list,
  totalExpenses,
  sortBy,
  handleSortBy,
  handleRemoveExpense,
  handleEditExpense,
  currencySymbol,
  selectedTheme,
}) => {
  return (
    <div
      className={
        selectedTheme === "dark" ? "show-list-light" : "show-list-dark"
      }
    >
      <ul>
        <h2>Daily expenditure</h2>
        {list.map((item) => (
          <ExpenseItem
            description={item.description}
            category={item.category}
            amount={item.amount}
            salary={item.salary}
            date={item.date}
            id={item.id}
            key={item.id} // Use a unique identifier for the key
            totalExpenses={totalExpenses}
            handleRemoveExpense={handleRemoveExpense}
            handleEditExpense={handleEditExpense}
            currencySymbol={currencySymbol}
          />
        ))}
      </ul>
      <div className="sortBy">
        <label>Sort By:</label>
        <select value={sortBy} onChange={handleSortBy}>
          <option value="most">Most Expense</option>
          <option value="least">Least Expense</option>

          <option value="dateAsc">Date (Oldest to Newest)</option>
          <option value="dateDesc">Date (Newest to Oldest)</option>
        </select>
      </div>
    </div>
  );
};
