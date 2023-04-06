/* eslint-disable @calm/react-intl/missing-formatted-message */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    getSpacingStyles,
    spacingType,
    Typography,
    TextLink
} from '@ellucian/react-design-system/core';
import {
    spacingInset20,
    heightFluid,
    borderWidthThin,
    colorFillAlertError,
    colorTextPrimary,
    fontFamilyHeader,
    fontWeightBold,
    borderRadiusLarge,
    colorBrandNeutral200,
    fontSizeHeader2,
    fontSizeHeader2Small,
    fontSizeHeader5,
    colorCtaBlueTint,
    layout10
 } from '@ellucian/react-design-system/core/styles/tokens';
 import {useExtensionControl} from '@ellucian/experience-extension/extension-utilities';
 import { MealPlanProvider, useMealPlanInformation } from '../context/meal-plan.context';


 const styles = theme => ({
    root: {
        padding: spacingInset20
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
            backgroundColor: colorCtaBlueTint,
            fontFamily: fontFamilyHeader,
            fontWeight: fontWeightBold,
            color: colorTextPrimary,
            border: `${borderWidthThin} solid ${colorTextPrimary}`,
            fontSize: fontSizeHeader2Small,
            borderRadius: borderRadiusLarge,
            width: "75%",
            margin: "auto"
        },
        '& .flexbucksContent': {
            gridColumn: '2 / span 1',
            backgroundColor: colorCtaBlueTint,
            fontFamily: fontFamilyHeader,
            fontWeight: fontWeightBold,
            color: colorTextPrimary,
            border: `${borderWidthThin} solid ${colorTextPrimary}`,
            fontSize: fontSizeHeader2Small,
            borderRadius: borderRadiusLarge,
            width: "75%",
            margin: "auto"
        },
        '& .eprintContent': {
            gridColumn: '3 / span 1',
            backgroundColor: colorCtaBlueTint,
            fontFamily: fontFamilyHeader,
            fontWeight: fontWeightBold,
            color: colorTextPrimary,
            border: `${borderWidthThin} solid ${colorTextPrimary}`,
            fontSize: fontSizeHeader2Small,
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
            backgroundColor: colorCtaBlueTint,
            fontFamily: fontFamilyHeader,
            fontWeight: fontWeightBold,
            color: colorTextPrimary,
            border: `${borderWidthThin} solid ${colorTextPrimary}`,
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
        height: heightFluid
    }
});



function MealPlanWidget(props) {
    const {classes} = props;
    // Experience SDK hooks
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {data: mealData, isLoading: mealLoading, error: mealError} = useMealPlanInformation();
    const [eBucks, setEBucks] = useState();
    const [flexBucks, setFlexBucks] = useState();
    const [ePrint, setEPrint] = useState();
    const [boardPlan, setBoardPlan] = useState();
    const [hasBoardPlan, setHasBoardPlan] = useState();
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: true,
        spacing: 'none'
    }, spacingType.LAYOUT);

    useEffect(() => {
        setLoadingStatus(true);
    }, [mealLoading])

    useEffect(() => {

        if (mealData){
            if (mealData.boardPlan.length > 0){
                setHasBoardPlan(true);
                setBoardPlan(mealData.boardPlan);
            }

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
            });
            setLoadingStatus(false);
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
            setLoadingStatus(false);
        }
    }, [mealError, setErrorMessage]);

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
            {
                hasBoardPlan ? (
                    <>
                        <div className="boardplanTitle" align="center" >
                            {boardPlan && boardPlan[0].boardPlan}
                        </div>
                        <div className="boardplanContent" align="center" >
                            {boardPlan && (<>{boardPlan[0].semQtrRemaining} <Typography>swipes</Typography></>) }
                        </div>
                    </>
                ) : (
                    <>
                        <div className="boardplanTitle" align="center" >
                            Board Plan
                        </div>
                        <div className="boardplanContent" align="center" >
                            <Typography variant="h4" style={{padding: spacingInset20}}gutterBottom>N/A</Typography>
                        </div>
                    </>
                )
            }
        </div>
        <div className={classes.moreInfo}>
        <Typography variant="h5" align="center">
            For more information on meal plans, please click&nbsp;
            <TextLink
                id={`more_info`}
                href="https://www.life.edu/campus-life-pages/eagle-card-services/meal-plans/"
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