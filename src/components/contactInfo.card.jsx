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
    Typography,
    IconButton,
    NotificationBadge,
    StatusLabel,
    Tooltip,
    Table,
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
 import { ContactInformationProvider, useContactInformation } from '../context/contact-info.context';


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
    const {data: contactData, isLoading: contactLoading, isError: contactIsError, error: contactError} = useContactInformation();

    // create shape for caraousel
    /*
        index order:
        0 - profile information
        1 - contact information
        2 - status information

    */
    const contactInformationShape = [
        {
            preferredName: "",
            pronouns: "",
            gender: "",
            birthdate: "",
            studentNumber: ""

        },
        {
            addresses: [],
            phones: [],
            emails: []

        },
        {
            daysSince: {
                address: "",
                phone: "",
                email: ""
            },
            addressDate: "",
            emailDate:"",
            phoneDate:"",
            lastUpdated:""
        }
    ]

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
                {contactData && (
                    <div>
                        <h3>Contact Information</h3>
                        <Table>
                            <TableRow>
                                <TableCell>
                                    <Typography>
                                        Address:
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <StatusLabel
                                        text={(contactData.daysSince.daysSinceAddressConfirmed < 180 ) ? "OKAY" : "UPDATE"}
                                        type={(contactData.daysSince.daysSinceAddressConfirmed < 180 ) ? "success" : "error"}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography>
                                        Phone:
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <StatusLabel
                                        text={(contactData.daysSince.daysSincePhoneConfirmed < 180 ) ? "OKAY" : "UPDATE"}
                                        type={(contactData.daysSince.daysSincePhoneConfirmed < 180 ) ? "success" : "error"}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography>
                                        Email:
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <StatusLabel
                                        text={(contactData.daysSince.daysSinceEmailConfirmed < 180 ) ? "OKAY" : "UPDATE"}
                                        type={(contactData.daysSince.daysSinceEmailConfirmed < 180 ) ? "success" : "error"}
                                    />
                                </TableCell>
                            </TableRow>
                        </Table>
                        <Button>
                            Confirm Information
                        </Button>
                    </div>
                )}
            </div>
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