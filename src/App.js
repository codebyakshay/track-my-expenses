import { useState } from "react";
import { MyExpenses } from "./MyExpenseArr";
import useToggle from "./useToggle";
import { v4 as uuidv4 } from "uuid";
import MainComponent from "./MainComponent";
import "./style/addCategories.css";
import "./style/onBoarding.css";
import "./style/AddExpenses.css";
import "./style/show-list.css";
import "./style/total-expenses.css";

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
  const [expense, setExpense] = useState(); // Adding expenses
  const [salary, setSalary] = useState();
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

  //OnBoarding States //
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [selectedTrackerMode, setSelectedTrackerMode] = useState("daily");
  const [toggleOnBoard, setToggleOnBoard] = useState(true);

  //toggle main
  const [showMainComponent, setShowMainComponent] = useState(false);

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

  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    INR: "₹",
  };

  const currencySymbol = currencySymbols[selectedCurrency];

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

    let id = uuidv4(); // Use uuidv4() to generate a UUID
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

  const handleEditExpense = (id, updatedExpense) => {
    const updatedExpenses = myExpenses.map((expense) =>
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    );
    setMyExpenses(updatedExpenses);
    saveExpensesToLocalStorage(updatedExpenses); // Save to local storage
  };
  const totalExpenses = myExpenses.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );
  const totalSalary = myExpenses.reduce(
    (acc, item) => acc + Number(item.salary),
    0
  );

  return (
    <MainComponent
      toggleOnBoard={toggleOnBoard}
      selectedCurrency={selectedCurrency}
      setSelectedCurrency={setSelectedCurrency}
      selectedTheme={selectedTheme}
      setSelectedTheme={setSelectedTheme}
      selectedTrackerMode={selectedTrackerMode}
      setSelectedTrackerMode={setSelectedTrackerMode}
      setShowMainComponent={setShowMainComponent}
      setToggleOnBoard={setToggleOnBoard}
      showMainComponent={showMainComponent}
      handleShowCategories={handleShowCategories}
      handleAddExpenses={handleAddExpenses}
      onClickHandler={onClickHandler}
      handleShowTotal={handleShowTotal}
      visible={visible}
      salary={salary}
      myExpenses={myExpenses}
      sortBy={sortBy}
      setSortBy={setSortBy}
      handleSortBy={handleSortBy}
      handleRemoveExpense={handleRemoveExpense}
      handleEditExpense={handleEditExpense}
      currencySymbol={currencySymbol}
      showAddExpenses={showAddExpenses}
      expense={expense}
      setExpense={setExpense}
      setSalary={setSalary}
      handleOnChange={handleOnChange}
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      handleOnSubmitExpenses={handleOnSubmitExpenses}
      description={description}
      setDescription={setDescription}
      date={date}
      setDate={setDate}
      showCategories={showCategories}
      categories={categories}
      setCatagories={setCatagories}
      showTotalExpense={showTotalExpense}
      totalExpenses={totalExpenses}
      totalSalary={totalSalary}
    />
  );
}
