import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

ClearFilters.propTypes = {
    onClick: PropTypes.func,
};



function ClearFilters(onClick = null) {
    const history = useHistory();
    const handleClearFilters = () => {
        history.replace({
          search: '',
        });
      };
    
    return (
        <div>
            <Button variant="contained" color="primary" size="small" onClick={handleClearFilters}>
                Clear Filters
            </Button>
        </div>
    );
}

export default ClearFilters;