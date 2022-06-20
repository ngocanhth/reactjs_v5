import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },

  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handleChange = (e) => {
    // cach 1: e.persist()
    const { name, value } = e.target;
    
    // setValues la async function

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
     // [e.target.name]: e.target.value , setValues la async function tai thoi diem
     // chay ham setValues thi  e.target.name va e.target.value bi cancel nen co 2 cach: dung e.persist() 
     // de giu lai event hoac luu gia tri vao  bien truoc khi setValue:  const { name, value } = e.target;
    }));
  };

  const handleSubmit = () => {

    console.log("Gia tri truoc khi update price len filter: ",values);

    if (onChange) onChange(values);

    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>

      <Box className={classes.range}>
        <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
        <span>-</span>
        <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
      </Box>

      <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
