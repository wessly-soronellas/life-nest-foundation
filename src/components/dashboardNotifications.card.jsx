import React from 'react';
import PropTypes from 'prop-types';
import {
    HeaderBar,
    HeaderBarDropdown,
    HeaderBarLogo,
    HeaderBarItem,
    HeaderUtilityBar,
    IconButton,
    Typography,
    FormControlLabel,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup
} from '@ellucian/react-design-system/core';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { Icon } from '@ellucian/ds-icons/lib';
import { widthFluid } from '@ellucian/react-design-system/core/styles/tokens';

const styles = (theme) => ({
    // NOTE This custom CSS below is added purely for the demo.
    // DO NOT use these styles in your app.
    // Each App will ONLY have a single header bar. We have two.
    // One for our demo app navigation and the other for the heade-rbar component demo.
    headerBarCustomTempClass: {

    },
    // Page content class
    pageContent: {

    }
});

const customId = 'SimpleHeaderBarExample';
const menuItems1 = [
    {label: 'Degree Requirements', value: 'DegreeRequirements'},
    {label: 'What If?', value: 'whatif'},
    {label: 'Inquire', value: 'Inquire'},
    {label: 'Apply to School', value: 'apply'}
];



class Example extends React.Component {
    state = {
        activeItem: null,
        pageContent: "Page Content of 'Link 1'"};

    onMenuItemClick = (e, item) => this.setState({pageContent: `Page Content of '${item.label}'`});
    onAnchorClick = (label) => this.setState({pageContent: `Page Content of '${label}'`});

    setActiveItem = item => event => {

        const {checked} = event.target;

        if (checked && this.state.activeItem !== item) {
            this.setState({activeItem: item});
        }
    };

    activeItemSelected = (item) => {
        this.setState({activeItem: item.props.itemKey});
    };

    isItemSelected = (itemKey) => {
        return itemKey === this.state.activeItem;
    };

    handleSearch = (searchText) => {
        this.setState({pageContent: `Search for '${searchText}'`});
    };


    render() {
        const { classes } = this.props;

        const profileItems = [
            {value: 'profileItem1', label: 'Item 1'},
            {value: 'profileItem2', label: 'Item 2'},
            {value: 'profileItem3', label: 'Item 3'}
        ];

        return (
            <div id={`${customId}_Container`} className={classes.root}>

                <div className={classes.headerBarCustomTempClass}>
                    <HeaderBar
                        position="static"
                        id={`${customId}_HeaderBar`}
                        responsiveType="small"
                        showSearch={false}
                        onSearch={this.handleSearch}
                        onActiveItemChanged={this.activeItemSelected.bind(this)}
                    >

                        <HeaderBarItem id={`${customId}_HeaderBarItem4`} itemKey="dropdownmenu1" active={this.isItemSelected('dropdownmenu1')}>
                            <HeaderBarDropdown onMenuItemClick={this.onMenuItemClick.bind(this)}
                                menuItems={menuItems1}
                                dropdownMenuLabel={'Dropdown Menu 1'}
                            />
                        </HeaderBarItem>

                    </HeaderBar>

                    <Typography id={`${customId}_PageContent`}
                        className={classes.pageContent}
                        variant="h1"
                        gutterBottom align="center">
                        {this.state.pageContent}
                    </Typography>
                </div>
            </div>
        );
    }
}

Example.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Example);
