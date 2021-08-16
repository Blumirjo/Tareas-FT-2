import React, { useState } from "react";

export default function SearchBar({onSearch}) {
  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    console.log(e)
    setCity(e.target.value)
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(city);
    }}>
      <input
        type="text"
        placeholder="Ciudad..."
        onChange={handleInputChange}
      />
      <input type="submit" value="Agregar" />
    </form>
  );
}
