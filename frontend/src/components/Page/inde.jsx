import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

export const Page = ({ children }) => {
    const { page } = styles;

    return <main className={page}>{children}</main>;
};

Page.propTypes = {
    children: PropTypes.element,
};
