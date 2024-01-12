import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ searchedCountries, darkMode }) {
  const [search, setSearch] = useState();

  const handleSearch = e => {
    setSearch(e.target.value);
    searchedCountries(e.target.value);
  };

  return (
    <div className={`text-center`}>
      <FormControl sx={{ marginTop: 4, marginBottom: 4, width: '95%' }}>
        <InputLabel
          htmlFor='outlined-adornment-amount'
          type='text'
          name='search'
          id='search'
          sx={{ color: darkMode ? 'white' : 'inherit' }}
        >
          Search Country
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-amount'
          startAdornment={
            <InputAdornment
              position='start'
              sx={{ color: darkMode ? 'white' : 'inherit' }}
            >
              <SearchIcon />
            </InputAdornment>
          }
          label='Search Country'
          value={search}
          onChange={handleSearch}
          placeholder='Country Name'
          sx={{
            color: darkMode ? 'white' : 'inherit',
          }}
        />
      </FormControl>
    </div>
  );
}

export default SearchBar;
