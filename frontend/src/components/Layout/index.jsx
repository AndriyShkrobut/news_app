import React from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'components/AppBar';
import styles from './styles.module.css';
import { Page } from 'components/Page/inde';

export const Layout = ({ children }) => {
    const { layout } = styles;
    return (
        <>
            <AppBar />
            <div className={layout}>
                <Page>{children}</Page>
            </div>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.element,
};
