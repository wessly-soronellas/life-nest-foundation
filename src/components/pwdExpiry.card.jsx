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
    IconButton,
    NotificationBadge,
    Tooltip,
    StatusLabel,
    Illustration,
    IMAGES
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
 import { PasswordExpirationProvider, usePasswordExpiration } from '../context/password-expiration.context';


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


function PasswordExpirationWidget(props) {
    const {classes} = props;
    const [status, setStatus] = useState('success');
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {data: pwdData, isLoading: pwdLoading, isError: pwdIsError, error: pwdError} = usePasswordExpiration();


    useEffect(() => {
        console.log(pwdLoading);
    }, [pwdLoading])

    useEffect(() => {
       if (pwdData){
        console.log(pwdData)
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
            {pwdData && (
                <>
                    <Illustration name={IMAGES.CALENDAR} />
                    <Typography variant="h3" id="pwd-CardContentDescription" gutterBottom>Days until password expires:</Typography>
                    <StatusLabel
                        id="pwd-StatusLabel"
                        text={`${pwdData.daysLeft}`}
                        type={status}
                    />
                    <Typography
                    className={classes.cardContentDescription}
                    variant="body2"
                    id="pwd-CardContentCaption"
                    gutterBottom>
                    Visit our password management site to change your password</Typography>
                </>
            )}
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