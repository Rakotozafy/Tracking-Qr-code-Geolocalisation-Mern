/*eslint-disable*/
import { React, useState, useEffect } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Commande from './Commande/List';
import useStyles from './styles';

const Lists = ({ setCurrentId ,filtre,filtrer }) => {

  const user = JSON.parse(localStorage.getItem('profile'));
  const { commandes, isLoading } = useSelector((state) => state.commandes);
  const classes = useStyles();

  if (!commandes.length && !isLoading) return 'Pas de commandes';

  
  return (

    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3} >
       {(filtre ? filtrer : commandes).map((commande) => (
          <Grid key={commande._id} item xs={12} sm={12} md={6} lg={3}>
            <Commande commande={commande} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
    
  );
};

export default Lists;
