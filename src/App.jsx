import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";

import Navigation from './page/Navigation';
import AccountDetails from './page/AccountDetail';
import ContactInfo from './page/ContactInfo';


// for more information on react router: https://v5.reactrouter.com/web/guides/quick-start

const App = () => {

    return (
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route path='contact' element={<ContactInfo/>} />
                <Route path='account' element={<AccountDetails/>} />
            </Route>
        </Routes>
    );
};


export default App;