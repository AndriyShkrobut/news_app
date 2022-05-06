import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

const Button = ({ disabled, onClick, children, variant, ...rest }) => {
    const { button, button__primary, button__secondary } = styles;
    return (
        <button
            className={`${button} ${variant === 'secondary' ? button__secondary : button__primary}`}
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    variant: PropTypes.string,
};

export default Button;
