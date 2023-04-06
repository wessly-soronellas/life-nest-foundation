/* eslint-disable @calm/react-intl/missing-formatted-message */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Tabs,
    Tab,
    SelectionMenu,
    SelectionMenuItem,
    Typography
} from '@ellucian/react-design-system/core';
import {
    Icon
} from '@ellucian/ds-icons/lib';
import {
 } from '@ellucian/react-design-system/core/styles/tokens';
import PasswordWidget from '../components/pwdExpiry.card';
import MealPlanWidget from '../components/mealPlan.card';
import ContactInfoWidget from '../components/contactInfo.card';
import AccountBalanceWidget from '../components/accountDetail.card';

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
    const [defaultOpen, setDefaultOpen] = useState(false);
    const [componentOpen, setComponentOpen] = useState('');

    const handlePasswordClick = () => setComponentOpen('password');
    const handleMealClick = () => setComponentOpen('meal');
    const handleContactClick = () => setComponentOpen('contact');
    const handleAccountClick = () => setComponentOpen('account');

    useEffect(() => {
        switch(componentOpen){
            case 'password':
                setPwdOpen(true);
                setMealOpen(false);
                setContactOpen(false);
                setAccountOpen(false);
                setDefaultOpen(false);
                break;
            case 'meal':
                setPwdOpen(false);
                setMealOpen(true);
                setContactOpen(false);
                setAccountOpen(false);
                setDefaultOpen(false);
                break;
            case 'contact':
                setPwdOpen(false);
                setMealOpen(false);
                setContactOpen(true);
                setAccountOpen(false);
                setDefaultOpen(false);
                break;
            case 'account':
                setPwdOpen(false);
                setMealOpen(false);
                setContactOpen(false);
                setAccountOpen(true);
                setDefaultOpen(false);
                break;
            default:
                setDefaultOpen(true);
                setMealOpen(false);
                setPwdOpen(false);
                setContactOpen(false);
                setAccountOpen(false);

        }
    }, [componentOpen]);

    const selectionItems = [
        {
            key: 'password',
            content: (
                <Typography>
                    <Icon name="lock" /> Password Expiration
                </Typography>
            ),
            label: 'Password',
            handleClick: handlePasswordClick
        },
        {
            key: 'meal',
            content: (
                <Typography><Icon name="dining" /> Meal Plan </Typography>
            ),
            label: 'Meal Plan',
            handleClick: handleMealClick
        },
        {
            key: 'account',
            content: (
                <Typography>
                    <Icon name="institution" /> Account Balance
                </Typography>
            ),
            label: 'Account Balance',
            handleClick: handleAccountClick
        },
        {
            key: 'contact',
            content: (
                <Typography>
                    <Icon name="address-card" /> Contact Information
                </Typography>
            ),
            label: 'Contact Info',
            handleClick: handleContactClick
        }
    ];




    const onTabClick = (e, value) => {
        if (value !== 'dropdown') {
            setComponentOpen(value);
        }
    };


    return (
        <>
            <div id='header-container' className={classes.root}>
                    <Tabs
                        onChange={onTabClick}
                        scrollButtons={true}
                        scrollButtonsOnMobile={true}
                        variant='card'

                    >
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
                {defaultOpen && (<><PasswordWidget /></>)}
                {pwdOpen && (<><PasswordWidget /></>)}
                {mealOpen && (<><MealPlanWidget /></>)}
                {contactOpen && (<><ContactInfoWidget /></>)}
                {accountOpen && (<><AccountBalanceWidget /></>)}
            </div>
        </>
    );
}

FullWidthGrid.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullWidthGrid);