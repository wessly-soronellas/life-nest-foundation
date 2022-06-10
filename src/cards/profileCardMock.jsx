import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Card,
    Grid,
    Typography,
    IconButton,
    NotificationBadge,
    Tooltip
} from '@ellucian/react-design-system/core';
import {
    IconSprite,
    Icon
} from '@ellucian/ds-icons/lib'
import {
    spacing40,
    spacingInset20
} from '@ellucian/react-design-system/core/styles/tokens';

import PasswordWidget from '../components/pwdExpiry.card';
import MealPlanWidget from '../components/mealPlan.card';
import ContactInfoWidget from '../components/contactInfo.card';
import AccountBalanceWidget from '../components/accountDetail.card';
import HelpWidget from '../components/helpInfo.card';

const styles = theme => ({
    root: {
        padding: spacing40
    },
    card: {
        color: theme.palette.text.secondary
    }
});

function FullWidthGrid(props)  {
    const { classes } = props;
    const [pwdOpen, setPwdOpen] = useState(false);
    const [mealOpen, setMealOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [defaultOpen, setDefaultOpen] = useState(false);
    const [componentOpen, setComponentOpen] = useState('');

    const handlePasswordClick = () => setComponentOpen('password')
    const handleMealClick = () => setComponentOpen('meal')
    const handleContactClick = () => setComponentOpen('contact')
    const handleAccountClick = () => setComponentOpen('account')
    const handleHelpClick = () => setComponentOpen('help')

    useEffect(() => {
        switch(componentOpen){
            case 'password':
                setPwdOpen(true);
                setMealOpen(false);
                setContactOpen(false);
                setAccountOpen(false);
                setHelpOpen(false);
                setDefaultOpen(false);
                break;
            case 'meal':
                setPwdOpen(false);
                setMealOpen(true);
                setContactOpen(false);
                setAccountOpen(false);
                setHelpOpen(false);
                setDefaultOpen(false);
                break;
            case 'contact':
                setPwdOpen(false);
                setMealOpen(false);
                setContactOpen(true);
                setAccountOpen(false);
                setHelpOpen(false);
                setDefaultOpen(false);
                break;
            case 'account':
                setPwdOpen(false);
                setMealOpen(false);
                setContactOpen(false);
                setAccountOpen(true);
                setHelpOpen(false);
                setDefaultOpen(false);
                break;
            case 'help':
                setPwdOpen(false);
                setMealOpen(false);
                setContactOpen(false);
                setAccountOpen(false);
                setHelpOpen(true);
                setDefaultOpen(false);
                break;
            default:
                setDefaultOpen(true);
                setMealOpen(false);
                setPwdOpen(false);
                setContactOpen(false);
                setAccountOpen(false);
                setHelpOpen(false);

        }
    }, [componentOpen]);


    return (
        <div className={classes.root}>
                <Grid container direction="row" spacing={1}>
                    <Grid xs={2} direction="column" alignItems="baseline" justify="space-evenly">
                        <Grid item >
                            <Tooltip id="password-expiration" title="Password Expiration" placement="left-start">
                                <IconButton id="password" onClick={handlePasswordClick} aria-label="Password Expiration" color="gray">
                                    <NotificationBadge>
                                        <Icon name="lock" id="passwordExpiration" style={{ width: 24, height: 24 }} />
                                    </NotificationBadge>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item  >
                            <Tooltip id="meal-plan-information" title="Meal Plan Information" placement="left-start">
                                <IconButton onClick={handleMealClick} aria-label="Meal Plan Information" color="gray">
                                    <Icon name="dining" id="mealPlanInformation" style={{ width: 24, height: 24 }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item >
                            <Tooltip id="contact-information" title="Contact Information" placement="left-start">
                                <IconButton onClick={handleContactClick} aria-label="Contact Information" color="gray">
                                    <NotificationBadge>
                                        <Icon name="address-card" id="contactInformation" style={{ width: 24, height: 24 }} />
                                    </NotificationBadge>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item >
                            <Tooltip id="financial-information" title="Financial Information" placement="left-start">
                                <IconButton onClick={handleAccountClick} aria-label="Financial Information" color="gray">
                                    <NotificationBadge>
                                        <Icon name="institution" id="financialInformation" style={{ width: 24, height: 24 }} />
                                    </NotificationBadge>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item >
                            <Tooltip id="help-widget" title="Help" placement="left-start">
                                <IconButton onClick={handleHelpClick} aria-label="Help" color="gray">
                                    <Icon name="help" id="help" style={{ width: 24, height: 24 }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid xs={10} direction="column">
                        <Grid item>
                            <Card>
                                {pwdOpen && (<><PasswordWidget /></>)}
                                {mealOpen && (<><MealPlanWidget /></>)}
                                {contactOpen && (<><ContactInfoWidget /></>)}
                                {accountOpen && (<><AccountBalanceWidget /></>)}
                                {helpOpen && (<><HelpWidget /></>)}
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <br />
        </div>
    );
}

FullWidthGrid.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullWidthGrid);