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


function ContactInformationWidget(props) {
    const {classes} = props;
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {data, isLoading, isError} = useProfileDashboard();

    // look for contact data
    const {contact: contactData} = data;
    const {contact: contactLoading} = isLoading;
    const {contact: contactError} = isError;

    useEffect(() => {
        setLoadingStatus(contactLoading);
    }, [contactLoading])

    useEffect(() => {
        if (contactData) {
            console.log(contactData);
        }
    }, [contactData])

    useEffect(() => {
        if (contactError) {
            setErrorMessage({
                headerMessage: 'Error occurred while fetching data',
                textMessage: 'Error fetching Contact Information',
                iconName: 'warning',
                iconColor: colorFillAlertError
            });
        }
    }, [contactError, setErrorMessage]);

    const onTransactionsClick = useCallback(() => {
        // open the page
        navigateToPage({route: '/'});
    }, [navigateToPage])

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                {JSON.stringify(contactData)}
            </div>
        </div>
    );
}

ContactInformationWidget.propTypes = {
    classes: PropTypes.object.isRequired
};

const ProfileDashboardWithStyle = withStyles(styles)(ContactInformationWidget);

function ProfileDashboardWithProviders(){
    return (
        <ProfileDashboardProvider>
            <ProfileDashboardWithStyle />
        </ProfileDashboardProvider>
    )
}

export default ProfileDashboardWithProviders;