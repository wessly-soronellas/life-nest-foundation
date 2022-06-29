import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    getSpacingStyles,
    spacingType,
    CircularProgress,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    useSpacing,
    spacingVariant,
    StatusLabel
} from '@ellucian/react-design-system/core';
import {Icon} from '@ellucian/ds-icons/lib';
import {
    spacingInset10,
    heightFluid,
    widthFluid,
    borderRadiusSmall,
    borderWidthThin,
    colorFillLogoPreferred,
    colorFillAlertError,
    colorBrandPrimary,
    colorBrandSecondary,
    fountain200,
    fountain300,
    fountain400,
    iris200,
    iris300,
    iris400,
    kiwi200,
    kiwi400
 } from '@ellucian/react-design-system/core/styles/tokens';
 import { useCardControl, useCardInfo, useExtensionControl, useUserInfo } from '@ellucian/experience-extension/extension-utilities';
 import { MealPlanProvider, useMealPlanInformation } from '../context/meal-plan.context';


 const styles = theme => ({
    root: {
        padding: spacingInset10
    },
    content: {
        padding: spacingInset10
    },
    grid1Definition: {
        gridTemplateColumns: '3fr 2fr',
        '& .full': {
            gridColumn: '1 / span 2'
        }
    },
    grid2Definition: {
        gridTemplateColumns:  '1fr 1fr 1fr ',
        gridTemplateRows: '1fr auto 1fr auto',
        '& .ebucksTitle': {
            gridColumn: '1 / span 1',
            backgroundColor: fountain200
        },
        '& .flexbucksTitle': {
            gridColumn: '2 / span 1',
            backgroundColor: fountain300
        },
        '& .eprintTitle': {
            gridColumn: '3 / span 1',
            backgroundColor: fountain400
        },
        '& .ebucksContent': {
            gridColumn: '1 / span 1',
            backgroundColor: iris200
        },
        '& .flexbucksContent': {
            gridColumn: '2 / span 1',
            backgroundColor: iris300
        },
        '& .eprintContent': {
            gridColumn: '3 / span 1',
            backgroundColor: iris400
        },
        '& .boardplanTitle': {
            gridColumn: '1 / span 3',
            backgroundColor: kiwi200
        },
        '& .boardplanContent': {
            gridColumn: '1 / span 3',
            backgroundColor: kiwi400,
            alignSelf: 'center'
        }
    },
    radios: {
        border: `${borderWidthThin} solid ${theme.palette.grey[400]}`
    },
    eBucksContainer: {
        backgroundColor: theme.palette.grey[400]
    },
    flexBucksContainer: {
        backgroundColor: theme.palette.grey[400]
    },
    ePrintContainer: {
        backgroundColor: theme.palette.grey[400]
    },
    boardPlanContainer: {
        backgroundColor: theme.palette.grey[400]
    },
    eBucksItem: {
        padding: spacingInset10,
        backgroundColor: colorBrandPrimary
    },
    flexBucksItem: {
        padding: spacingInset10,
        backgroundColor: colorBrandSecondary
    },
    ePrintItem: {
        padding: spacingInset10,
        backgroundColor: colorBrandPrimary
    },
    boardPlanItem: {
        padding: spacingInset10,
        backgroundColor: colorBrandPrimary
    }
});


function MealPlanWidget(props) {
    const {classes} = props;
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {data: mealData, isLoading: mealLoading, isError: mealIsError, error: mealError} = useMealPlanInformation();
    const [spacingStyles, spacingOptions, setSpacingOptions] = useSpacing();
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: true,
        spacing: 'none'
    }, spacingType.LAYOUT);

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

    const mealTable = () => (
        <>
        {mealData && (
            <div className={classnames(standardSpacingClasses, classes.grid2Definition)}>
                <div className="full">
                    <Typography variant="h5" align="center">Testing</Typography>
                </div>
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
    )

    const onTransactionsClick = useCallback(() => {
        // open the page
        navigateToPage({route: '/'});
    }, [navigateToPage])

    return (
       <div className={classes.root}>
        <div className={classnames(standardSpacingClasses, classes.grid2Definition)}>
            <div className="ebucksTitle">
                <Typography variant="h4" align="center">E-Bucks</Typography>
            </div>
            <div className="flexbucksTitle">
                <Typography variant="h4" align="center">Flex-Bucks</Typography>
            </div>
            <div className="eprintTitle">
                <Typography variant="h4" align="center">E-Print</Typography>
            </div>
            <div className="ebucksContent">
                <Typography variant="h4" align="center">$300</Typography>
            </div>
            <div className="flexbucksContent">
                <Typography variant="h4" align="center">$24.65</Typography>
            </div>
            <div className="eprintContent">
                <Typography variant="h4" align="center">$92.45</Typography>
            </div>
            <div className="boardplanTitle">
                <Typography variant="h4" align="center">Break?</Typography>
            </div>
            <div className="boardplanContent">
                <Typography variant="h5" align="center" gutterBottom>Board Plan</Typography>
                <div align="center">
                    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows" target="_none">
                        <Typography variant="h5" align="center">
                            <StatusLabel text="40" type="success" />
                        </Typography>
                    </a>
                </div>
                <Typography variant="h5" align="center">Swipes Remaining</Typography>
            </div>
        </div>
       </div>
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