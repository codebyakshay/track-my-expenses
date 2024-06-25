import { useState } from "react";

const useToggle = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showAddExpenses, setShowAddExpenses] = useState(false);
  const [showTotalExpense, setShowTotalExpense] = useState(false);

  const handleShowTotal = () => {
    setShowAddExpenses(false);
    setVisible(false);
    setShowCategories(false);
    setShowTotalExpense((prev) => !prev);
  };

  const handleAddExpenses = () => {
    setShowAddExpenses((prev) => !prev);
    setVisible(false);
    setShowCategories(false);
    setShowTotalExpense(false);
  };

  const onClickHandler = () => {
    setVisible((prev) => !prev);
    setShowCategories(false);
    setShowAddExpenses(false);
    setShowTotalExpense(false);
  };

  const handleShowCategories = () => {
    setShowCategories((prev) => !prev);
    setVisible(false);
    setShowAddExpenses(false);
    setShowTotalExpense(false);
  };

  return {
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
  };
};

export default useToggle;
