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
    spacingInsetTall20,
    spacingInsetTall30,
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
 import { useCardInfo,  useExtensionControl} from '@ellucian/experience-extension/extension-utilities';
 import { ContactInformationProvider, useContactInformation } from '../context/contact-info.context';


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
});


function ContactInfo(props) {
    const {classes} = props;
    // Experience SDK hooks
    const { setErrorMessage, setLoadingStatus } = useExtensionControl();
    const { configuration, cardConfiguration } = useCardInfo();
    const standardSpacingClasses= getSpacingStyles({
        outerSpacing: true,
        spacing: 'standard'
    }, spacingType.LAYOUT);
    const {data: contactData, isLoading: contactLoading, isError: contactIsError, error: contactError} = useContactInformation();


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
    const [phoneSelected, setPhoneSelected] = useState(false);
    const [addressSelected, setAddressSelected] = useState(false);
    const [emailSelected, setEmailSelected] = useState(false);


    useEffect(() => {
        setLoadingStatus(contactLoading);
    }, [contactLoading])

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

    return (
        <div>
            <div className={classnames(standardSpacingClasses, classes.grid1Definition)}>
                    <div className="section1" align="center">
                        section1
                        <Card>
                            Name
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

ContactInfo.propTypes = {
    classes: PropTypes.object.isRequired
};

const ContactInformationWithStyle = withStyles(styles)(ContactInfo);

function ContactInformationWithProviders(){
    return (
        <ContactInformationProvider>
            <ContactInformationWithStyle />
        </ContactInformationProvider>
    )
}

export default ContactInformationWithProviders;