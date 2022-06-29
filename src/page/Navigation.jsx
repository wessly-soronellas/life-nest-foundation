import React, {Fragment} from 'react';
import { Outlet, Link } from 'react-router-dom';
import {usePageInfo} from '@ellucian/experience-extension/extension-utilities';

const Navigation = () => {

    const {basePath} = usePageInfo();

    return (
        <Fragment>
            <div id='navigation-container'>
                <Link to={`/`}>
                    Home
                </Link>
                <Link to={`/meal`}>
                    Meal Plan
                </Link>
                <Link to={`/password`}>
                    Password Expiration
                </Link>
                <Link to={`/account`}>
                    Account Balance
                </Link>
                <Link to={`/contact`}>
                    Contact Information
                </Link>
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;