import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
    IconButton,
    NotificationBadge,
    Tooltip,
    getSpacingStyles,
    spacingType,
    TextLink,
    StatusLabel,
    Illustration,
    IMAGES
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
    fontFamilyDefault,
    fontWeightBold,
    borderRadiusLarge,
    borderRadiusXLarge,
    colorTextAlertError,
    colorTextAlertSuccess,
    colorTextAlertWarning,
    colorBrandNeutral200,
    colorBackgroundAlertError,
    colorBackgroundAlertSuccess,
    colorBackgroundAlertWarning,
    fontSizeHeader1,
    fontSizeDefault,
    fontSizeHeader2,
    fontSizeHeader5,
    borderRadiusCircle,
    borderWidthThick,
    colorGlobalBorderDefault,
    layout10
 } from '@ellucian/react-design-system/core/styles/tokens';
 import { useCardControl, useCardInfo, useExtensionControl, useUserInfo } from '@ellucian/experience-extension/extension-utilities';
 import { PasswordExpirationProvider, usePasswordExpiration } from '../context/password-expiration.context';


 const styles = theme => ({
    root: {
        padding: spacingInset20,
        height: heightFluid
    },
    grid2Definition: {
        gridTemplateColumns:  '1fr 1fr 1fr ',
        gridTemplateRows: 'auto auto auto auto',
        '& .timestampInfo': {
            gridColumn: '1 / span 1',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontSize: fontSizeHeader5,
            fontWeight: fontWeightBold
        },
        '& .circularProgress': {
            gridColumn: '2 / span 1',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader5
        },
        '& .daysLeftTitle': {
            gridColumn: '2 / span 1',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontSize: fontSizeHeader5,
            fontWeight: fontWeightBold
        },
        '& .daysLeft': {
            gridColumn: '2 / span 1',
            fontFamily: fontFamilyHeader,
            fontSize: fontSizeHeader2,
            fontWeight: fontWeightBold
        },
        '& .textLink': {
            gridColumn: '1 / span 3',
            color: colorTextPrimary,
            fontSize: fontSizeDefault,
            fontFamily: fontFamilyDefault
        }
    }
});


function PasswordExpirationWidget(props) {
    const {classes} = props;
    const [daysLeftText, setDaysLeftText] = useState(colorTextAlertSuccess);
    const [daysLeftBackground, setDaysLeftBackground] = useState(colorBackgroundAlertSuccess);
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {data: pwdData, isLoading: pwdLoading, isError: pwdIsError, error: pwdError} = usePasswordExpiration();
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: false,
        spacing: 'none'
    }, spacingType.LAYOUT);

    useEffect(() => {
        console.log(pwdLoading);
    }, [pwdLoading])

    useEffect(() => {
       if (pwdData){
        if (pwdData.daysLeft <= 15){
            setDaysLeftText(colorTextAlertError);
            setDaysLeftBackground(colorBackgroundAlertError);
        }
        if (pwdData.daysLeft > 15 && pwdData.daysLeft <= 30){
            setDaysLeftText(colorTextAlertWarning);
            setDaysLeftBackground(colorBackgroundAlertWarning);
        }
       }
    }, [pwdData])


    useEffect(() => {
        if (pwdError) {
            setErrorMessage({
                headerMessage: 'Error occurred while fetching data',
                textMessage: 'Error fetching Password Expiration',
                iconName: 'warning',
                iconColor: colorFillAlertError
            });
        }
    }, [pwdError, setErrorMessage]);

    const onTransactionsClick = useCallback(() => {
        // open the page
        navigateToPage({route: '/'});
    }, [navigateToPage])

    return (
        <div className={classes.root}>
            <div className={classnames(standardSpacingClasses, classes.grid2Definition)}>
                <div className="circularProgress" align="center">
                    {pwdData && (<CircularProgress variant="static" value={((pwdData.daysLeft/90) *100)} size="5rem" thickness={2} />)}
                </div>
                <div className="daysLeftTitle" align="center">
                    Days Remaining
                </div>
                {pwdData && daysLeftText && daysLeftBackground && (
                    <div className="daysLeft" align="center" style={{color: daysLeftText, backgroundColor: daysLeftBackground}}>
                        {pwdData.daysLeft}
                    </div>
                )}
                {pwdData && (
                    <div className="textLink" align="center">
                    Your password will expire on <div className="timestampInfo">{pwdData.expiry.substring(0, 10)}</div> Please click&nbsp;
                    <TextLink
                        id={`more_info`}
                        href="https://www.ellucian.com/"
                    >
                        here
                    </TextLink>&nbsp; to change it.
                    </div>
                )}
            </div>
        </div>
    );
}

PasswordExpirationWidget.propTypes = {
    classes: PropTypes.object.isRequired
};

const PasswordExpirationWithStyle = withStyles(styles)(PasswordExpirationWidget);

function PasswordExpirationWithProviders(){
    return (
        <PasswordExpirationProvider>
            <PasswordExpirationWithStyle />
        </PasswordExpirationProvider>
    )
}

export default PasswordExpirationWithProviders;