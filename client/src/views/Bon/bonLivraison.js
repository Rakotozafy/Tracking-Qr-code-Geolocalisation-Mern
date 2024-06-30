/*eslint-disable*/
import React from 'react';
import useStyles from 'styles.js';
import BLivraison from 'components/BLivraison/BLivraison';

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

export default function bonLivraison() {
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit" >
                <Typography className={classes.heding} variant="h4" align="center"  > Bon de livraison</Typography>
            </AppBar>
            <BLivraison />

        </div>
    )
}