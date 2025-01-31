import React from 'react';

const Input = ({ value, onChange, placeholder, className, type = 'text' }) => (
  <input 
    className={`input ${className}`} 
    type={type} 
    value={value} 
    onChange={onChange} 
    placeholder={placeholder} 
  />
);

export default Input;
