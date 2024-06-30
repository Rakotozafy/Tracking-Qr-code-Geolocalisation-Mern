/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/Update';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import bg from "assets/img/route.jpg";
import at from "assets/img/at.PNG"

import ok from "assets/img/ok.png";
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import axios from 'axios';
import { deleteLivraison } from 'redux/actions/livraisonActions';

const Livraison = ({ livraison, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;

  const openLivraison = (e) => {
    history.push(`/admin/livraisonScreen/${livraison._id}`);
  };


  const idMagasin = (livraison.magasin)
  const idMagasinier = (livraison.userId)
  const [listMagasin, setListMagasin] = useState([])

  const [mag, setMag] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/magasin/'+idMagasin).then((allMagasin) => {
      setListMagasin(allMagasin.data);
    })
    axios.get('http://localhost:5000/magasinier/'+idMagasinier).then((allMagasinier) => {
      setMag(allMagasinier.data);
    })

  }, []);
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openLivraison}
      >
        <CardMedia className={classes.media} image={livraison.status === 'En route' ? bg  : livraison.status==='En attente' ?at : ok } title={listMagasin.nom_magasin} />
        <div className={classes.overlay}>
          <Typography variant="h6">Magasin :{listMagasin.nom_magasin}</Typography>
          <Typography variant="body2">
            <i>
              {moment(livraison.createdAt).fromNow()}
            </i>
          </Typography>
        </div>


        <div className={classes.details}>
        </div>
        <Typography className={classes.title} gutterBottom variant="h6" component="h2">Nom magasinier: <b>{mag.name}</b> </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p"> Adresse de livraison :{listMagasin.adresse_magasin} </Typography>
          <Typography variant="body2" color="textSecondary" component="p"> Province : {listMagasin.province} </Typography>
          <Typography className={classes.status} variant="h5" color='' >{livraison.status} </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteLivraison(livraison._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Supprimer
        </Button>
      </CardActions>
    </Card >
  );
};

export default Livraison;