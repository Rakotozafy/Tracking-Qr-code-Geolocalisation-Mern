/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, Typography,TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';


import { useSelector } from 'react-redux';
import Commandes from '../Commandes/Lists';
import Pagination from './PaginationList';
import useStyles from './styles';
import image from '../../assets/img/bc.jpg'
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const CommandeList = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('profile'));
  //Filtre

  const { commandes, isLoading } = useSelector((state) => state.commandes);
  const [filtre, setFiltre] = useState(false)
  const [filtrer, setFiltrer] = useState(false)

  const rechercher = select => {
    let fullCommande = commandes.flat()
    let results = fullCommande.filter(item => {
      const status = item.status.toLowerCase()
      const term = select.toLowerCase()
      return status.indexOf(term) > -1
    })
    setFiltrer(results)
  }
 


  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={8} >
            <Commandes setCurrentId={setCurrentId} filtrer={filtrer} filtre={filtre} />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} >

            <AppBar className={classes.appBar} position="static" color="inherit" >
            <br/>
            <Typography className={classes.heding} variant="h5" align="center"  > Option</Typography>

            <Typography className={classes.heding} variant="h5"  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filtre</Typography>
                <br/>
                <select onChange={(e) => {
                setFiltre(e.target.value.length > 0)
                rechercher(e.target.value)
              }}>
                <option value={""}>
                  Tout
                </option>
                <option>
                  En cours
                </option>
                <option>
                  Refusé
                </option>
                <option>
                  Confirmé
                </option>
                
              </select>
                <br/> 
                 <br/> 
                  <br/>

            </AppBar> <div>
<img src={image} height='465px' width='465px' alt="image"></img>
            </div>

          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default CommandeList;
