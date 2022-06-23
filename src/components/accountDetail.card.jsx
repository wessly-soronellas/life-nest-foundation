import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Button,
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
    Tooltip,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
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
 import { AccountDetailProvider, useAccountDetail } from '../context/account-detail.context';


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
    const {
        balance: {
            balanceData,
            balanceIsError,
            balanceLoading,
            balanceError
        },
        selectedTerm,
        setTerm,
        currentTerm: {
            currentTermData,
            currentTermLoading,
            currentTermIsError,
            currentTermError
        },
        detail: {
            detailData,
            detailLoading,
            detailIsError,
            detailError
        }
    } = useAccountDetail();
    const [termSelected, setTermSelected] = useState();
    const [dropdownOpen, setDropdownOpen] = useState(false);



    useEffect(() => {
        setLoadingStatus((balanceLoading || detailLoading));
    }, [balanceLoading, detailLoading])

     useEffect(() => {
        if (balanceData) {
            console.log(balanceData);
        }
        if (detailData) {
            console.log(detailData);
        }
    }, [balanceData, detailData])

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
        setTerm(event.target.value)
    }

    /* useEffect(() => {
        console.log("Term in child", term)
    }, [term]) */

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
                    {
                        currentTermData && (
                            <DropdownItem
                                key={currentTermData.code}
                                label={currentTermData.title}
                                value={currentTermData.code}
                            />
                        )
                    }
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
            <div>
                {detailData && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography>Term Selected</Typography>
                                </TableCell>
                                <TableCell>
                                     <Typography>{detailData.term}</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Amount: ${detailData.AmountDue}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}

AccountBalanceWidget.propTypes = {
    classes: PropTypes.object.isRequired
};

const AccountBalanceWithStyle = withStyles(styles)(AccountBalanceWidget);

function AccountBalanceWithProviders(){
    return (
        <AccountDetailProvider>
            <AccountBalanceWithStyle />
        </AccountDetailProvider >
    )
}

export default AccountBalanceWithProviders;