import { useState } from "react";
import AddCatagories from "./AddCatagories";
import { MyExpenses } from "./MyExpenseArr";
import { ExpenseList } from "./ExpenseList";
import { AddExpenses } from "./AddExpenses";
import { Button } from "./Button";
import TotalExpenses from "./TotalExpenses";
import useToggle from "./useToggle";

// Function to save expenses to Local Storage
const saveExpensesToLocalStorage = (expenses) => {
  localStorage.setItem("myExpenses", JSON.stringify(expenses));
};

const loadExpensesFromLocalStorage = () => {
  const savedExpenses = localStorage.getItem("myExpenses");
  if (savedExpenses) {
    return JSON.parse(savedExpenses);
  }
  return MyExpenses; // Use MyExpenses as the default
};

export default function App() {
  // Form States
  const [myExpenses, setMyExpenses] = useState(loadExpensesFromLocalStorage());
  const [expense, setExpense] = useState(0); // Adding expenses
  const [salary, setSalary] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState("0");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(""); // New date state
  const [sortBy, setSortBy] = useState("most");
  const [categories, setCatagories] = useState([
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Rent",
    "Healthcare",
    "Groceries",
    "Insurance",
    "Education",
    "Savings",
    "Debt Payments",
    "Travel",
    "Clothing",
    "Personal Care",
    "Gifts/Donations",
  ]);

  const {
    showCategories,
    visible,
    showAddExpenses,
    showTotalExpense,
    handleShowTotal,
    handleAddExpenses,
    onClickHandler,
    handleShowCategories,
    setShowAddExpenses,
    setShowTotalExpense,
    setVisible,
  } = useToggle();

  const handleOnChange = (e) => {
    if (!e.target.value) return;
    const selectedIndex = e.target.value;
    setSelectedCategories(selectedIndex);
  };

  const handleOnSubmitExpenses = (e) => {
    e.preventDefault();

    // Guard clauses to check required fields
    if (
      expense <= 0 ||
      salary <= 0 ||
      description.trim() === "" ||
      date.trim() === ""
    )
      return;

    let id = crypto.randomUUID();
    const newEntry = {
      id,
      category: categories[selectedCategories],
      amount: parseFloat(expense), // Ensure expense is a number
      salary: parseFloat(salary), // Ensure salary is a number
      description,
      date,
    };

    const updatedExpenses = [...myExpenses, newEntry];
    setMyExpenses(updatedExpenses);
    saveExpensesToLocalStorage(updatedExpenses); // Save to local storage

    setExpense(0);
    setSalary(0);
    setDescription("");
    setSelectedCategories("0");
    setShowAddExpenses(false);
    setShowTotalExpense(true);
    setVisible(true);
  };

  const handleSortBy = (e) => {
    const sortByValue = e.target.value;
    setSortBy(sortByValue);
    let sortedExpenses = [...myExpenses];
    switch (sortByValue) {
      case "least":
        sortedExpenses.sort((a, b) => a.amount - b.amount);
        break;
      case "most":
        sortedExpenses.sort((a, b) => b.amount - a.amount);
        break;
      case "dateAsc":
        sortedExpenses.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "dateDesc":
        sortedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        break;
    }
    setMyExpenses(sortedExpenses);
    saveExpensesToLocalStorage(sortedExpenses); // Save to local storage
  };

  const handleRemoveExpense = (id) => {
    const updatedExpenses = myExpenses.filter((expense) => expense.id !== id);
    setMyExpenses(updatedExpenses);
    saveExpensesToLocalStorage(updatedExpenses); // Save to local storage
  };

  const totalExpenses = myExpenses.reduce((acc, item) => acc + item.amount, 0);
  const totalSalary = myExpenses.reduce((acc, item) => acc + item.salary, 0);

  return (
    <div>
      <Button onClickHandler={handleShowCategories}>Categories</Button>
      <Button onClickHandler={handleAddExpenses}>Expenses</Button>
      <Button onClickHandler={onClickHandler}>Tables</Button>
      <Button onClickHandler={handleShowTotal}>Total</Button>

      {visible && (
        <ExpenseList
          list={myExpenses}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleSortBy={handleSortBy}
          handleRemoveExpense={handleRemoveExpense}
        />
      )}

      {showAddExpenses && (
        <AddExpenses
          expense={expense}
          setExpense={setExpense}
          categories={categories}
          salary={salary}
          setSalary={setSalary}
          handleOnChange={handleOnChange}
          selectedCategories={selectedCategories}
          SetSelectedCategories={setSelectedCategories}
          handleOnSubmitExpenses={handleOnSubmitExpenses}
          description={description}
          setDescription={setDescription}
          date={date} // Pass the date state
          setDate={setDate} // Pass the setDate function
        />
      )}

      {showCategories && (
        <AddCatagories categories={categories} setCatagories={setCatagories} />
      )}

      {showTotalExpense && (
        <TotalExpenses
          totalExpenses={totalExpenses}
          totalSalary={totalSalary}
        />
      )}
    </div>
  );
}
