/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Container, AppBar, Grow, Grid, Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import { useParams, useHistory, Link } from 'react-router-dom';
import bgImage from "assets/img/Eleceau.PNG";

import { getCommande } from '../redux/actions/commandeActions';

// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
import DeleteIcon from '@material-ui/icons/Delete';

//Tableau
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'

import moment from 'moment';
import { deleteCommande } from 'redux/actions/commandeActions';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'orange',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
  Boutton: {
    backgroundColor: "#085a96",
  }
});


const CommandeScreen = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const { commande, commandes, isLoading } = useSelector((state) => state.commandes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const [listMagasin, setListMagasin] = useState()
  const [listMagasins, setListMagasins] = useState()

  const [province, setProvince] = useState()


  useEffect(() => {
    dispatch(getCommande(id));

  }, [id,]);


  const list = (e) => {
    axios.get('http://localhost:5000/magasin/' + idMagasin).then((allMagasin) => {

      const magas = (allMagasin.data)
      const mags = magas.nom_magasin
      const adr = magas.adresse_magasin
      const p = magas.province
      setListMagasin(mags)
      setListMagasins(adr)
      setProvince(p)
    })
  }
  if (!commande) return null;

  const masks = ['produit', 'nom_prod', 'qte']
  const titre = ['ID produit', 'Nom produit', 'Quantité']

  //Liraison

  const Supprimer = (e) => {
    dispatch(deleteCommande(commande._id))
    history.push('/client/commande');
  };
  //Magasin

  const idMagasin = (commande.magasin)
  //end

  const retour = (e) => {
    e.preventDefault()
    history.push('/client/commande')
  }

  return (
    <>
      <div className="ProduitScreen">
        <Container maxWidth="xl">
          <AppBar className={classes.appBar} position="static" color="inherit" >
            {/* <Typography className={classes.heding} variant="h3" align="center"  > Commande details</Typography> */}
            <Grow in>
              <Container>
                {list()}
                <Grid container justify="space-between" alignItems="strect">

                  <Grid item xl={6} sm={12} md={6}>

                    <GridItem xl={7} sm={7} align='left'>
                      <br />
                      <Card>
                        <CardHeader color="default" stats icon>
                          <center  >
                            <img className={classes.media} src={bgImage} height='50px' />
                          </center>
                        </CardHeader>
                        <CardBody stats>
                          <div className={classes.card}>
                            <div className={classes.section}>
                              <Typography variant="h5" component="h2"> Nom du magasin : {listMagasin}</Typography>
                              <Typography component="h2"> Nom magasinier : {user.result.name}
                              </Typography>
                              <Typography component="h2"> Adresse :{listMagasins} 
                              </Typography>
                              <Typography component="h2"> Province : {province}
                              </Typography>
                              <Typography component="h2"> Date :{commande.date_bc}
                              </Typography>
                              <Typography color="textSecondary" variant="h4">
                                Status:
                                {commande.status}
                              </Typography>
                              <Button size="small" color="secondary" onClick={Supprimer}>
                                <DeleteIcon fontSize="small" /> &nbsp; Suprimer
                              </Button>
                              <Button onClick={retour}>Retour</Button>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </Grid>

                  <Grid item xl={6} sm={12} md={6} >
                    <br />
                    <Typography variant="h6" component="h2" align='center' > Liste produits Commander

                    </Typography>
                    <br />
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="customized table">
                        <TableHead>

                          <StyledTableRow>

                            {titre.map((mask, i) => (
                              <StyledTableCell key={i}>{mask}</StyledTableCell>
                            ))}
                          </StyledTableRow>
                        </TableHead>
                        <TableBody>
                          {commande.produits.map((list, key) => (
                            <StyledTableRow key={key}>
                              {masks.map((mask, i) => (
                                <StyledTableCell key={i}>{list[mask]}</StyledTableCell>
                              ))}

                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                  </Grid>
                </Grid>
              </Container>
            </Grow>
          </AppBar>
        </Container>

      </div>
    </>
  );
};

export default CommandeScreen;