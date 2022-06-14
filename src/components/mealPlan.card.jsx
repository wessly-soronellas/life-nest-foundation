import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@ellucian/react-design-system/core';
import {Icon} from '@ellucian/ds-icons/lib';
import {
    spacingInset10,
    heightFluid,
    widthFluid,
    borderRadiusSmall,
    colorFillLogoPreferred,
    colorFillAlertError
 } from '@ellucian/react-design-system/core/styles/tokens';
 import { useCardControl, useCardInfo, useExtensionControl, useUserInfo } from '@ellucian/experience-extension/extension-utilities';
 import { MealPlanProvider, useMealPlanInformation } from '../context/meal-plan.context';


 const styles = theme => ({
    root: {
        height: heightFluid,
        width: widthFluid,
        borderRadius: borderRadiusSmall,
        backgroundColor: colorFillLogoPreferred
    },
    content: {
        padding: spacingInset10
    }
});


function MealPlanWidget(props) {
    const {classes} = props;
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {data: mealData, isLoading: mealLoading, isError: mealIsError, error: mealError} = useMealPlanInformation();

    useEffect(() => {
        console.log(mealLoading);
    }, [mealLoading])

    useEffect(() => {
        if (mealData) {
            console.log(mealData);
        }
    }, [mealData])

    useEffect(() => {
        if (mealError) {
            setErrorMessage({
                headerMessage: 'Error occurred while fetching data',
                textMessage: 'Error fetching Meal Plan',
                iconName: 'warning',
                iconColor: colorFillAlertError
            });
        }
    }, [mealError, setErrorMessage]);

    const onTransactionsClick = useCallback(() => {
        // open the page
        navigateToPage({route: '/'});
    }, [navigateToPage])

    return (
       <>
        {mealData && (
            <div>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>EagleCard Information</TableCell>
                            <TableCell align="right">Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {mealData.boardPlan.map(n => {
                    return (
                            <TableRow key={n.boardPlanId}>
                                <TableCell>
                                    <Typography gutterBottom variant="h5">{`${n.boardPlan}`}</Typography>
                                </TableCell>
                                <TableCell>
                                    <div align="right">
                                        <CircularProgress variant="static" value={((parseInt(n.semQtrRemaining, 10))/n.semQtrAllowed) * 100} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {mealData.storedValue.map(n => {
                        return (
                            <TableRow key={n.typeId}>
                                <TableCell component="th" scope="row">
                                    <Typography className={classes.title} variant="h5" gutterButtom>{n.name}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography classes={classes.item} variant="h6" gutterButtom>
                                    {new Intl.NumberFormat('en-US',
                                    {style: 'currency', currency: 'USD'}).format(n.balance)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
            </div>
        )}
       </>
    );
}

MealPlanWidget.propTypes = {
    classes: PropTypes.object.isRequired
};

const MealPlanWithStyle = withStyles(styles)(MealPlanWidget);

function MealPlanWithProviders(){
    return (
        <MealPlanProvider>
            <MealPlanWithStyle />
        </MealPlanProvider>
    )
}

export default MealPlanWithProviders;