import React from "react";

function DropDownList({
  dropdownName,
  options,
  selectedOption,
  setSelectedOption,
  onOptionChange,
}) {
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <select value={selectedOption} onChange={handleOptionChange}>
      <option value="" disabled>
        {dropdownName}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default DropDownList;
