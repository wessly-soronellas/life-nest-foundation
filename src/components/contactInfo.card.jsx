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
    IconButton
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
        gridTemplateRows: '1fr auto 1fr auto',
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
        '& .confirmButton': {
            gridColumn: '1 / span 1',
            width: "100%",
            margin: "auto",
            marginTop: "8px"
        },
        '& .editButton': {
            gridColumn: '3 / span 1',
            width: "100%",
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
        outerSpacing: true,
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

    const onTransactionsClick = useCallback(() => {
        // open the page
        navigateToPage({route: '/'});
    }, [navigateToPage])

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
                    <IconButton onClick={() => console.log("clicked")} className="phoneIcon">
                        <Icon name="mobile" style={{height: '40px', width: '40px'}}/>
                    </IconButton>
                    <IconButton className="addressIcon" align="center">
                        <Icon name="home" style={{height: '40px', width: '40px'}}/>
                    </IconButton>
                    <IconButton className="emailIcon" align="center">
                        <Icon name="email" style={{height: '40px', width: '40px'}}/>
                    </IconButton>
                    <div className="phoneStatus" align="center">
                        Status <br /><Icon name="check-feedback" style={{color: phoneStatusText, backgroundColor: phoneStatusBackgroundColor, height: '24px', width: '24px'}}/>
                    </div>
                    <div className="addressStatus" align="center" >
                        Status <br /><Icon name="check-feedback" style={{color: addressStatusText, backgroundColor: addressStatusBackgroundColor, height: '24px', width: '24px'}}/>
                    </div>
                    <div className="emailStatus" align="center">
                        Status <br /> <Icon name="check-feedback" style={{color: emailStatusText, backgroundColor: emailStatusBackgroundColor, height: '24px', width: '24px'}}/>
                    </div>
                    <div className="confirmButton" align="right">
                        <Button fluid>
                            Confirm
                        </Button>
                    </div>
                    <div className="editButton" align="left">
                        <Button color="secondary" fluid>
                            Edit
                        </Button>
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