/*eslint-disable*/
import { React, useEffect, useState } from 'react';
import CartItem from 'components/produit/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Container, AppBar, Grow, Grid, Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core/';
import useStyles from './style';
import "./CartScreen.css"
import { addToCart, removeFromCart } from 'redux/actions/cartActions';

import { createCommande } from 'redux/actions/commandeActions'
import { useHistory } from 'react-router-dom';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
// @material-ui/icons
import Back from "@material-ui/icons/ArrowBackIos"

const CartScreen = () => {

  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();

  const dispatch = useDispatch()


  const cart = useSelector((state) => state.cart);
  
  const { cartItems } = cart;

  const qteChange = (id, qte) => {
    dispatch(addToCart(id, qte))
  }

  const remove = (id) => {
    dispatch(removeFromCart(id))
  }

  const count = () => {
    return cartItems.reduce((qte, item) => Number(item.qte) + qte, 0)
  }




  const [commandeData, setCommandeData] = useState();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createCommande({ ...commandeData, adresse: user?.result?.adresse_magasinier , magasin: user?.result?.magasin, nom: user?.result?.name, produits: cartItems, }, history));
    } 
    // else {
    //   dispatch(updateCommande(currentId, { ...commandeData, adresse: user?.result?.password, magasin: user?.result?.email, nom: user?.result?.name, produits: cartItems, }));

    // }
  };

  const retour = (e) => {

    history.push('produitList');
  }

  return (

    <div className="cartscreen" >

      <Container maxWidth="xl">
        <AppBar className={classes.appBar} position="static" color="inherit" >
          <Typography className={classes.heding} variant="h2" align="center"  > Panier</Typography>

          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="strect">

                <GridItem xs={12} sm={7}>
                  <Card>
                    <CardHeader color="info" stats icon>
                      <CardIcon color="info" onClick={retour} >
                        <Back />
                      </CardIcon>
                    </CardHeader>
                    <CardBody stats>

                      {cartItems.length === 0 ? (

                        <div>
                          Panier vide. <Link to="/client/produitList">Retourner vers le produit</Link>
                        </div>
                      ) : (
                        cartItems.map((item) =>
                          <CartItem key={item.produit} item={item} qteChange={qteChange} remove={remove} />
                        ))}

                    </CardBody>
                  </Card>
                </GridItem>




                <Grid item xs={12} sm={4} >
                  <AppBar className={classes.appBar} position="static" color="inherit" style={{ overflow: 'auto' }} >


                    <p> Total produit commander ({count()}) </p>


                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth
                      disabled={cartItems.length === 0}
                      onClick={handleSubmit}
                    >Commander</Button>

                  </AppBar>
                </Grid>



              </Grid>
            </Container>
          </Grow>
        </AppBar>
      </Container>




    </div>

  )
};

export default CartScreen;

