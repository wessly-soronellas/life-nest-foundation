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
    Button,
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
    TextLink,
    spacingVariant,
    StatusLabel
} from '@ellucian/react-design-system/core';
import {Icon} from '@ellucian/ds-icons/lib';
import {
    spacingInset10,
    spacingInset20,
    heightFluid,
    widthFluid,
    borderRadiusSmall,
    borderWidthThin,
    colorFillLogoPreferred,
    colorFillAlertError,
    colorBrandPrimary,
    colorBrandSecondary,
    colorTextPrimary,
    fountain200,
    fountain300,
    fountain400,
    iris200,
    iris300,
    iris400,
    kiwi200,
    kiwi400,
    fontFamilyHeader,
    fontWeightBold,
    borderRadiusLarge,
    borderRadiusXLarge,
    colorTextAlertError,
    colorTextAlertSuccess,
    colorBrandNeutral200,
    colorBackgroundAlertError,
    fontSizeHeader1,
    fontSizeHeader2,
    fontSizeHeader5,
    borderRadiusCircle,
    layout10
 } from '@ellucian/react-design-system/core/styles/tokens';
 import { useCardControl, useCardInfo, useExtensionControl, useUserInfo } from '@ellucian/experience-extension/extension-utilities';
 import { MealPlanProvider, useMealPlanInformation } from '../context/meal-plan.context';


 const styles = theme => ({
    root: {
        padding: spacingInset20,
        backgroundColor: colorBrandNeutral200,
        height: heightFluid
    },
    grid2Definition: {
        gridTemplateColumns:  '1fr 1fr 1fr ',
        gridTemplateRows: '1fr auto 1fr auto',
        '& .ebucksTitle': {
            gridColumn: '1 / span 1',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader5
        },
        '& .flexbucksTitle': {
            gridColumn: '2 / span 1',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader5
        },
        '& .eprintTitle': {
            gridColumn: '3 / span 1',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontSize: fontSizeHeader5,
            fontWeight: fontWeightBold
        },
        '& .ebucksContent': {
            gridColumn: '1 / span 1',
            backgroundColor: kiwi200,
            fontFamily: fontFamilyHeader,
            fontWeight: fontWeightBold,
            color: colorTextPrimary,
            fontSize: fontSizeHeader2,
            borderRadius: borderRadiusLarge,
            width: "75%",
            margin: "auto"
        },
        '& .flexbucksContent': {
            gridColumn: '2 / span 1',
            backgroundColor: kiwi200,
            fontFamily: fontFamilyHeader,
            fontWeight: fontWeightBold,
            color: colorTextPrimary,
            fontSize: fontSizeHeader2,
            borderRadius: borderRadiusLarge,
            width: "75%",
            margin: "auto"
        },
        '& .eprintContent': {
            gridColumn: '3 / span 1',
            backgroundColor: kiwi200,
            fontFamily: fontFamilyHeader,
            fontWeight: fontWeightBold,
            color: colorTextPrimary,
            fontSize: fontSizeHeader2,
            borderRadius: borderRadiusLarge,
            width: "75%",
            margin: "auto"
        },
        '& .boardplanTitle': {
            gridColumn: '1 / span 3',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontSize: fontSizeHeader5,
            fontWeight: fontWeightBold,
            width: "100%",
            margin: "auto",
            marginTop: "8px"
        },
        '& .boardplanContent': {
            gridColumn: '1 / span 3',
            backgroundColor: kiwi200,
            fontFamily: fontFamilyHeader,
            fontWeight: fontWeightBold,
            color: colorTextPrimary,
            fontSize: fontSizeHeader2,
            borderRadius: borderRadiusLarge,
            width: "45%",
            margin: "auto"
        }
    },
    radios: {
        border: `${borderWidthThin} solid ${theme.palette.grey[400]}`
    },
    moreInfo: {
        margin: layout10
    }
});


function MealPlanWidget(props) {
    const {classes} = props;
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {data: mealData, isLoading: mealLoading, isError: mealIsError, error: mealError} = useMealPlanInformation();
    const [eBucks, setEBucks] = useState();
    const [flexBucks, setFlexBucks] = useState();
    const [ePrint, setEPrint] = useState();
    const [boardPlan, setBoardPlan] = useState();
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: true,
        spacing: 'none'
    }, spacingType.LAYOUT);

    useEffect(() => {
        console.log(mealLoading);
    }, [mealLoading])

    useEffect(() => {
        if (mealData) {
            setBoardPlan(mealData.boardPlan);
            console.log("board plan", mealData.boardPlan);
        }

        if (mealData){
            mealData.storedValue.map(value => {
                if (value.name === 'eBucks'){
                    setEBucks(value);
                }
                if (value.name === 'flexBucks'){
                    setFlexBucks(value);
                }
                if (value.name === 'ePrint'){
                    setEPrint(value);
                }
                return value
            })
        }
    }, [mealData]);

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
            <div className="ebucksTitle" align="center">
                E-Bucks
            </div>
            <div className="flexbucksTitle" align="center">
                Flex-Bucks
            </div>
            <div className="eprintTitle" align="center">
                E-Print
            </div>
            <div className="ebucksContent" align="center" >
                {eBucks ? (new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(eBucks.balance)) : 'N/A'}
            </div>
            <div className="flexbucksContent" align="center" >
                {flexBucks ? (new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(flexBucks.balance)) : 'N/A'}
            </div>
            <div className="eprintContent" align="center" >
                {ePrint ? (new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(ePrint.balance)) : 'N/A'}
            </div>
            <div className="boardplanTitle" align="center" >
                {boardPlan && boardPlan[0].boardPlan}
            </div>
            <div className="boardplanContent" align="center" >
                 {boardPlan && boardPlan[0].semQtrRemaining} <Typography>swipes</Typography>
            </div>
        </div>
        <div className={classes.moreInfo}>
        <Typography variant="h5" align="center" gutterBottom>
            For more information on meal plans, please click&nbsp;
            <TextLink
                id={`more_info`}
                href="https://www.ellucian.com/"
            >
                here
            </TextLink>.
        </Typography>
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