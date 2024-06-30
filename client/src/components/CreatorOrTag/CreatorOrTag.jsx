/*eslint-disable*/
import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import Commande from '../Commandes/Commande/Commande';
import { getCommandesByCreator, getCommandesBySearch } from '../../actions/commandes';

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { commandes, isLoading } = useSelector((state) => state.commandes);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/produit')) {
      dispatch(getCommandesBySearch({ produit: name }));
    } else {
      dispatch(getCommandesByCreator(name));
    }
  }, []);

  if (!commandes.length && !isLoading) return 'No Commandes';

  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {commandes?.map((commande) => (
            <Grid key={commande._id} item xs={12} sm={12} md={6} lg={3}>
              <Commande commande={commande} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
