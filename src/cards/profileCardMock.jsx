import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Card,
    Grid,
    Tabs,
    Tab,
    SelectionMenu,
    SelectionMenuItem,
    Typography,
    IconButton,
    NotificationBadge,
    Tooltip,
    HeaderBar,
    HeaderBarItem,
    HeaderBarDropdown,
    HeaderUtilityBar,
    HeaderBarLogo,
    MegaMenu
} from '@ellucian/react-design-system/core';
import {
    IconSprite,
    Icon
} from '@ellucian/ds-icons/lib'
import {
    spacing40,
    spacingInset20,
    widthFluid
} from '@ellucian/react-design-system/core/styles/tokens';

import PasswordWidget from '../components/pwdExpiry.card';
import MealPlanWidget from '../components/mealPlan.card';
import ContactInfoWidget from '../components/contactInfo.card';
import AccountBalanceWidget from '../components/accountDetail.card';
import HelpWidget from '../components/helpInfo.card';
import DashboardNotificationsWidget from '../components/dashboardNotifications.card';

const styles = theme => ({
    root: {
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
    const [navOpen, setNavOpen] = useState(false);
    const [componentOpen, setComponentOpen] = useState('');
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [tabSelected, setTabSelected] = useState();

    const containerRef = useRef(null);

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

    const megaMenuItems = [
        {
            key: 'meal',
            content: (
                <NotificationBadge badgeContent={24}>
                    <Icon name="dining" />
                </NotificationBadge>
            ),
            label: 'Meal Plan'
        },
        {
            key: 'password',
            content: (
                <NotificationBadge badgeContent={24}>
                    <Icon name="lock" />
                </NotificationBadge>
            ),
            label: 'Password'
        },
        {
            key: 'account',
            content: (
                <NotificationBadge badgeContent={true}>
                    <Icon name="institution" />
                </NotificationBadge>
            ),
            label: 'Account Balance'
        },
        {
            key: 'contact',
            content: (
                <NotificationBadge badgeContent={true}>
                    <Icon name="address-card" />
                </NotificationBadge>
            ),
            label: 'Contact Info'
        }
    ];

    const selectionItems = [
        {
            key: 'meal',
            content: (
                <NotificationBadge badgeContent={24}>
                    <Icon name="dining" />
                </NotificationBadge>
            ),
            label: 'Meal Plan',
            handleClick: handleMealClick
        },
        {
            key: 'password',
            content: (
                <NotificationBadge badgeContent={24}>
                    <Icon name="lock" />
                </NotificationBadge>
            ),
            label: 'Password',
            handleClick: handlePasswordClick
        },
        {
            key: 'account',
            content: (
                <NotificationBadge badgeContent={true}>
                    <Icon name="institution" />
                </NotificationBadge>
            ),
            label: 'Account Balance',
            handleClick: handleAccountClick
        },
        {
            key: 'contact',
            content: (
                <NotificationBadge badgeContent={true}>
                    <Icon name="address-card" />
                </NotificationBadge>
            ),
            label: 'Contact Info',
            handleClick: handleContactClick
        }
    ];




    const onTabClick = (e, value) => {
        console.log("e", e);
        console.log("value", value);
        if (value !== 'dropdown') {
            setComponentOpen(value);
        }
    };


    return (
        <div>
            <div id='header-container' className={classes.root}>
                    <Tabs
                        onChange={onTabClick}
                        scrollButtons={true}
                        scrollButtonsOnMobile={true}
                        variant='card'

                    >
                        {megaMenuItems.map(item => (
                            <Tab
                                key={item.key}
                                label={item.label}
                                value={item.key}
                            />
                        ))}
                        <Tab
                            value='dropdown'
                            label={<SelectionMenu>
                                {selectionItems.map(item => (
                                    <SelectionMenuItem
                                        key={item.key}
                                        value={item.key}
                                        onClick={item.handleClick}
                                    >
                                        {item.content}
                                    </SelectionMenuItem>
                                ))}
                            </SelectionMenu>}
                            id='select'
                        />
                    </Tabs>
            </div>
            <div>
                {defaultOpen && (<>defaultOpen</>)}
                {pwdOpen && (<><PasswordWidget /></>)}
                {mealOpen && (<><MealPlanWidget /></>)}
                {contactOpen && (<><ContactInfoWidget /></>)}
                {accountOpen && (<><AccountBalanceWidget /></>)}
            </div>
        </div>
    );
}

FullWidthGrid.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullWidthGrid);