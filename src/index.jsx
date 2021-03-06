import React from "react";
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import {usePageInfo} from '@ellucian/experience-extension/extension-utilities';

import App from './App';
import Navigation from './page/Navigation';
import AccountDetails from './page/AccountDetail';
import BasePage from './page/BasePage';
import ContactInfo from './page/ContactInfo';
import MealPlan from './page/MealPlan';
import Password from './page/Password';


// for more information on react router: https://v5.reactrouter.com/web/guides/quick-start




const Page = () => {
    const {basePath} = usePageInfo();

    return (
        <Router basename={basePath}>
            <App />
        </Router>
    );
};

export default Page;