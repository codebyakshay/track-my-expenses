import React, { useState, useRef, useEffect } from "react";

export const ExpenseItem = ({
  description,
  salary,
  category,
  amount,
  date,
  id,
  handleRemoveExpense,
  handleEditExpense,
  currencySymbol,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableDescription, setEditableDescription] = useState(description);
  const [editableCategory, setEditableCategory] = useState(category);
  const [editableAmount, setEditableAmount] = useState(amount);
  const [editableDate, setEditableDate] = useState(date);
  const [editableSalary, setEditableSalary] = useState(salary);

  const [showEditButton, setShowEditButton] = useState(false);
  const holdTimeoutRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setShowEditButton(false);
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      clearHoldTimeout();
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const startHoldTimeout = () => {
    if (holdTimeoutRef.current) return;
    holdTimeoutRef.current = setTimeout(() => {
      setShowEditButton(true);
    }, 300); // Hold duration in milliseconds
  };

  const clearHoldTimeout = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
  };

  const handleDescriptionChange = (e) => setEditableDescription(e.target.value);
  const handleCategoryChange = (e) => setEditableCategory(e.target.value);
  const handleAmountChange = (e) => setEditableAmount(e.target.value);
  const handleDateChange = (e) => setEditableDate(e.target.value);
  const handleSalaryChange = (e) => setEditableSalary(e.target.value);

  const toggleEditMode = () => setIsEditing(!isEditing);

  const saveChanges = () => {
    handleEditExpense(id, {
      description: editableDescription,
      category: editableCategory,
      amount: editableAmount,
      date: editableDate,
      salary: editableSalary,
    });
    setIsEditing(false);
    setShowEditButton(false);
  };

  return (
    <li
      ref={itemRef}
      onMouseDown={startHoldTimeout}
      onMouseUp={clearHoldTimeout}
      onMouseLeave={clearHoldTimeout}
      onTouchStart={startHoldTimeout}
      onTouchEnd={clearHoldTimeout}
      onTouchMove={clearHoldTimeout}
      onDoubleClick={() => handleRemoveExpense(id)}
      className="expense-item"
    >
      {isEditing ? (
        <div className="isEditing-dark">
          <label>Description</label>
          <input
            type="text"
            value={editableDescription}
            onChange={handleDescriptionChange}
          />

          <label>Category</label>
          <input
            type="text"
            value={editableCategory}
            onChange={handleCategoryChange}
          />

          <label>salary {currencySymbol}</label>
          <input
            type="number"
            value={editableSalary}
            onChange={handleSalaryChange}
          />

          <label>Amount {currencySymbol}</label>
          <input
            type="number"
            value={editableAmount}
            onChange={handleAmountChange}
          />

          <label>Date</label>
          <input type="date" value={editableDate} onChange={handleDateChange} />

          <button onClick={saveChanges}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{description}</h3>
          <h3>
            salary {currencySymbol}
            {salary}
          </h3>

          <p>
            <span>Category: </span>
            <strong>{category}</strong>
          </p>
          <p>
            {currencySymbol}
            {amount}
          </p>
          <p>
            <strong>{formatDate(date)}</strong>
          </p>
        </div>
      )}
      {showEditButton && !isEditing && (
        <button onClick={toggleEditMode} className="edit-button">
          Edit
        </button>
      )}
    </li>
  );
};
