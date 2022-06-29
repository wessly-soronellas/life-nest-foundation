import React, { useEffect, useState } from 'react';
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

import { useCardInfo, useExtensionControl, useUserInfo } from '@ellucian/experience-extension/extension-utilities';




const styles = () => ({
    root: {
        height: '100%',
        overflowY: 'auto'
    }
})

function MealPlan({classes}){
    return (
        <div className={classes.root}>
            MealPlan Page
        </div>
    );
}

MealPlan.propTypes = {
    classes: PropTypes.object.isRequired
};

const MealPlanWithStyle = withStyles(styles)(MealPlan);

export default MealPlanWithStyle;