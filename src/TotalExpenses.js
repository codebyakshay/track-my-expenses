const TotalExpenses = ({
  totalExpenses,
  totalSalary,
  currencySymbol,
  selectedTheme,
}) => {
  // Ensure totalExpenses and totalSalary are numbers
  const totalExpensesNumber = Number(totalExpenses) || 0;
  const totalSalaryNumber = Number(totalSalary) || 0;

  const remainingSalary = totalSalaryNumber - totalExpensesNumber;
  const percentageSpent =
    totalSalaryNumber > 0
      ? ((totalExpensesNumber / totalSalaryNumber) * 100).toFixed(2)
      : 0;

  return (
    <div
      className={
        selectedTheme === "dark" ? "totalDetails-light" : "totalDetails-dark"
      }
    >
      {totalExpensesNumber > 0 || totalSalaryNumber > 0 ? (
        <>
          <h2>
            You had a total of {currencySymbol}
            {totalSalaryNumber.toFixed(2)}
          </h2>
          <h3>
            You spent {currencySymbol}
            {totalExpensesNumber.toFixed(2)}
          </h3>
          <h4>And You have spent {percentageSpent}% of your salary.</h4>
          <h4
            style={remainingSalary > 0 ? { color: "green" } : { color: "red" }}
          >
            Your Remaining Salary Is: {currencySymbol}
            {remainingSalary.toFixed(2)}
          </h4>
        </>
      ) : (
        <h1 style={{ color: "red" }}>
          You need to add expenses in order to see the list of expenses.
        </h1>
      )}
    </div>
  );
};

export default TotalExpenses;
