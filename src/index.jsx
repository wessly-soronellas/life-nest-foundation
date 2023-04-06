import React from "react";
import {
    BrowserRouter as Router
} from "react-router-dom";
import {usePageInfo} from '@ellucian/experience-extension/extension-utilities';

import App from './App';


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