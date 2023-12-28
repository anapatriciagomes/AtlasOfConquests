import { useState } from 'react';
import mGlass from '../assets/magnifying glass.jpg';

function SearchBar({ searchedCountries }) {
  const [search, setSearch] = useState('');

  const handleSearch = e => {
    setSearch(e.target.value);
    searchedCountries(e.target.value);
  };

  return (
    <div className='relative bg-[#ff9800] p-3'>
      <label htmlFor='search' className='text-xl'>
        Search by country name:
      </label>
      <div className='relative flex items-center'>
        <input
          type='text'
          name='search'
          id='search'
          value={search}
          onChange={handleSearch}
          className='h-10 w-full pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500'
          placeholder='Country Name'
        />
        <span className='absolute left-3 top-2'>
          <img src={mGlass} alt='Search' className='h-5 w-5 text-gray-500' />
        </span>
      </div>
    </div>
  );
}

export default SearchBar;
