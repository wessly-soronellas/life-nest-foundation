/* eslint-disable @calm/react-intl/missing-formatted-message */
import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
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
 import { useCardControl,  useExtensionControl} from '@ellucian/experience-extension/extension-utilities';
 import { ContactInformationProvider, useContactInformation } from '../context/contact-info.context';


 const styles = theme => ({
    root: {
        height: heightFluid,
        width: widthFluid,
        padding: spacingInset20,
        backgroundColor: colorFillLogoPreferred
    },
    phoneTable: {
        width: '85%',
        margin: 'auto',
        backgroundColor: colorBrandNeutral200,
        color: colorTextPrimary
    },
    addressTable: {
        width: '95%',
        margin: 'auto',
        backgroundColor: colorBrandNeutral200,
        color: colorTextPrimary,
        '& .preferredIcon': {
            color: theme.palette.secondary.main
        }
    },
    emailTable: {
        width: '95%',
        margin: 'auto',
        backgroundColor: colorBrandNeutral200,
        color: colorTextPrimary,
        '& .preferredIcon': {
            color: theme.palette.secondary.main
        }
    },
    grid2Definition: {
        gridTemplateColumns:  '1fr 1fr 1fr',
        gridTemplateRows: 'auto auto auto auto',
        '& .phoneTitle': {
            gridColumn: '1 / span 1',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader4,
            width: "75%",
            margin: "auto"
        },
        '& .addressTitle': {
            gridColumn: '2 / span 1',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontWeight: fontWeightBold,
            fontSize: fontSizeHeader4,
            width: "75%",
            margin: "auto"
        },
        '& .emailTitle': {
            gridColumn: '3 / span 1',
            fontFamily: fontFamilyHeader,
            color: colorTextPrimary,
            fontSize: fontSizeHeader4,
            fontWeight: fontWeightBold,
            width: "75%",
            margin: "auto"
        },
        '& .phoneIcon': {
            gridColumn: '1 / span 1',
            backgroundColor: colorCtaBlueTint,
            padding: spacingInset10,
            borderRadius: borderRadiusLarge,
            width: "65%",
            height: heightFluid,
            margin: "auto",
            color: colorTextPrimary
        },
        '& .phoneIcon:hover': {
            gridColumn: '1 / span 1',
            backgroundColor: colorTextPrimary,
            padding: spacingInset10,
            borderRadius: borderRadiusLarge,
            width: "65%",
            height: heightFluid,
            margin: "auto",
            color: colorCtaBlueTint
        },
        '& .addressIcon': {
            gridColumn: '2 / span 1',
            backgroundColor: colorCtaBlueTint,
            padding: spacingInset10,
            borderRadius: borderRadiusLarge,
            width: "65%",
            height: heightFluid,
            margin: "auto",
            color: colorTextPrimary
        },
        '& .addressIcon:hover': {
            backgroundColor: colorTextPrimary,
            padding: spacingInset10,
            borderRadius: borderRadiusLarge,
            width: "65%",
            height: heightFluid,
            margin: "auto",
            color: colorCtaBlueTint
        },
        '& .emailIcon': {
            gridColumn: '3 / span 1',
            backgroundColor: colorCtaBlueTint,
            padding: spacingInset10,
            borderRadius: borderRadiusLarge,
            width: "65%",
            height: heightFluid,
            margin: "auto",
            color: colorTextPrimary
        },
        '& .emailIcon:hover': {
            backgroundColor: colorTextPrimary,
            padding: spacingInset10,
            borderRadius: borderRadiusLarge,
            width: "65%",
            height: heightFluid,
            margin: "auto",
            color: colorCtaBlueTint
        },
        '& .phoneStatus': {
            gridColumn: '1 / span 1',
            fontFamily: fontFamilyHeader,
            fontSize: fontSizeHeader5,
            width: widthFluid,
            margin: "auto"
        },
        '& .addressStatus': {
            gridColumn: '2 / span 1',
            fontFamily: fontFamilyHeader,
            fontSize: fontSizeHeader5,
            width: widthFluid,
            margin: "auto"
        },
        '& .emailStatus': {
            gridColumn: '3 / span 1',
            fontFamily: fontFamilyHeader,
            fontSize: fontSizeHeader5,
            width: widthFluid,
            margin: "auto"
        },
        '& .buttonGroup': {
            gridColumn: '1 / span 3',
            width: "95%",
            margin: "auto",
            marginTop: "8px"
        }
    }
});


function ContactInformationWidget(props) {
    const {classes} = props;
    // Experience SDK hooks
    const { navigateToPage } = useCardControl();
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const {
        data: contactData,
        isLoading: contactLoading,
        isError: contactIsError,
        error: contactError,
        confirmData: confirmContactData,
        confirmIsLoading: confirmContactLoading,
        confirmIsError: confirmContactIsError,
        confirmError: confirmContactError,
        setConfirmBody,
        setConfirmContact
    } = useContactInformation();
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: false,
        spacing: 'none'
    }, spacingType.LAYOUT);

    // Hooks to separate contact information
    const [phoneData, setPhoneData] = useState();
    const [addressData, setAddressData] = useState();
    const [emailData, setEmailData] = useState();
    const [daysSince, setDaysSince] = useState();

    // Hooks to determine status for contact information
    const [phoneDaysSince, setPhoneDaysSince] = useState();
    const [addressDaysSince, setAddressDaysSince] = useState();
    const [emailDaysSince, setEmailDaysSince] = useState();
    const [phoneStatusText, setPhoneStatusText] = useState(colorTextAlertSuccess);
    const [addressStatusText, setAddressStatusText] = useState(colorTextAlertSuccess);
    const [emailStatusText, setEmailStatusText] = useState(colorTextAlertSuccess);
    const [phoneStatusBackgroundColor, setPhoneStatusBackgroundColor] = useState(colorBackgroundAlertSuccess);
    const [addressStatusBackgroundColor, setAddressStatusBackgroundColor] = useState(colorBackgroundAlertSuccess);
    const [emailStatusBackgroundColor, setEmailStatusBackgroundColor] = useState(colorBackgroundAlertSuccess);
    const [phoneStatusIcon, setPhoneStatusIcon] = useState("check-feedback");
    const [addressStatusIcon, setAddressStatusIcon] = useState("check-feedback");
    const [emailStatusIcon, setEmailStatusIcon] = useState("check-feedback");
    const [phoneStatusMessage, setPhoneStatusMessage] = useState("phone is up to date");
    const [addressStatusMessage, setAddressStatusMessage] = useState("address is up to date");
    const [emailStatusMessage, setEmailStatusMessage] = useState("email is up to date");

    // Hooks to open/close confirmation diologs
    const [phoneOpen, setPhoneOpen] = useState(false);
    const [addressOpen, setAddressOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);


    useEffect(() => {
        setLoadingStatus(contactLoading|| confirmContactLoading);
    }, [contactLoading, confirmContactLoading])

    useEffect(() => {
        if (contactData) {
            console.log(contactData);
            setPhoneData(contactData.profile.Phones);
            setAddressData(contactData.profile.Addresses);
            setEmailData(contactData.profile.EmailAddresses);
            setDaysSince(contactData.daysSince);
        }
    }, [contactData]);

    useEffect(() => {
        if (daysSince) {
            setPhoneDaysSince(daysSince.daysSincePhoneConfirmed);
            setAddressDaysSince(daysSince.daysSinceAddressConfirmed);
            setEmailDaysSince(daysSince.daysSinceEmailConfirmed);
        }
    }, [daysSince]);

    // conditional styling section
    useEffect(() => {
        if (phoneDaysSince) {
            if (phoneDaysSince >= 150 && phoneDaysSince <= 179){
                setPhoneStatusText(colorTextAlertWarning);
                setPhoneStatusBackgroundColor(colorBackgroundAlertWarning);
                setPhoneStatusIcon("warning");
                setPhoneStatusMessage("update or confirm soon");
            }
            if (phoneDaysSince >= 180){
                setPhoneStatusText(colorTextAlertError);
                setPhoneStatusBackgroundColor(colorBackgroundAlertError);
                setPhoneStatusIcon("warning-solid");
                setPhoneStatusMessage("update or confirm now");
            }
        }
    }, [phoneDaysSince]);

    useEffect(() => {
        if (addressDaysSince) {
            if (addressDaysSince >= 150 && addressDaysSince <= 179){
                setAddressStatusText(colorTextAlertWarning);
                setAddressStatusBackgroundColor(colorBackgroundAlertWarning);
                setAddressStatusIcon("warning");
                setAddressStatusMessage("update or confirm soon");
            }
            if (addressDaysSince >= 180){
                setAddressStatusText(colorTextAlertError);
                setAddressStatusBackgroundColor(colorBackgroundAlertError);
                setAddressStatusIcon("warning-solid");
                setAddressStatusMessage("update or confirm now");
            }
        }
    }, [addressDaysSince]);

    useEffect(() => {
        if (emailDaysSince) {

            if (emailDaysSince >= 150 && emailDaysSince <= 179){
                setEmailStatusText(colorTextAlertWarning);
                setEmailStatusBackgroundColor(colorBackgroundAlertWarning);
                setEmailStatusIcon("warning");
                setEmailStatusMessage("update or confirm soon");
            }
            if (emailDaysSince >= 180){
                setEmailStatusText(colorTextAlertError);
                setEmailStatusBackgroundColor(colorBackgroundAlertError);
                setEmailStatusIcon("warning-solid");
                setEmailStatusMessage("update or confirm now");
            }
        }
    }, [emailDaysSince]);

    useEffect(() => {
        if (contactError) {
            setErrorMessage({
                headerMessage: 'Error occurred while fetching data',
                textMessage: 'Error fetching Contact Information',
                iconName: 'warning',
                iconColor: colorFillAlertError
            });
        }

        if (confirmContactError) {
            setErrorMessage({
                headerMessage: 'Error occurred while updating contact information',
                textMessage: JSON.stringify(confirmContactError),
                iconName: 'warning',
                iconColo: colorFillAlertError
            })
        }
    }, [contactIsError, contactError, setErrorMessage, confirmContactIsError, confirmContactError]);

    const onConfirmClick = () => {
        setConfirmOpen(false);
        setConfirmContact(true);
        setConfirmBody({confirmAddress: true, confirmEmail: true, confirmPhone:true});
    }
    const onUpdateClick = () => window.open('https://eaglenet.life.edu/Student/UserProfile')

    // Confirmation Dialog section (PhoneContent, AddressContent, EmailContent, and CompleteContent)
    function PhoneContent(){
        return (
            <>
                {phoneData && (
                    <Table className={classes.phoneTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Phone Number</TableCell>
                                <TableCell align="left">Type</TableCell>
                                <TableCell align="center">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {phoneData.map((phone) => (
                                <TableRow key={phone.Number}>
                                    <TableCell>{phone.Number}</TableCell>
                                    <TableCell align="left">{phone.TypeCode}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => window.open('https://eaglenet.life.edu/Student/UserProfile')}>
                                            <Icon name="edit"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </>
        )
    }

    function AddressContent(){
        return (
            <>
            {addressData && (
                <Table className={classes.addressTable}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="center">Preferred</TableCell>
                            <TableCell align="center">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {addressData.map((address) => (
                            <TableRow key={address.AddressId}>
                                <TableCell>
                                    {address.AddressLabel.map((line) => (
                                        <Typography key={line} gutterBottom>
                                            {`${line} `}
                                        </Typography>
                                        )
                                    )}
                                </TableCell>
                                <TableCell align="left">{address.Type}</TableCell>
                                <TableCell align="center" className="preferredIcon">
                                    {address.IsPreferredAddress && (<Icon name="check" style={{height: 24, width: 24}}/>)}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => window.open('https://eaglenet.life.edu/Student/UserProfile')}>
                                        <Icon name="edit" style={{height: 24, width: 24}}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            </>
        )
    }

    function EmailContent(){
        return (
            <>
            {emailData && (
                <Table className={classes.emailTable}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="center">Preferred</TableCell>
                            <TableCell align="center">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emailData.map((email) => {
                            return (
                                (email.TypeCode === 'WEB' || email.TypeCode == 'PER') && (
                                    <TableRow key={email.Value}>
                                            <>
                                            <TableCell>{email.Value}</TableCell>
                                            <TableCell align="left">{email.TypeCode}</TableCell>
                                            <TableCell align="center" className="preferredIcon">
                                                {email.IsPreferred && (<Icon name="check" style={{height: 24, width: 24}}/>)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={() => window.open('https://eaglenet.life.edu/Student/UserProfile')}>
                                                    <Icon name="edit" style={{height: 24, width: 24}}/>
                                                </IconButton>
                                            </TableCell>
                                            </>
                                    </ TableRow>
                                )
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            )}
            </>
        )
    }

    function ConfirmContent(){
        return (
            <>
                <Typography>Please note that by clicking Cofirm, you are updating all information on file as accurate and up to date. Please review the information on file before confirming. </Typography>
            </>
        )
    }


    return (
        <div className={classes.root}>
            {contactData && (
                <div className={classnames(standardSpacingClasses, classes.grid2Definition)}>
                    <div className="phoneTitle" align="center">
                        Phone
                    </div>
                    <div className="addressTitle" align="center">
                        Address
                    </div>
                    <div className="emailTitle" align="center">
                        Email
                    </div>
                    <IconButton onClick={() => setPhoneOpen(true)} className="phoneIcon">
                        <Icon name="mobile" style={{height: '40px', width: '40px'}}/>
                    </IconButton>
                    <IconButton onClick={() => setAddressOpen(true)} className="addressIcon" align="center">
                        <Icon name="home" style={{height: '40px', width: '40px'}}/>
                    </IconButton>
                    <IconButton onClick={() => setEmailOpen(true)} className="emailIcon" align="center">
                        <Icon name="email" style={{height: '40px', width: '40px'}}/>
                    </IconButton>
                    <div className="phoneStatus" align="center">
                        Status <br />
                        <Tooltip
                            id="phoneStatusTooltip"
                            title={phoneStatusMessage}
                            placement="bottom-end"
                            >
                                <Icon name={phoneStatusIcon} style={{color: phoneStatusText, backgroundColor: phoneStatusBackgroundColor, height: '24px', width: '24px'}}/>
                        </Tooltip>
                    </div>
                    <div className="addressStatus" align="center" >
                        Status <br />
                        <Tooltip
                            id="addressStatusTooltip"
                            title={addressStatusMessage}
                            placement="bottom"
                            >
                            <Icon name={addressStatusIcon} style={{color: addressStatusText, backgroundColor: addressStatusBackgroundColor, height: '24px', width: '24px'}}/>
                        </Tooltip>
                    </div>
                    <div className="emailStatus" align="center">
                        Status <br />
                        <Tooltip
                            id="emailStatusTooltip"
                            title={emailStatusMessage}
                            placement="bottom-start"
                            >
                            <Icon name={emailStatusIcon} style={{color: emailStatusText, backgroundColor: emailStatusBackgroundColor, height: '24px', width: '24px'}}/>
                         </Tooltip>
                    </div>
                    <div className="buttonGroup" align="center">
                    <ButtonGroup>
                        <Button onClick={() => setConfirmOpen(true)} color="secondary">
                            Confirm All
                        </Button>
                        <Button onClick={onUpdateClick}>
                            Update
                        </Button>
                    </ButtonGroup>
                    </div>
                    <div className="phoneDialog">
                        <ConfirmationDialog
                            open={phoneOpen}
                            primaryActionOnClick={() => console.log('primary action clicked')}
                            primaryActionText="Confirm"
                            secondaryActionOnClick={() => setPhoneOpen(false)}
                            secondaryActionText="Cancel"
                            title="Confirm phone information?"
                            content={(<PhoneContent />)}
                            contentText="Click Confirm if the phone information below is accurate as of today. Click Edit to update phone information."
                        />
                    </div>
                    <div className="addressDialog">
                        <ConfirmationDialog
                            open={addressOpen}
                            primaryActionOnClick={() => console.log('primary action clicked')}
                            primaryActionText="Confirm"
                            secondaryActionOnClick={() => setAddressOpen(false)}
                            secondaryActionText="Cancel"
                            title="Confirm address information?"
                            content={(<AddressContent />)}
                            contentText="Click Confirm if the address(es) below is/are accurate as of today. Click Edit to update address information."
                        />
                    </div>
                    <div className="emailDialog">
                        <ConfirmationDialog
                            open={emailOpen}
                            primaryActionOnClick={() => console.log('primary action clicked')}
                            primaryActionText="Confirm"
                            secondaryActionOnClick={() => setEmailOpen(false)}
                            secondaryActionText="Cancel"
                            title="Confirm email information?"
                            content={(<EmailContent />)}
                            contentText="Click Confirm if the email address(es) below is/are accurate as of today. Click Edit to update email information."
                        />
                    </div>
                    <div className="confirmDialog">
                        <ConfirmationDialog
                            open={confirmOpen}
                            primaryActionOnClick={onConfirmClick}
                            primaryActionText="Confirm All"
                            secondaryActionOnClick={() => setConfirmOpen(false)}
                            secondaryActionText="Cancel"
                            title="Confirm all information?"
                            content={(<ConfirmContent />)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

ContactInformationWidget.propTypes = {
    classes: PropTypes.object.isRequired
};

const ContactInformationWithStyle = withStyles(styles)(ContactInformationWidget);

function ContactInformationWithProviders(){
    return (
        <ContactInformationProvider>
            <ContactInformationWithStyle />
        </ContactInformationProvider>
    )
}

export default ContactInformationWithProviders;