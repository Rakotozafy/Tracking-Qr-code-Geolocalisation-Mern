/*eslint-disable*/
import { useEffect, React } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
// import {filtrer,filtre} from 'components/Navbars/AdminNavbarLinks'
// import { useSelector } from 'react-redux';

import Produit from './Produit';
import useStyles from './styles';


import { useSelector, useDispatch } from 'react-redux';

//Actions 
import { getProduits as listProduits } from 'redux/actions/produitActions';



const CartProduits = ({ setCurrentId, filtrer, filtre }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const getProduits = useSelector(state => state.getProduits)
    const { produits, loading, error } = getProduits

    useEffect(() => {
        dispatch(listProduits())
    }, [dispatch])



    return (
        loading ? <CircularProgress /> : error ? (<h2> {error} </h2>) : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>

                {(filtre ? filtrer : produits).map((produit) => (
                    <Grid item xs={12} sm={12} md={6} lg={3}>

                        <Produit produit={produit} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};
export default CartProduits;

