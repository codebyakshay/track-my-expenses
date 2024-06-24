import { useState } from "react";

const AddCategories = ({ categories, setCatagories }) => {
  const [newCategory, setNewCategory] = useState("");

  function handleAddCategories(e) {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      setCatagories([...categories, newCategory]);
      setNewCategory("");
    }
  }

  return (
    <div className="addCategories">
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
};

export default AddCategories;
