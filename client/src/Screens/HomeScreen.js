/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper, Input } from '@material-ui/core';

import CartProduits from 'components/produit/CartProduits';
// import Pagination from '../Pagination';
import useStyles from './styles';
import ProduitScreen from './ProduitScreen';

//

import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProduitDetails } from '../redux/actions/produitActions';
import { addToCart } from '../redux/actions/cartActions';

//produit liste
import { getProduits as listProduits } from 'redux/actions/produitActions';


const HomeScreen = (match, history) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    //Recherche 

    //produits
    const [filtre, setFiltre] = useState(false)
    const [filtrer, setFiltrer] = useState(false)
    const getProduits = useSelector(state => state.getProduits)
    const { produits } = getProduits

    // useEffect(() => {
    //     dispatch(listProduits())
    // }, [dispatch])


    const rechercher = input => {
        let fullProduit = produits.flat()
        let results = fullProduit.filter(item => {
            const nom = item.nom_prod.toLowerCase()
            const term = input.toLowerCase()
            return nom.indexOf(term) > -1
        })
        setFiltrer(results)
    }


    //farany recherche

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>

                        <CartProduits filtre={filtre} filtrer={filtrer} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Input type="text"
                            inputProps={{
                                placeholder: "Rechercher produit",
                                inputProps: {
                                    "aria-label": "Rechercher produit",
                                },
                            }}
                            onChange={(e) => {
                                setFiltre(e.target.value.length > 0)
                                rechercher(e.target.value)

                            }}

                        >

                        </Input>
                       

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default HomeScreen;

