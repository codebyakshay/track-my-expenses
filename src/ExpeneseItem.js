export const ExpenseItem = ({
  description,
  category,
  amount,
  date,
  id,
  handleRemoveExpense,
}) => {
  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <li onDoubleClick={() => handleRemoveExpense(id)}>
        <h3>{description}</h3>
        <p>
          <span>Category: </span>
          <strong>{category}</strong>
        </p>
        <p>${amount}</p>
        <p>
          <strong>{formatDate(date)}</strong>
        </p>
      </li>
    </>
  );
};
