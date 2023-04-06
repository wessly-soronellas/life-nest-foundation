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
    Paper,
    TableExpandableRow,
    Checkbox
} from '@ellucian/react-design-system/core';
import {Icon} from '@ellucian/ds-icons/lib';
import {
    spacingInset10,
    spacingInset20,
    spacing30,
    spacingInsetTall40,
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



const styles = (theme) => ({
    root: {
        height: '100%',
        overflowY: 'auto',
        padding: spacingInsetTall40
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
            gridColumn: '1 / span 2',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader4,
            width: "100%",
            height: '100%',
            margin: "auto"
        },
        '& .main1': {
            gridColumn: '1 / span 2',
            fontFamily: fontFamilyHeader,
            backgroundColor: iris300,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader4,
            width: "100%",
            height: heightFluid,
            margin: "auto"
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20
    },
    details: {
        alignItems: 'center'
    },
    column: {
        flexBasis: '33.33%'
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2)
    },
    childTable: {
        width: widthFluid
    },
    childContainer: {
        width: "95%"
    },
    noteContainer: {
        paddingTop: spacing30,
        paddingBottom: spacing30
    },
    headerContainer: {
        backgroundColor: '#E9E9E9',
        color: "#141d28",
        width: "100%"
    },
    footer: {
        backgroundColor: '#141d28',
        color: "white",
        paddingRight: spacing30,
        paddingLeft: spacing30,
        paddingBottom: spacing30
    },
    footerContainer: {
        paddingTop: spacing30,
        paddingBottom: spacing30
    },
    footerText: {
        color: "white"
    },
    button: {
        paddingBottom: spacing30
    },
    alert: {
        paddingTop: spacing30,
        alignItems: "center"
    },
    table: {
        backgroundColor: "white"
    },
    card: {
        color: "white",
        backgroundColor: "#141d28"
    }
})

function BasePage(props){
    const {classes} = props;
    const baseURL = 'https://eaglenet.life.edu/Student/Finance';
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: true,
        spacing: 'standard'
    }, spacingType.LAYOUT);
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
    const [expandAll, setExpandAll] = useState(false);
    const [ balanceDetailChild, setBalanceDetailChild ] = useState();
    const [ balanceDetailNoChild, setBalanceDetailNoChild ] = useState();
    const [open, setOpen] = useState(false);

    const {getItem, storeItem} = useCache();
    const {configuration, cardConfiguration, cardId} = useCardInfo();
    const {getExtensionJwt, getEthosQuery} = useData();
    const {baseApi: base} = configuration || cardConfiguration || {};

    const handleChange = event => {
        setTermSelected(event.target.value)
        setTerm(event.target.value)
    }

    const toggleOpen = () =>  {
        setOpen(() => !open);
    };

    const toggleExpandAll= () => {
        setOpen(() => !open)
    };


    /* useEffect(() => {
        setLoadingStatus((balanceLoading || detailLoading || currentTermLoading));
    }, [balanceLoading, detailLoading, currentTermLoading]) */

    useEffect(() => {
        if (detailData) {
            console.log("DETAIL DATA", detailData);
            const children = detailData[0].sections.filter(node => node.children !== undefined);
            console.log("children", children);
            setBalanceDetailChild(() => children);
            const noChildren = detailData[0].sections.filter(node => node.children === undefined);
            console.log("NO children", noChildren);
            setBalanceDetailNoChild(() => noChildren);
        }
    }, [detailData]);



    return (
        <div>
            <div className={classnames(standardSpacingClasses, classes.grid1Definition)}>
                    <div className="section1" align="center">
                            {balanceData && (
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
                                        currentTermData.map((node) => {
                                            return(
                                            <DropdownItem
                                            key={node.code}
                                            label={node.title}
                                            value={node.code}
                                            />
                                        )})
                                    )
                                    }
                                { balanceData.Periods.map((period) => {
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
                    <div className="main1" align="center">
                        {detailData &&(
                    <div id="note" className = {classes.balanceContainer}>
                    {(detailData && !detailLoading) && (
                        <div id="alert" className = {classes.alert}>
                            <Typography align="center" gutterBottom>
                                <StatusLabel type="draft" text="Alert: Your account balance is due by the end of the 2nd week of each quarter. Make sure your balance is zero to avoid disenrollment and a 25% fee."/>
                            </Typography>
                        </div>
                    )}
                    {(balanceDetailChild && balanceDetailChild.length > 0) && (
                        <div id="button-container" className={classes.button}>
                        <Button color="primary" onClick={toggleExpandAll}> Expand All </Button>
                            <Typography variant="body3" gutterBottom>
                                Note: Toggle the EXPAND ALL button to open and/or close all items.
                            </Typography>
                        </div>
                    )}
                    {(termSelected && detailData) && (
                        <Fragment>
                        <Paper className={classes.headerContainer}>
                        <Table id="parent">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h5">Name</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5">Amount</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h5">Actions</Typography>
                                    </TableCell>
                                    {balanceDetailChild &&(<TableCell />)}
                                </TableRow>
                            </TableHead>
                            <TableBody className={classes.table}>
                                {balanceDetailNoChild && (
                                    balanceDetailNoChild.map(obj => (
                                        <TableRow key={obj.displayName}>
                                            <TableCell >{obj.displayName}</TableCell>
                                            <TableCell>{`${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(Math.abs(obj.amount))}`}</TableCell>
                                            <TableCell>
                                                <TextLink
                                                    href={`${baseURL}`}
                                                    target="_blank"
                                                    >
                                                    View
                                                </TextLink>
                                            </TableCell>
                                            {balanceDetailChild &&(<TableCell />)}
                                        </TableRow>
                                    ))
                                )}
                                {balanceDetailChild && (
                                    balanceDetailChild.map(obj => (
                                        <TableExpandableRow
                                        id="child"
                                        key={obj.displayName}
                                        expandedRowContent={
                                            balanceDetailChild && (
                                                <Paper className={classes.childContainer}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Name</TableCell>
                                                            <TableCell>Amount (USD)</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {obj.children.map(child => (
                                                            <TableRow key={child.displayName}>
                                                                <TableCell>{child.displayName}</TableCell>
                                                                <TableCell>{`${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(Math.abs(child.amount))}`}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                                </Paper>
                                            )}
                                        expand={open}>
                                            <TableCell >{obj.displayName}</TableCell>
                                            <TableCell>{`${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(Math.abs(obj.amount))}`}</TableCell>
                                            <TableCell>
                                                <TextLink
                                                    href={`${baseURL}`}
                                                    target="_blank"
                                                    >
                                                    View
                                                </TextLink>
                                            </TableCell>
                                        </TableExpandableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </Paper>
                    <br />
                    <div className={classes.footerContainer}>
                        <Paper className={classes.footer}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h5" className={classes.footerText}>
                                                Balance:
                                            </Typography>
                                        </TableCell>
                                        <TableCell />
                                        <TableCell />
                                        <TableCell>
                                            <Typography align="right" variant="h5" className={classes.footerText}>
                                                {`${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(detailData[0].AmountDue)}`}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                    <div className="payNow" align="right">
                        <TextLink
                            id={`make_payment`}
                            href="https://secure.touchnet.net/C20966_tsa/web/caslogin.jsp"
                        >
                            Make a payment
                        </TextLink>
                    </div>
                        </Fragment>
                    )}
                    {(termSelected && detailLoading) && (
                        <>
                            <CircularProgress aria-valuetext="Step 2: Copying files" />
                        </>
                    )}
                </div>
                )}
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