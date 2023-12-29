import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PopulationConverter from '../components/PopulationConverter';
import SearchBar from '../components/SearchBar';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import CountryNameConverter from '../components/CountryNameConverter';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';
import { deepPurple } from '@mui/material/colors';

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => ascendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  const valueA = getComparisonValue(a, orderBy);
  const valueB = getComparisonValue(b, orderBy);

  console.log('Comparing:', valueA, valueB);

  if (valueB < valueA) return -1;
  if (valueB > valueA) return 1;
  return 0;
}

function ascendingComparator(a, b, orderBy) {
  const valueA = getComparisonValue(a, orderBy);
  const valueB = getComparisonValue(b, orderBy);

  if (valueA == null) return -1;
  if (valueB == null) return 1;

  console.log('Comparing:', valueA, valueB);

  if (valueA < valueB) return -1;
  if (valueA > valueB) return 1;
  return 0;
}

function getComparisonValue(item, orderBy) {
  if (orderBy === 'capital' && Array.isArray(item[orderBy])) {
    return item[orderBy][0];
  }

  return typeof item[orderBy] === 'object'
    ? item[orderBy].common
    : item[orderBy];
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Country' },
  { id: 'capital', numeric: false, disablePadding: false, label: 'Capital' },
  {
    id: 'population',
    numeric: true,
    disablePadding: false,
    label: 'Population',
  },
  { id: 'area', numeric: true, disablePadding: false, label: 'Area' },
  { id: 'region', numeric: false, disablePadding: false, label: 'Continent' },
  { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
    console.log('Sorting by:', property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'></TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Countries List
        </Typography>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [fetching, setFetching] = useState(true);
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data);
        setShowCountries(response.data);
        setFetching(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setFetching(false);
      });
  }, []);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = countries.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, showCountries.length - page * rowsPerPage);

  const visibleRows = React.useMemo(() => {
    const filteredRows = showCountries.filter(row => {
      return (
        CountryNameConverter({ countryCode: row.cca2 }) !== 'Country not found'
      );
    });

    const sortedRows = stableSort(filteredRows, getComparator(order, orderBy));

    return sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, showCountries]);

  const searchedCountries = query => {
    const filteredCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    });
    setShowCountries(filteredCountries);
    setPage(0);
  };

  const addToWishlist = country => {
    // Implement logic to add to wishlist
    console.log(`Added ${country.name.common} to Wishlist`);
  };

  const addToVisited = country => {
    // Implement logic to add to visited
    console.log(`Added ${country.name.common} to Visited`);
  };

  const GreenButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[300],
    width: '80px',
    height: '40px',
    marginRight: '5px',

    '&:hover': {
      backgroundColor: lightGreen[500],
      width: '80px',
      height: '40px',
    },
  }));

  const PurpleButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[300],
    width: '80px',
    height: '40px',

    '&:hover': {
      backgroundColor: deepPurple[500],
      width: '80px',
      height: '40px',
    },
  }));

  return (
    <div className='mt-[72px]'>
      {fetching && (
        <div className='mt-[80px] text-center'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '300px',
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      )}

      {countries && (
        <Box sx={{ width: '100%' }}>
          <SearchBar searchedCountries={searchedCountries} />
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby='tableTitle'
                size='medium'
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={showCountries.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    const isLinkClickable =
                      CountryNameConverter({ countryCode: row.cca2 }) !==
                      'Country not found';

                    return isLinkClickable ? (
                      <TableRow
                        hover
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding='checkbox'></TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          padding='none'
                        >
                          <Link
                            to={`/country/${row.cca2.toLowerCase()}/${CountryNameConverter(
                              {
                                countryCode: row.cca2,
                              }
                            )}`}
                            className='text-blue-500 hover:text-[#ff9800]'
                          >
                            {row.name.common}
                          </Link>
                        </TableCell>
                        <TableCell align='center'>{row.capital}</TableCell>
                        <TableCell align='center'>
                          {<PopulationConverter number={row.population} />}
                        </TableCell>
                        <TableCell align='center'>
                          {row.area} km<sup>2</sup>
                        </TableCell>
                        <TableCell align='center'>{row.region}</TableCell>
                        <TableCell align='center'>
                          <GreenButton onClick={() => addToVisited(row)}>
                            Add to Visited
                          </GreenButton>
                          <PurpleButton onClick={() => addToWishlist(row)}>
                            Add to Wishlist
                          </PurpleButton>
                        </TableCell>
                      </TableRow>
                    ) : null;
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 20, 250]}
              component='div'
              count={showCountries.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </div>
  );
}
