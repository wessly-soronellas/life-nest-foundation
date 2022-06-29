import React from "react";
import PropTypes from 'prop-types';
import {
    Routes,
    Route
} from "react-router-dom";
import {usePageInfo} from '@ellucian/experience-extension/extension-utilities';

import Navigation from './page/Navigation';
import AccountDetails from './page/AccountDetail';
import ContactInfo from './page/ContactInfo';
import MealPlan from './page/MealPlan';
import Password from './page/Password';
import Base from './page/BasePage';


// for more information on react router: https://v5.reactrouter.com/web/guides/quick-start

const App = () => {

    return (
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Base />} />
                <Route path='contact' element={<ContactInfo/>} />
                <Route path='meal' element={<MealPlan/>} />
                <Route path='password' element={<Password/>} />
                <Route path='account' element={<AccountDetails/>} />
            </Route>
        </Routes>
    );
};

export default App;