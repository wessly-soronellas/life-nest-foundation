import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CircularProgress,
    Dropdown,
    DropdownItem,
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
 import { AccountBalanceProvider, useAccountBalance } from '../context/account-balance.context';


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
    const {data:balanceData, isLoading: balanceLoading, isError: balanceIsError, error: balanceError} = useAccountBalance();
    const [termSelected, setTermSelected] = useState();
    const [dropdownOpen, setDropdownOpen] = useState(false);



    useEffect(() => {
        setLoadingStatus(balanceLoading);
    }, [balanceLoading])

    useEffect(() => {
        if (balanceData) {
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

    const handleChange = event => {
        setTermSelected(event.target.value)
    }

    return (
        <div className={classes.root}>
            {balanceData && (
                <Dropdown
                    label="Terms"
                    onChange={handleChange}
                    value={termSelected}
                    open={dropdownOpen}
                    onOpen={() => setDropdownOpen(true)}
                    onClose={() => setDropdownOpen(false)}
                >
                     {balanceData.Periods.map((period) => {
                        return (
                            <DropdownItem
                            key={period.Id}
                            label={period.Description}
                            value={period.Id}
                        />
                        )})
                    }
                </Dropdown>
            )}
        </div>
    );
}

AccountBalanceWidget.propTypes = {
    classes: PropTypes.object.isRequired
};

const AccountBalanceWithStyle = withStyles(styles)(AccountBalanceWidget);

function AccountBalanceWithProviders(){
    return (
        <AccountBalanceProvider>
            <AccountBalanceWithStyle />
        </AccountBalanceProvider>
    )
}

export default AccountBalanceWithProviders;