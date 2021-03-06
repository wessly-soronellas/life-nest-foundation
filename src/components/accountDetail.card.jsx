/* eslint-disable @calm/react-intl/missing-formatted-message */
import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Button,
    Dropdown,
    DropdownItem,
    getSpacingStyles,
    spacingType,
    TextLink
} from '@ellucian/react-design-system/core';
import {
    spacingInset20,
    colorFillAlertError,
    colorTextPrimary,
    fontFamilyHeader,
    fontWeightBold,
    borderRadiusLarge,
    colorBrandNeutral200,
    fontSizeHeader4,
    fontSizeHeader2,
    fontSizeDefault
 } from '@ellucian/react-design-system/core/styles/tokens';
 import { useCardControl, useExtensionControl} from '@ellucian/experience-extension/extension-utilities';
 import { AccountDetailProvider, useAccountDetail } from '../context/account-detail.context';


 const styles = () => ({
    root: {
        padding: spacingInset20
    },
    grid2Definition: {
        gridTemplateColumns:  'auto auto auto',
        gridTemplateRows: 'auto auto auto',
        gap: '10px 10px',
        '& .termDropdown': {
            gridColumn: '1 / span 3',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeDefault
        },
        '& .statementTitle': {
            gridColumn: '1 / span 1',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader4
        },
        '& .payNow': {
            gridColumn: '3 / span 1'
        },
        '& .statementContent': {
            gridColumn: '1 / span 3',
            backgroundColor: colorBrandNeutral200,
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontSize: fontSizeHeader2,
            fontWeight: fontWeightBold,
            borderRadius: borderRadiusLarge,
            width: "100%",
            margin: "auto"
        },
        '& .viewDetailsButton': {
            gridColumn: '1 / span 3'
        }
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
            balanceLoading,
            balanceError
        },
        setTerm,
        currentTerm: {
            currentTermData,
            currentTermLoading,
            currentTermError
        },
        detail: {
            detailData,
            detailLoading,
            detailError
        }
    } = useAccountDetail();
    const [termSelected, setTermSelected] = useState();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: true,
        spacing: 'none'
    }, spacingType.LAYOUT);



    useEffect(() => {
        setLoadingStatus((balanceLoading || detailLoading || currentTermLoading));
    }, [balanceLoading, detailLoading, currentTermLoading])

     /* useEffect(() => {
        if (balanceData) {
            console.log(balanceData);
        }
        if (detailData) {
            console.log(detailData);
        }
    }, [balanceData, detailData]) */

    useEffect(() => {
        if (balanceError) {
            setErrorMessage({
                headerMessage: 'Error occurred while fetching data',
                textMessage: 'Error fetching Account Balance',
                iconName: 'warning',
                iconColor: colorFillAlertError
            });
        }
    }, [balanceError, detailError, currentTermError, setErrorMessage]);

    const onDetailClick = useCallback(() => {
        // open the page
        navigateToPage({route: '/account'});
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
                <div className={classnames(standardSpacingClasses, classes.grid2Definition)}>
                    <div className="termDropdown">
                        <Dropdown
                            label="Terms"
                            onChange={handleChange}
                            value={termSelected}
                            open={dropdownOpen}
                            onOpen={() => setDropdownOpen(true)}
                            onClose={() => setDropdownOpen(false)}
                            autoWidth={true}
                            fullWidth
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
                    </div>
                    {detailData && (
                        <div className="statementTitle" align="left">
                            Account Balance - {detailData.term}
                        </div>
                    )}
                    <div className="payNow" align="center">
                        <TextLink
                            id={`make_payment`}
                            href="https://secure.touchnet.net/C20966_tsa/web/caslogin.jsp"
                        >
                            Make a payment
                        </TextLink>
                    </div>
                    <div className="statementContent" align="center" >
                        {detailData && (
                            <span>{(new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(detailData.AmountDue))}</span>
                        )}
                    </div>
                    <div className="viewDetailsButton" align="center" >
                        <Button fluid color="primary" onClick={onDetailClick}>
                            View Details
                        </Button>
                    </div>
                </div>
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
        <AccountDetailProvider>
            <AccountBalanceWithStyle />
        </AccountDetailProvider >
    )
}

export default AccountBalanceWithProviders;