export const AddExpenses = ({
  expense,
  setExpense,
  categories,
  salary,
  setSalary,
  handleOnChange,
  selectedCategories,
  SetSelectedCategories,
  handleOnSubmitExpenses,
  description,
  setDescription,
  date, // Receive the date state
  setDate, // Receive the setDate function
  selectedTheme,
}) => {
  return (
    <div
      className={
        selectedTheme === "dark" ? "add-expenses-light" : "add-expenses-dark"
      }
    >
      <form onSubmit={handleOnSubmitExpenses}>
        <label>Enter Your Earning of the day: 💲</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <label>
          Enter How much you spent on a particular item or category 💸
        </label>
        <input
          type="number"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />

        <label>Describe Your Expenses according to your Category 💸</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Available Categories</label>
        <select onChange={handleOnChange} value={selectedCategories}>
          {categories.map((item, index) => (
            <option key={index} value={index}>
              {item}
            </option>
          ))}
        </select>

        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button>Add expenses</button>
      </form>
    </div>
  );
};
