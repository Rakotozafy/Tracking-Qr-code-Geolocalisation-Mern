/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/Update';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { deleteCommande } from 'redux/actions/commandeActions';
import axios from 'axios';

import bg from "assets/img/Eleceau.PNG";

import useStyles from './styles';

const Commande = ({ commande, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;

  const openCommande = (e) => {
    history.push(`/client/commandeScreen/${commande._id}`);
  };
  const idMagasin = (commande.magasin)
  const [listMagasin, setListMagasin] = useState()
  const [listMagasins, setListMagasins] = useState()

  const [province, setProvince] = useState()

  const mag = (e) => {
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
  return (
    <Card className={classes.card} raised elevation={6} >
      {mag()}

      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openCommande}
      >
        <CardMedia className={classes.media}  title={listMagasin} />
        <div className={classes.overlay}>
          <Typography variant="h6">Magasin: {listMagasin}</Typography>
          <Typography variant="body2">{moment(commande.date_bc).fromNow()}</Typography>
        </div>


        <div className={classes.details}>
        </div>
        <Typography className={classes.title} gutterBottom variant="h6" component="h2">Adresse de livraison :{listMagasins} </Typography>
        <Typography className={classes.title} gutterBottom variant="h6" component="h2">Province de : {province} </Typography>
       <CardContent>
          <Typography variant="body2" color="textSecondary" component="p"> Nom magasinier: {user.result.name} </Typography>
          <Typography variant="h6">{commande.status}</Typography>
        </CardContent>
      </ButtonBase>


      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteCommande(commande._id))}>
          <DeleteIcon fontSize="small" /> &nbsp; Suprimer
        </Button>
      </CardActions>

    </Card>
  );
};

export default Commande;