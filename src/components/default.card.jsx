// Copyright 2021-2022 Ellucian Company L.P. and its affiliates.

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link, Outlet} from 'react-router-dom';

import { Button, Table, TableBody, TableCell, TableRow, Typography } from '@ellucian/react-design-system/core'
import { colorFillAlertError, colorTextAlertSuccess, spacing30, spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { withStyles } from '@ellucian/react-design-system/core/styles';

import { useCardControl, useCardInfo, useExtensionControl, usePageInfo, useUserInfo } from '@ellucian/experience-extension/extension-utilities';




const styles = () => ({
    root:{
        height: '100%',
        overflowY: 'auto'
    }
});

function Default({classes}) {


    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { configuration: { payNowUrl } = {} } = useCardInfo();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {basePath} = usePageInfo();


    const openAccountDetail = useCallback(() => {
        // open the page
        navigateToPage({route: '/account'});
    }, [navigateToPage])

    const openBase = useCallback(() => {
        // open the page
        navigateToPage({route: '/'});
    }, [navigateToPage])


    const openContactInfo = useCallback(() => {
        // open the page
        navigateToPage({route: '/contact'});
    }, [navigateToPage])

    const openMealPlan = useCallback(() => {
        // open the page
        navigateToPage({route: '/meal'});
    }, [navigateToPage])

    const openPassword = useCallback(() => {
        // open the page
        navigateToPage({route: '/password'});
    }, [navigateToPage])



    return (
        <div className={classes.root}>
            <Button onClick={openAccountDetail}>
                Account Detail
            </Button>
            <Button onClick={openContactInfo}>
                ContactInfo
            </Button>
            <Button onClick={openMealPlan}>
                MealPlan
            </Button>
            <Button onClick={openPassword}>
                Password
            </Button>
            <Button onClick={openPassword}>
                Base
            </Button>
            <Fragment>
        </Fragment>
        </div>
    );
}

Default.propTypes = {
    classes: PropTypes.object.isRequired
};

const DefaultWithStyle = withStyles(styles)(Default);

export default DefaultWithStyle;