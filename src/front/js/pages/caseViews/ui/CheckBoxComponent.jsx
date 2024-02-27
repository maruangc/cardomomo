import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";

const initialValues = {
  is_active: false,
  started: false,
  closed: false,
  delivered: false,
};

export default function ChekboxComponent() {
  const [ingredients, setIngredients] = useState([]);
  const [checkValues, setCheckValues] = useState(initialValues);

  const onCheck = (e) => {
    let _ingredients = [...ingredients];
    console.log(e);
    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setIngredients(_ingredients);
  };

  return (
    <div className="card flex flex-wrap justify-content-center gap-3">
      <div className="flex align-items-center">
        <Checkbox
          // inputId="ingredient1"
          name="pizza"
          value="Cheese"
          onChange={onCheck}
          checked={ingredients.includes("Cheese")}
        />
        <label htmlFor="ingredient1" className="ml-2">
          Cheese
        </label>
      </div>
      <div className="flex align-items-center">
        <Checkbox
          // inputId="ingredient2"
          name="pizza"
          value="Mushroom"
          onChange={onCheck}
          checked={ingredients.includes("Mushroom")}
        />
        <label htmlFor="ingredient2" className="ml-2">
          Mushroom
        </label>
      </div>
      <div className="flex align-items-center">
        <Checkbox
          // inputId="ingredient3"
          name="pizza"
          value="Pepper"
          onChange={onCheck}
          checked={ingredients.includes("Pepper")}
        />
        <label htmlFor="ingredient3" className="ml-2">
          Pepper
        </label>
      </div>
      <div className="flex align-items-center">
        <Checkbox
          // inputId="ingredient4"
          name="pizza"
          value="Onion"
          onChange={onCheck}
          checked={ingredients.includes("Onion")}
        />
        <label htmlFor="ingredient4" className="ml-2">
          Onion
        </label>
      </div>
    </div>
  );
}
