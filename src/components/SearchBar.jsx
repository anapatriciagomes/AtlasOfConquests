import { useState } from 'react';

function SearchBar({ searchedCountries }) {
  const [search, setSearch] = useState('');

  const handleSearch = e => {
    setSearch(e.target.value);
    searchedCountries(e.target.value);
  };

  return (
    <div>
      <label htmlFor='search'>Search</label>
      <input
        type='text'
        name='search'
        id='search'
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
