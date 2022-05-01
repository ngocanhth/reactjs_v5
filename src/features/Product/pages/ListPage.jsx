import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import ClearFilters from '../components/ClearFilters';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '30px',
    paddingBottom: '20px',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();

  // location la 1 object khi url thay doi thi object location cung thay doi do do neu dat trong filter se bij thay doi lap vo han

  const location = useLocation();

  // const queryParams = queryString.parse(location.search);

  let queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);


  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  });

    const [loading, setLoading] = useState(true);
  
  // const [filters, setfilters] = useState({
  //     _limit: 12,
  //     _page: 1,
  //     _sort: 'salePrice:ASC',
  // });


  // const [filters, setfilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 12,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // }));


  // useEffect(() => {
  //   try {
  //     history.push( {
  //       pathname: history.location.pathname,
  //       search: queryString.stringify(filters),
  //     }
  //     )
  //   } catch (error) {
  //     console.log('Failed to fetch product list: ', error);
  //   }

  // }, [history, filters]);

  // object history khong doi ma chi thay doi value ben trong no do do khong bi rerender lai chi co filters thay doi

  useEffect(() => {
    (async () => {
      try {

        const response = await productApi.getAll({_page: 1, _limit: 12});
        // console.log({response});

        // console.log('Khi load trang lan dau  và change params filter se la: ',filters);

        const { data, pagination } = await productApi.getAll(queryParams);

        console.log('Sau khi truyen new param filter se la: ', {pagination});

        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

    const handlePageChange = (e, page) => {
        const filters = {
            ...queryParams,
            _page: page,
        };

        // setfilters((prevFilters => ({
        //     ...prevFilters,
        //     _page: page,
        // })));

        history.push({
        pathname: history.location.pathname,
        search: queryString.stringify(filters),
        });
    };

    const handleSortChange = (newSortValue) => {
        const filters = {
        ...queryParams,
        _sort: newSortValue,
        };
        
        // setfilters((prevFilters => ({
        //     ...prevFilters,
        //     _sort: newSortValue,
        // })));

        // pathname la phần sau base url:  /products

        console.log('pathname: ', history.location.pathname);
        //queryString bien 1 opject thanh dang string: search _limit=12&_page=1&_sort=salePrice%3AASC
 
        console.log('filters: ',filters);

        // search là phần sau dấu ?

        console.log('search: ', queryString.stringify(filters));

        history.push({
        pathname: history.location.pathname,
        search: queryString.stringify(filters),
        });
    };

    const handleFiltersChange = (newFilters) => {
          const filters = {
          ...queryParams,
          ...newFilters,
          };

          // setfilters((prevFilters => ({
          //     ...prevFilters,
          //     ...newFilters,
          // })));

        history.push({
          pathname: history.location.pathname,
          search: queryString.stringify(filters),
        });
    };

    const handleClearFilters = () => {
      // history.replace({
      //   search: '',
      // });
    };

  const setNewFilters = (newFilters) => {

    console.log('New Filter sau khi pass len component cha: ', newFilters);

    // setfilters(newFilters);

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
   };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
                <ProductFilters filters={queryParams} onChange={handleFiltersChange} />

                {/* {console.log('Fillter ban dau tu thang cha truyen xuong: ', filters)} */}

                {/* <ProductFilters filters={filters} onChange={handleFiltersChange} /> */}

                 <ClearFilters onClick={handleClearFilters} /> 

                {/* <div onClick={handleClearFilters}>
                  Clear filters
                </div> */}
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
            {/* <ProductSort currentSort={filters._sort} onChange={handleSortChange} /> */}

              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />

                {/* <FilterViewer filters={filters} onChange={setNewFilters} />  */}

              {loading ? <ProductSkeletonList length={12} /> : <ProductList data={productList} />}
    
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)} // tong so trang = tong so item / so item tren 1 trang ket qua lam tron len
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
