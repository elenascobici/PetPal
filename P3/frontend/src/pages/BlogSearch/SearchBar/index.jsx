import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
  const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
  };

  return (
      <input
          type="text"
          className="search-bar"
          placeholder="Search for blogs..."
          onChange={handleSearchChange}
      />
  );
};

export default SearchBar;
