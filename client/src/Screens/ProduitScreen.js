/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Container, AppBar, Grow, Grid, Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import useStyles from './style';

import SaveIcon from '@material-ui/icons/ShoppingBasket';
import bgImage from "assets/img/jirama.png";

import Elec from "assets/img/Elec.PNG";
import Eau from "assets/img/Eau.PNG";

import { getProduitDetails } from '../redux/actions/produitActions';
import { addToCart } from '../redux/actions/cartActions';

// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
// @material-ui/icons
import Accessibility from "@material-ui/icons/Accessibility";
import Back from "@material-ui/icons/ArrowBackIos"



const ProduitScreen = ({ match, history }) => {

  const classes = useStyles();
  const dispatch = useDispatch()
  const [qte, setQte] = useState(1)

  const user = localStorage.getItem(JSON.stringify('profile'))



  const ProduitDetails = useSelector(state => state.getProduitDetails)
  const { produit, error, loading } = ProduitDetails
  // const { id } = useParams();

  useEffect(() => {
    if (produit && match.params.id !== produit._id) {
      dispatch(getProduitDetails(match.params.id))
    }
  }, [dispatch, produit, match])


  const addToCartHandler = () => {
    dispatch(addToCart(produit._id, qte))
    history.push('/client/CartScreen')
  }
// if (!produit) return null;

  if (loading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  // const recommendedProduits = produits.filter(({ _id }) => _id !== produit._id);

  return (
    <div className="ProduitScreen">
      <Container maxWidth="lg" align='center' >
        <Typography className={classes.heding} variant="h3" align="center"  > Produit details</Typography>


     
              <GridItem xs={12} sm={7} align='left'>
                <Card>
                  <CardHeader color="default" stats icon>
                    <CardIcon color={produit.type_prod === 'Eau' ? "info" : "warning"} >
                      <img className={classes.media} src={produit.type_prod === 'Eau' ? Eau : Elec} height='50px' />
                    </CardIcon>
                  </CardHeader>
                  <CardBody stats>
                    <div className={classes.card}>
                      <div className={classes.section}>
                        <Typography variant="h5" component="h2"> Nom du produit : {produit.nom_prod}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2"> Reference :{produit.ref_prod}
                        </Typography>
                        <Typography variant="h4">
                          Type:
                          {produit.type_prod}
                        </Typography>
                        <Divider style={{ margin: '20px 0' }} />

                        <Typography variant="body1" >Produits disponible : <strong> {produit.etat_stock} {produit.unite_prod} </strong> </Typography>

                        <Divider style={{ margin: '20px 0' }} />



                        <Typography variant="body1" ><strong> Status : {""}

                          {produit.etat_stock > 0 ? "Stock disponible" : "Stock non Disponible"}
                        </strong></Typography>
                        <Typography variant="body1" align='center' >

                          Quantite: {qte + ' ' + produit.unite_prod}
                          <br />
                          <input
                            type="range"
                            min="1"
                            max={produit.etat_stock}
                            disabled={produit.etat_stock==0}
                            value={qte}
                            onChange={(e) => setQte(e.target.value)}
                          />
                        </Typography>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={produit.etat_stock == 0}
                          size="large"
                          className={classes.button}
                          startIcon={<SaveIcon />}
                          onClick={addToCartHandler}
                        >
Ajouter
                        </Button>

                      </div>

                    </div>

                  </CardBody>
                </Card>
              </GridItem>

      </Container>

    </div>
  );
};

export default ProduitScreen;

