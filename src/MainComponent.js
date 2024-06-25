import { Button } from "./Button";
import Onboarding from "./OnBoarding";
import { ExpenseList } from "./ExpenseList";
import { AddExpenses } from "./AddExpenses";
import AddCatagories from "./AddCatagories";
import TotalExpenses from "./TotalExpenses";

export default function MainComponent({
  toggleOnBoard,
  selectedCurrency,
  setSelectedCurrency,
  selectedTheme,
  setSelectedTheme,
  selectedTrackerMode,
  setSelectedTrackerMode,
  setShowMainComponent,
  setToggleOnBoard,
  showMainComponent,
  handleShowCategories,
  handleAddExpenses,
  onClickHandler,
  handleShowTotal,
  visible,
  salary,
  myExpenses,
  sortBy,
  setSortBy,
  handleSortBy,
  handleRemoveExpense,
  handleEditExpense,
  currencySymbol,
  showAddExpenses,
  expense,
  setExpense,
  setSalary,
  handleOnChange,
  selectedCategories,
  setSelectedCategories,
  handleOnSubmitExpenses,
  description,
  setDescription,
  date,
  setDate,
  showCategories,
  categories,
  setCatagories,
  showTotalExpense,
  totalExpenses,
  totalSalary,
}) {
  return (
    <main
      className={
        selectedTheme === "dark" ? "main-section-dark" : "main-section-light"
      }
    >
      <div className="main-wrapper">
        {toggleOnBoard && (
          <Onboarding
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            selectedTrackerMode={selectedTrackerMode}
            setSelectedTrackerMode={setSelectedTrackerMode}
            setShowMainComponent={setShowMainComponent}
            setToggleOnBoard={setToggleOnBoard}
          />
        )}

        {showMainComponent && (
          <>
            <div className="main-btn">
              <Button onClickHandler={handleShowCategories}>Categories</Button>
              <Button onClickHandler={handleAddExpenses}>Expenses</Button>
              <Button onClickHandler={onClickHandler}>Tables</Button>
              <Button onClickHandler={handleShowTotal}>Total</Button>
            </div>

            {visible && (
              <ExpenseList
                salary={salary}
                list={myExpenses}
                sortBy={sortBy}
                setSortBy={setSortBy}
                handleSortBy={handleSortBy}
                handleRemoveExpense={handleRemoveExpense}
                handleEditExpense={handleEditExpense}
                currencySymbol={currencySymbol}
                selectedTheme={selectedTheme}
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
                selectedTheme={selectedTheme}
              />
            )}

            {showCategories && (
              <AddCatagories
                categories={categories}
                setCatagories={setCatagories}
                selectedTheme={selectedTheme}
              />
            )}

            {showTotalExpense && (
              <TotalExpenses
                totalExpenses={totalExpenses}
                totalSalary={totalSalary}
                currencySymbol={currencySymbol}
                selectedTheme={selectedTheme}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
