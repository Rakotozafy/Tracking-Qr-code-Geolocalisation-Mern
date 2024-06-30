/*eslint-disable*/
import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Livraison from './Livraison/Livraison';
import useStyles from './styles';

const Livraisons = ({ setCurrentId ,filtrer,filtre }) => {
  const { livraisons, isLoading } = useSelector((state) => state.livraisons);
  const classes = useStyles();

  if (!livraisons.length && !isLoading) return 'No livraisons';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
       {(filtre ? filtrer : livraisons).map((livraison) => (
          <Grid key={livraison._id} item xs={12} sm={12} md={6} lg={3}>
            <Livraison livraison={livraison} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Livraisons;
