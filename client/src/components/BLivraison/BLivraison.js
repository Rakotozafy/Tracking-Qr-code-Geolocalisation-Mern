/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, Typography, Button, Input , Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Livraisons from '../Livraisons/Livraisons';
import Pagination from './Pagination';
import useStyles from './styles';


import { useSelector } from 'react-redux';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const BLivraison = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  //Filtre

  const { livraisons, isLoading } = useSelector((state) => state.livraisons);
  const [filtre, setFiltre] = useState(false)
  const [filtrer, setFiltrer] = useState(false)

  const rechercher = select => {
    let fullLivraison = livraisons.flat()
    let results = fullLivraison.filter(item => {
      const valiny = item.status.toLowerCase()
      const term = select.toLowerCase()
      return valiny.indexOf(term) > -1
    })
    setFiltrer(results)
  }
const dateScherch = Input => {
    let fullLivraison = livraisons.flat()
    let results = fullLivraison.filter(item => {
      const valiny = item.date_bc.toLowerCase()
      const term = Input.toLowerCase()
      return valiny.indexOf(term) > -1
    })
    setFiltrer(results)
  }

  // useEffect(() => {
  //   console.log(filtre)
  // })


  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={8} >
            <Livraisons filtre={filtre} filtrer={filtrer} setCurrentId={setCurrentId} />

            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} >

            <AppBar className={classes.appBar} position="static" color="inherit" >
              <Typography className={classes.heding} variant="h5" align="center"  > Option</Typography>

              <Typography className={classes.heding} variant="h5" align="left"  >&nbsp;&nbsp;&nbsp;Filtre :</Typography>
              <Typography className={classes.heding} variant="h5" align="left"  >&nbsp;&nbsp;&nbsp;Trier par status</Typography>
               <br/>
              <select onChange={(e) => {
                setFiltre(e.target.value.length > 0)
                rechercher(e.target.value)
              }}>
                <option value={""}>
                  Tout
                </option>
                <option>
                  En attente
                </option>
                <option>
                  En route
                </option>
                <option>
                  Arrivé
                </option>

              </select>
                <br/>
              <Typography className={classes.heding} variant="h5" align="left"  >&nbsp;&nbsp;&nbsp;Trier par date de commande</Typography>
             <br/>
              <Input type='date' onChange={(e) => {
                setFiltre(e.target.value.length > 0)
                dateScherch(e.target.value)
              }} >

              </Input>  
              <br/>  <br/>  <br/>

            </AppBar> <div>


            </div>

          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default BLivraison;
