/*eslint-disable*/
import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getCommande } from '../../redux/actions/commandeActions';

import useStyles from './styles';

const Commande = ({match,history}) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCommande(id));
  }, [id]);

 


  const CommandeDetails = useSelector(state => state.getCommande)
  const { commande, error, loading } = CommandeDetails
  // const { id } = useParams();

  useEffect(() => {
    if (produit && match.params.id !== produit._id) {
      dispatch(getProduitDetails(match.params.id))
    }
  }, [dispatch, produit, match])


  if (loading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{commande.nom}</Typography>
              <Typography gutterBottom variant="body1" component="p">{commande.magasin}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${commande.adresse}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${commande.adresse}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(commande.date_bc).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          {/* <img className={classes.media} src={commande.status_comm || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={commande.numero_bc} /> */}
        <Typography gutterBottom variant="body1" component="p">{commande.status}</Typography>
        </div>
      </div>
    
    </Paper>
  );
};

export default Commande;
