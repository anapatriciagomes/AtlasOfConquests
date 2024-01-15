import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CircularProgress from '@mui/material/CircularProgress';
import PopulationConverter from '../components/PopulationConverter';
import SearchBar from '../components/SearchBar';
import AddRemoveVisited from '../components/AddRemoveVisited';
import AddRemoveWishlist from '../components/AddRemoveWishlist';
import CountryNameConverter from '../components/CountryNameConverter';

function CountriesList({
  loggedIn,
  loggedUserDetails,
  setLoggedUserDetails,
  userId,
  darkMode,
}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [fetching, setFetching] = useState(true);
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => ascendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    const valueA = getComparisonValue(a, orderBy);
    const valueB = getComparisonValue(b, orderBy);

    if (valueB < valueA) return -1;
    if (valueB > valueA) return 1;
    return 0;
  };

  const ascendingComparator = (a, b, orderBy) => {
    const valueA = getComparisonValue(a, orderBy);
    const valueB = getComparisonValue(b, orderBy);

    if (valueA == null) return -1;
    if (valueB == null) return 1;

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    return 0;
  };

  const getComparisonValue = (item, orderBy) => {
    if (orderBy === 'capital' && Array.isArray(item[orderBy])) {
      return item[orderBy];
    }
    if (orderBy === 'continents' && Array.isArray(item[orderBy])) {
      return item[orderBy];
    }

    return typeof item[orderBy] === 'object'
      ? item[orderBy].common
      : item[orderBy];
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

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
    {
      id: 'continents',
      numeric: false,
      disablePadding: false,
      label: 'Continent',
    },
    { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
  ];

  const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };

    return (
      <TableHead className="w-[95%] mx-auto">
        <TableRow>
          {loggedIn
            ? headCells.map(headCell => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'center' : 'center'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  className="text-center"
                >
                  {headCell.id !== 'actions' ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box
                          component="span"
                          sx={{
                            visuallyHidden,
                          }}
                        >
                          {order === 'desc' ? '' : ''}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))
            : headCells
                .filter(headCell => headCell.label !== 'Actions')
                .map(headCell => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'center' : 'center'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    className="text-center"
                  >
                    {headCell.id !== 'actions' ? (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <Box
                            component="span"
                            sx={{
                              visuallyHidden,
                            }}
                          >
                            {order === 'desc' ? '' : ''}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
        </TableRow>
      </TableHead>
    );
  };

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

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

  return (
    <div className="mt-[120px]">
      <h1 className="text-xl text-center my-[30px]">Countries List</h1>
      {fetching && (
        <div className="mt-[80px] text-center">
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
        <Box sx={{ width: '95%' }} className="mx-auto">
          <SearchBar searchedCountries={searchedCountries} />
          <Paper
            sx={{
              width: '95%',
              mb: 2,
            }}
            className="mx-auto"
          >
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
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
                    return (
                      isLinkClickable && (
                        <TableRow
                          hover
                          key={index}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                          >
                            <Link
                              to={`/country/${row.cca2.toLowerCase()}/${CountryNameConverter(
                                {
                                  countryCode: row.cca2,
                                }
                              )}`}
                              className={`${
                                darkMode ? 'text-[#64b5f6]' : 'text-[#2196f3]'
                              } hover:text-[#ff9800]`}
                            >
                              {row.name.common}
                            </Link>
                          </TableCell>
                          <TableCell align="center">
                            {row.capital.length > 1
                              ? row.capital.toString().replaceAll(',', ', ')
                              : row.capital}
                          </TableCell>
                          <TableCell align="center">
                            {<PopulationConverter number={row.population} />}
                          </TableCell>
                          <TableCell align="center">
                            {row.area} km<sup>2</sup>
                          </TableCell>
                          <TableCell align="center">
                            {row.continents.join(' and ')}
                          </TableCell>
                          {loggedIn ? (
                            <TableCell align="center">
                              <div className="flex flex-col justify-between h-[122px]">
                                <AddRemoveVisited
                                  loggedIn={loggedIn}
                                  loggedUserDetails={loggedUserDetails}
                                  setLoggedUserDetails={setLoggedUserDetails}
                                  loggedUserId={userId}
                                  countryName={row.name.common}
                                />
                                <AddRemoveWishlist
                                  loggedIn={loggedIn}
                                  loggedUserDetails={loggedUserDetails}
                                  setLoggedUserDetails={setLoggedUserDetails}
                                  loggedUserId={userId}
                                  countryName={row.name.common}
                                />
                              </div>
                            </TableCell>
                          ) : (
                            ''
                          )}
                        </TableRow>
                      )
                    );
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
              rowsPerPageOptions={[10, 20, 50, 100, 202]}
              component="div"
              count={202}
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

export default CountriesList;
