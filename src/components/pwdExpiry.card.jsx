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
    Tooltip
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
 import { ProfileDashboardProvider, useProfileDashboard } from '../context/profile-dashboard';


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
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {data, isLoading, isError} = useProfileDashboard();

    // look for password data
    const {password: pwdData} = data;
    const {password: pwdLoading} = isLoading;
    const {password: pwdError} = isError;

    useEffect(() => {
        setLoadingStatus(pwdLoading);
    }, [pwdLoading])

    useEffect(() => {
        if (pwdData) {
            console.log(pwdData);
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
            <div className={classes.content}>
                {JSON.stringify(pwdData)}
            </div>
        </div>
    );
}

PasswordExpirationWidget.propTypes = {
    classes: PropTypes.object.isRequired
};

const ProfileDashboardWithStyle = withStyles(styles)(PasswordExpirationWidget);

function ProfileDashboardWithProviders(){
    return (
        <ProfileDashboardProvider>
            <ProfileDashboardWithStyle />
        </ProfileDashboardProvider>
    )
}

export default ProfileDashboardWithProviders;