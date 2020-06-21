import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const Button = ({ disabled, onClick, children }) => {
    const { button } = styles;
    return (
        <button className={button} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

Button.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.string.isRequired,
};

export default Button;
