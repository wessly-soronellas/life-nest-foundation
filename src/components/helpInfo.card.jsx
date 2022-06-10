import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
    IconButton,
    NotificationBadge,
    Tooltip
} from '@ellucian/react-design-system/core';
import {Icon} from '@ellucian/ds-icons/lib';
import {
    spacingInset10,
    heightFluid,
    widthFluid,
    borderRadiusSmall,
    colorFillLogoPreferred
 } from '@ellucian/react-design-system/core/styles/tokens';


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


function HelpWidget(props) {
    const {classes} = props;

    return (
        <div className={classes.root}>
            <IconButton aria-label="Calendar 23 new events" color="gray">
                <Icon name="help" id="calendar2" style={{ width: 24, height: 24 }} />
            </IconButton>
        </div>
    );
}

HelpWidget.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HelpWidget);