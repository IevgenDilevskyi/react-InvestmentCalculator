import React, { useState } from "react";

const UserInput = ({ name, label, onInputChange, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);

  function handleInputChange(event) {
    setValue(event.target.value);
    onInputChange(name, event.target.value);
  }

  return (
    <section>
      <label>{label}</label>
      <input
        type="number"
        value={value}
        required
        onChange={handleInputChange}
      />
    </section>
  );
};

export default UserInput;
