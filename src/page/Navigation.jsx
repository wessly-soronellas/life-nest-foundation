import React, {Fragment} from 'react';
import { Outlet, Link } from 'react-router-dom';
import {usePageInfo} from '@ellucian/experience-extension/extension-utilities';
import PropTypes from 'prop-types';
import classenames from 'classnames';

import {
    Button,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
    Typography
} from '@ellucian/react-design-system/core'
import { colorFillAlertError, colorTextAlertSuccess, spacing30, spacing40, widthFluid } from '@ellucian/react-design-system/core/styles/tokens';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Icon
} from '@ellucian/ds-icons/lib';
import { useCardInfo, useExtensionControl, useUserInfo } from '@ellucian/experience-extension/extension-utilities';



const styles = () => ({
    root: {
        height: '100%',
        overflowY: 'auto'
    },
    navContainer:{
        height: '70px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '25px'
    },
    logoContainer:{
        height: '100%',
        width: '70px',
        padding: '25px'
    },
    navLinks:{
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flexEnd'
    },
    navLink: {
        padding: '10px 15px',
        cursor: 'pointer'
    }
})

const Navigation = ({classes}) => {

    const {basePath} = usePageInfo();

    return (
        <Fragment>
            <div className={classes.navContainer} id='navigation-container'>
                {
                    // Links will go here in other versions
                }
            </div>
            <Outlet />
        </Fragment>
    );
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired
};

const NavWithStyle = withStyles(styles)(Navigation)

export default NavWithStyle;