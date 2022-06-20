import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from 'features/Auth/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

Register.propTypes = {
    
};

function Register(props) {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        
        try {
            // auto set username = email
            values.username = values.email;
            const action = register(values);
            const resultAction = await dispatch(action);
            const user =  unwrapResult(resultAction);
            console.log("new user:",  user);
        } catch (error) {
            console.log('Failed to register:', error);
        }
    }

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
      </div>
    );
}

export default Register;