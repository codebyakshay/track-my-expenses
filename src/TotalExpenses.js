const TotalExpenses = ({ totalExpenses, totalSalary }) => {
  const remainingSalary = totalSalary - totalExpenses;

  const percentageSpent =
    totalSalary > 0 ? ((totalExpenses / totalSalary) * 100).toFixed(2) : 0;

  return totalExpenses === 0 || totalSalary === 0 ? (
    <h1>You need to add expenses in order to see the list of expenses</h1>
  ) : (
    <div className="totalDetails">
      <h2>You had a total of ${totalSalary}</h2>
      <h3>You spent ${totalExpenses.toFixed(2)}</h3>
      <h4> And You have spent {percentageSpent}% of your salary.</h4>
      <h4>Your Remaining Salary Is: ${remainingSalary.toFixed(2)}</h4>
    </div>
  );
};

export default TotalExpenses;
