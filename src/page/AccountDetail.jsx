import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { useCardInfo, useExtensionControl, useCardControl, useUserInfo, useData, useCache } from '@ellucian/experience-extension/extension-utilities';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Dropdown,
    DropdownItem,
    Divider,
    Grid,
    Tooltip,
    ConfirmationDialog,
    Button,
    getSpacingStyles,
    spacingType,
    CircularProgress,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    useSpacing,
    TextLink,
    spacingVariant,
    StatusLabel,
    ButtonGroup,
    IconButton,
    FormControl,
    FormGroup,
    FormLabel,
    FormControlLabel,
    Checkbox
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
    fontWeightBold,
    borderRadiusLarge,
    borderRadiusXLarge,
    colorTextAlertError,
    colorTextAlertSuccess,
    colorTextAlertWarning,
    colorCtaBlueTint,
    colorBrandNeutral200,
    colorBackgroundAlertError,
    colorBackgroundAlertSuccess,
    colorBackgroundAlertWarning,
    fontSizeHeader1,
    fontSizeHeader4,
    fontSizeHeader5,
    borderRadiusCircle,
    colorBackgroundDefault,
    colorTextNeutral250,
    layout10
 } from '@ellucian/react-design-system/core/styles/tokens';
 import { AccountDetailProvider, useAccountDetail } from '../context/account-detail.context';



const styles = () => ({
    root: {
        height: '100%',
        overflowY: 'auto'
    },
    navContainer:{
        height: '70px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '25px'
    },
    logoContainer:{
        height: '100%',
        width: '70px',
        padding: '25px'
    },
    navLinks:{
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flexEnd'
    },
    navLink: {
        padding: '10px 15px',
        cursor: 'pointer'
    },
    grid1Definition: {
        gridTemplateColumns:  'auto auto auto',
        gridTemplateRows: 'auto auto auto auto',
        '& .section1': {
            gridColumn: '1 / span 1',
            fontFamily: fontFamilyHeader,
            backgroundColor: iris200,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader4,
            width: "100%",
            height: '100%',
            margin: "auto"
        },
        '& .main1': {
            gridColumn: '2 / span 2',
            fontFamily: fontFamilyHeader,
            backgroundColor: iris300,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader4,
            width: "100%",
            height: heightFluid,
            margin: "auto"
        },
        '& .section2': {
            gridColumn: '1 / span 1',
            fontFamily: fontFamilyHeader,
            backgroundColor: iris300,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader4,
            width: "100%",
            height: heightFluid,
            margin: "auto"
        },
        '& .section3': {
            gridColumn: '1 / span 1',
            fontFamily: fontFamilyHeader,
            backgroundColor: iris400,
            color: colorTextPrimary,
            fontSize: fontSizeHeader4,
            fontWeight: fontWeightBold,
            width: "100%",
            height: heightFluid,
            margin: "auto"
        }
    }
})

function BasePage(props){
    const {classes} = props;
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: true,
        spacing: 'standard'
    }, spacingType.LAYOUT);

    const [termSelected, setTermSelected] = useState();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const {getItem, storeItem} = useCache();
    const {configuration, cardConfiguration, cardId} = useCardInfo();
    const {getExtensionJwt, getEthosQuery} = useData();
    const {baseApi: base} = configuration || cardConfiguration || {};




    /* useEffect(() => {
        setLoadingStatus((balanceLoading || detailLoading || currentTermLoading));
    }, [balanceLoading, detailLoading, currentTermLoading]) */



    return (
        <div>
            <div className={classnames(standardSpacingClasses, classes.grid1Definition)}>
                    <div className="section1" align="center">
                        section1
                        <Card>
                            Test
                        </Card>
                    </div>
                    <div className="main1" align="center">
                    main1
                        <Card>
                            Main Information
                        </Card>
                    </div>
                    <div className="section2" align="center">
                    section2
                        <Card>
                            Cafe Status
                        </Card>
                    </div>
                    <div className="section3" align="center">
                    section3
                       <Card>
                        Contact Info
                       </Card>
                    </div>
            </div>
        </div>
    );
}

BasePage.propTypes = {
    classes: PropTypes.object.isRequired
};

const BasePageWithStyle = withStyles(styles)(BasePage);
function AccountBalanceWithProviders(){
    return (
        <AccountDetailProvider>
            <BasePageWithStyle />
        </AccountDetailProvider>
    )
}

export default AccountBalanceWithProviders;