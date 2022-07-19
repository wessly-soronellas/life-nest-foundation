/* eslint-disable @calm/react-intl/missing-formatted-message */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    CircularProgress,
    getSpacingStyles,
    spacingType,
    TextLink
} from '@ellucian/react-design-system/core';
import {
    spacingInset20,
    heightFluid,
    colorFillAlertError,
    colorTextPrimary,
    fontFamilyHeader,
    fontFamilyDefault,
    fontWeightBold,
    colorTextAlertError,
    colorTextAlertSuccess,
    colorTextAlertWarning,
    colorBackgroundAlertError,
    colorBackgroundAlertSuccess,
    colorBackgroundAlertWarning,
    fontSizeDefault,
    fontSizeHeader2,
    fontSizeHeader5
 } from '@ellucian/react-design-system/core/styles/tokens';
 import { useExtensionControl } from '@ellucian/experience-extension/extension-utilities';
 import { PasswordExpirationProvider, usePasswordExpiration } from '../context/password-expiration.context';


 const styles = () => ({
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
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {data: pwdData, isLoading: pwdLoading, error: pwdError} = usePasswordExpiration();
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: false,
        spacing: 'none'
    }, spacingType.LAYOUT);

    useEffect(() => {
        setLoadingStatus(pwdLoading)
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
                        href="https://pwd.life.edu/"
                    >
                        here
                    </TextLink>&nbsp;to change it.
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