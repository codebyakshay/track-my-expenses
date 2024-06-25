import { useState } from "react";

export default function AddCategories({
  categories,
  setCatagories,
  selectedTheme,
}) {
  const [newCategory, setNewCategory] = useState("");

  function handleAddCategories(e) {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      setCatagories([...categories, newCategory]);
      setNewCategory("");
    }
  }

  return (
    <div
      className={
        selectedTheme === "dark" ? "addCategories-light" : "addCategories-dark"
      }
    >
      <form onSubmit={handleAddCategories}>
        <label>Enter Your Category Name</label>
        <input
          type="text"
          onChange={(e) => setNewCategory(e.target.value)}
          value={newCategory}
        />

        <label>Available Categories</label>
        <select>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}
