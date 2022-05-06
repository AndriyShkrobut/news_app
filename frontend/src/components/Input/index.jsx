import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const Input = ({ value, type, name, labelText, onChange }) => {
    const { input__block, label, input } = styles;

    return (
        <div className={input__block}>
            <input className={input} type={type} name={name} value={value} onChange={onChange} />
            <label className={label}>{labelText}</label>
        </div>
    );
};

Input.propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password', 'email', 'button', 'search']),
    name: PropTypes.string,
    labelText: PropTypes.string,
    onChange: PropTypes.func,
};
