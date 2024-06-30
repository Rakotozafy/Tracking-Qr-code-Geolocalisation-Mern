/*eslint-disable*/
import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';

import { useDispatch } from 'react-redux';
import { useHistory , Link } from 'react-router-dom';
import Elec from "assets/img/Elec.PNG";
import Eau from "assets/img/Eau.PNG";

import useStyles from './style';

const Produit = ({ produit }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const userId = user?.result.googleId || user?.result?._id;


    const openProduit = (e) => {
        history.push(`/client/produitScreen/${produit._id}`);
    };

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
                component="span"
                name="test"
                className={classes.cardAction}
                onClick={openProduit}
            >
                <CardMedia className={classes.media} image={produit.type_prod === 'Eau' ? Eau : Elec} title={produit.nom_prod}/>
                <div className={classes.overlay}>
                    <Typography variant="h6">{produit.nom_prod}</Typography>
                    <Typography variant="body2">{produit.ref_prod}</Typography>
                </div>

                <div className={classes.details}>
                    
                    <Typography className={classes.title} gutterBottom variant="h5" component="h2">Type: {produit.type_prod}</Typography>
                </div>
                <CardContent>
                    <Typography variant="h6" color="textSecondary" component="p">{produit.etat_stock}</Typography>
                    <Typography variant="h5">{produit.unite_prod}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Link to={`/client/produitScreen/${produit._id}`} color="secondary" >
                    Ajouter
                </Link>
            </CardActions>
        </Card>
    );
};

export default Produit;
