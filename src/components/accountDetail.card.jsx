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


function AccountBalanceWidget(props) {
    const {classes} = props;
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {data, isLoading, isError} = useProfileDashboard();

    // look for balance data
    const {balance: balanceData} = data;
    const {balance: balanceLoading} = isLoading;
    const {balance: balanceError} = isError;


    useEffect(() => {
        setLoadingStatus(balanceLoading);
    }, [balanceLoading])

    useEffect(() => {
        if (data) {
            console.log(balanceData);
        }
    }, [balanceData])

    useEffect(() => {
        if (balanceError) {
            setErrorMessage({
                headerMessage: 'Error occurred while fetching data',
                textMessage: 'Error fetching Account Balance',
                iconName: 'warning',
                iconColor: colorFillAlertError
            });
        }
    }, [balanceError, setErrorMessage]);

    const onTransactionsClick = useCallback(() => {
        // open the page
        navigateToPage({route: '/'});
    }, [navigateToPage])

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                {JSON.stringify(balanceData)}
            </div>
        </div>
    );
}

AccountBalanceWidget.propTypes = {
    classes: PropTypes.object.isRequired
};

const ProfileDashboardWithStyle = withStyles(styles)(AccountBalanceWidget);

function ProfileDashboardWithProviders(){
    return (
        <ProfileDashboardProvider>
            <ProfileDashboardWithStyle />
        </ProfileDashboardProvider>
    )
}

export default ProfileDashboardWithProviders;