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
    colorCtaBlueTint,
    colorBrandNeutral200,
    colorBackgroundAlertError,
    colorBackgroundAlertSuccess,
    fontSizeHeader1,
    fontSizeHeader4,
    fontSizeHeader5,
    borderRadiusCircle,
    colorBackgroundDefault,
    colorTextNeutral250,
    layout10
 } from '@ellucian/react-design-system/core/styles/tokens';
 import { useCardControl, useCardInfo, useExtensionControl, useUserInfo } from '@ellucian/experience-extension/extension-utilities';
 import { ContactInformationProvider, useContactInformation } from '../context/contact-info.context';


 const styles = theme => ({
    root: {
        height: heightFluid,
        width: widthFluid,
        padding: spacingInset20,
        backgroundColor: colorFillLogoPreferred
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
            width: "75%",
            margin: "auto"
        },
        '& .addressStatus': {
            gridColumn: '2 / span 1',
            fontFamily: fontFamilyHeader,
            fontSize: fontSizeHeader5,
            width: "75%",
            margin: "auto"
        },
        '& .emailStatus': {
            gridColumn: '3 / span 1',
            fontFamily: fontFamilyHeader,
            fontSize: fontSizeHeader5,
            width: "75%",
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
    const {data: contactData, isLoading: contactLoading, isError: contactIsError, error: contactError} = useContactInformation();
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: false,
        spacing: 'none'
    }, spacingType.LAYOUT);

    // Hooks to separate contact information
    const [phoneData, setPhoneData] = useState();
    const [addressData, setAddressData] = useState();
    const [emailData, setEmailData] = useState();

    // Hooks to determine status for contact information
    const [phoneStatusText, setPhoneStatusText] = useState(colorTextAlertSuccess);
    const [addressStatusText, setAddressStatusText] = useState(colorTextAlertSuccess);
    const [emailStatusText, setEmailStatusText] = useState(colorTextAlertSuccess);
    const [phoneStatusBackgroundColor, setPhoneStatusBackgroundColor] = useState(colorBackgroundAlertSuccess);
    const [addressStatusBackgroundColor, setAddressStatusBackgroundColor] = useState(colorBackgroundAlertSuccess);
    const [emailStatusBackgroundColor, setEmailStatusBackgroundColor] = useState(colorBackgroundAlertSuccess);
    const [phoneStatusIcon, setPhoneStatusIcon] = useState("check-feedback");
    const [addressStatusIcon, setAddressStatusIcon] = useState("check-feedback");
    const [emailStatusIcon, setEmailStatusIcon] = useState("check-feedback");

    // Hooks to open/close confirmation diologs
    const [phoneOpen, setPhoneOpen] = useState(false);
    const [addressOpen, setAddressOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Hooks to determine what information (Phone, Address, Email, or all of them) to confirm in CompleteContentComponent
    const [phoneChecked, setPhoneChecked] = useState(false);
    const [addressChecked, setAddressChecked] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);

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
    }, [contactIsError, contactError, setErrorMessage]);

    const onConfirmClick = useCallback(() => {
        // open the page
        navigateToPage({route: '/contact'});
    }, [navigateToPage]);

    // Confirmation Dialog section (PhoneContent, AddressContent, EmailContent, and CompleteContent)
    function PhoneContent(){
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>404-444-5555</TableCell>
                        <TableCell>Sample</TableCell>
                        <TableCell>
                            <IconButton onClick={() => window.open('https://eaglenet.life.edu/Student/UserProfile')}>
                                <Icon name="edit"/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }

    function AddressContent(){
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Preferred</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>10247 Highway 92</TableCell>
                        <TableCell>Sample</TableCell>
                        <TableCell>
                            <Icon name="check" />
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={() => window.open('https://eaglenet.life.edu/Student/UserProfile')}>
                                <Icon name="edit"/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }

    function EmailContent(){
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Preferred</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>wesssly.soronellas@life.edu</TableCell>
                        <TableCell>Sample</TableCell>
                        <TableCell>
                            <Icon name="check" />
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={() => window.open('https://eaglenet.life.edu/Student/UserProfile')}>
                                <Icon name="edit"/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }

    function CompleteContent(){
        const handleClick = () => console.log("handleClick was clicked");

        return (
            <div className={classnames(standardSpacingClasses, classes.completeConfirmGridDefinition)}>
                <div className="phoneTitle">
                    Phone Information
                </div>
                <div className="addressTitle">
                    Address Information
                </div>
                <div className="emailTitle">
                    Email Information
                </div>
                <div className="phoneContent">
                    <PhoneContent />
                </div>
                <div className="addressContent">
                    <AddressContent />
                </div>
                <div className="emailContent">
                    <EmailContent />
                </div>
                <div className="phoneChecked">
                    <Typography id="phone_checkbox_label" style={{display: 'inline-block'}}>
                        confirm phone
                    </Typography>
                    <Checkbox
                        inputProps={{
                            'aria-labelledby': 'email_checkbox_label'
                        }}
                        checked={phoneChecked}
                        onChange={() => setPhoneChecked(!phoneChecked)}
                        value={`${phoneChecked}`}
                    />
                </div>
                <div className="addressChecked">
                    <Typography id="address_checkbox_label" style={{display: 'inline-block'}}>
                        confirm address
                    </Typography>
                    <Checkbox
                        inputProps={{
                            'aria-labelledby': 'address_checkbox_label'
                        }}
                        checked={addressChecked}
                        onChange={() => setAddressChecked(!addressChecked)}
                        value={`${addressChecked}`}
                    />
                </div>
                <div className="emailChecked">
                    <Typography id="email_checkbox_label" style={{display: 'inline-block'}}>
                        confirm email
                    </Typography>
                    <Checkbox
                        inputProps={{
                            'aria-labelledby': 'email_checkbox_label'
                        }}
                        checked={emailChecked}
                        onChange={() => setEmailChecked(!emailChecked)}
                        value={`${emailChecked}`}
                    />
                </div>
            </div>
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
                        Status <br /><Icon name={phoneStatusIcon} style={{color: phoneStatusText, backgroundColor: phoneStatusBackgroundColor, height: '24px', width: '24px'}}/>
                    </div>
                    <div className="addressStatus" align="center" >
                        Status <br /><Icon name={addressStatusIcon} style={{color: addressStatusText, backgroundColor: addressStatusBackgroundColor, height: '24px', width: '24px'}}/>
                    </div>
                    <div className="emailStatus" align="center">
                        Status <br /> <Icon name={emailStatusIcon} style={{color: emailStatusText, backgroundColor: emailStatusBackgroundColor, height: '24px', width: '24px'}}/>
                    </div>
                    <div className="buttonGroup" align="center">
                    <ButtonGroup>
                        <Button onClick={onConfirmClick} color="secondary">
                            Confirm
                        </Button>
                        <Button >
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