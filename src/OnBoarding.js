// onboarding.js

const Onboarding = ({
  selectedCurrency,
  setSelectedCurrency,
  selectedTheme,
  setSelectedTheme,
  selectedTrackerMode,
  setSelectedTrackerMode,
  setToggleOnBoard,
  setShowMainComponent,
}) => {
  const handleOnClick = () => {
    if (!selectedCurrency || !selectedTheme || !selectedTrackerMode) {
      alert("Please make sure all preferences are selected before saving.");
      return;
    }
    setToggleOnBoard(false);
    setShowMainComponent(true);
  };

  return (
    <div className="onboarding-wrapper">
      <div
        className={
          selectedTheme === "dark"
            ? "onboarding-container-dark"
            : "onboarding-container-light"
        }
      >
        <h1>Welcome! Please set up your preferences</h1>

        <label htmlFor="currency">Select Currency:</label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          <option value="">--Select--</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
          <option value="GBP">£ GBP</option>
          <option value="JPY">¥ JPY</option>
          <option value="INR">₹ INR</option>
        </select>

        <label htmlFor="theme">Select Theme:</label>
        <select
          id="theme"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          <option value="">--Select--</option>
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>

        <label htmlFor="trackerMode">Select Tracker Mode:</label>
        <select
          id="trackerMode"
          value={selectedTrackerMode}
          onChange={(e) => setSelectedTrackerMode(e.target.value)}
        >
          <option value="">--Select--</option>
          <option value="daily">Daily Tracker</option>
          <option value="monthly">Monthly Tracker</option>
        </select>

        <button onClick={handleOnClick}>Save Preferences</button>
      </div>
    </div>
  );
};

export default Onboarding;
