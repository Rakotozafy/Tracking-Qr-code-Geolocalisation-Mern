/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createCommande, updateCommande } from '../../actions/commandes';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [commandeData, setCommandeData] = useState({ numero_bc: '', magasin: '', produit: [], status_comm: '' });
  const commande = useSelector((state) => (currentId ? state.commandes.commandes.find((magasin) => magasin._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setCommandeData({ numero_bc: '', magasin: '', produit: [], status_comm: '' });
  };

  useEffect(() => {
    if (!commande?.numero_bc) clear();
    if (commande) setCommandeData(commande);
  }, [commande]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createCommande({ ...commandeData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updateCommande(currentId, { ...commandeData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          veillez connectez
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setCommandeData({ ...commandeData, produit: [...commandeData.produit, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setCommandeData({ ...commandeData, produit: commandeData.produit.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${commande?.numero_bc}"` : 'Creating a Memory'}</Typography>
        <TextField name="numero_bc" variant="outlined" label="Numero Bon de commande" fullWidth value={commandeData.numero_bc} onChange={(e) => setCommandeData({ ...commandeData, numero_bc: e.target.value })} />
        <TextField name="magasin" variant="outlined" label="magasin" fullWidth multiline rows={4} value={commandeData.magasin} onChange={(e) => setCommandeData({ ...commandeData, magasin: e.target.value })} />
        <TextField name="status_comm" variant="outlined" label="Status Bon de commande" fullWidth value={commandeData.status_comm} onChange={(e) => setCommandeData({ ...commandeData, status_comm: e.target.value })} />
       
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="produit"
            variant="outlined"
            label="produit"
            fullWidth
            value={commandeData.produit}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
       <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Commande</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Effacer</Button>
      </form>
    </Paper>
  );
};

export default Form;
