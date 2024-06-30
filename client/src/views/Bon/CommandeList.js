/*eslint-disable*/
import React from 'react';
import useStyles from 'styles.js';
import BCommande from 'components/BCommande/CommandeList';


import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

export default function bonCommande() {
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit" >
                <Typography className={classes.heding} variant="h4" align="center"  > Bon de commande</Typography>
            </AppBar>
            <BCommande />

        </div>
    )
}