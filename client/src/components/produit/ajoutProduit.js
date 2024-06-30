/*eslint-disable*/
import React, { useState } from 'react'
import { useHistory } from 'react-router'


import { makeStyles } from '@material-ui/core/styles';

// import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '42ch',
    },
  },
  text: {
    margin: '10px',
    width: '95%'
  },
  button: {
    color: 'White',
    backgroundColor: 'Orange'
  },
}));


export default function AjoutProduit({ type, edit, setListProduits, ListProduits, remise }) {
  const classes = useStyles();
  const history = useHistory()
  const masks = ['ref_prod', 'nom_prod', 'type_prod', 'unite_prod', 'etat_stock']
  const titre = ['Reference', 'Nom', 'Type', 'Unite de mesure', 'Etat du stock']

  const [produit, setProduit] = useState(edit)

  const changeEdit = (e) => {
    let { name, value } = e.target
    setProduit({ ...produit, [name]: value })
  }

  const sauvegarder = async (e) => {
    e.preventDefault()
    if (type === 'nouvel') {
      await axios.post('http://localhost:5000/produit', produit)
        .then((res) => {
          console.log(res)
          setListProduits([...ListProduits, res.data])
        })
      remise()
    } else {
      await axios.put(`http://localhost:5000/produit/${produit._id}`, produit)
        .then(() => {

          setListProduits(ListProduits.map(item => {
            if (item['_id'] === produit['_id']) {
              return produit
            } else {
              return item
            }
          }))

        }
        )
      remise()
    }
  }

  React.useEffect(() => {
    setProduit(edit)
  }, [edit])

  return (
    <div>
      <form noValidate autoComplete="off">
        {masks.map((mask, i) => (

          <TextField
            className={classes.text}
            variant='outlined'
            label={titre[i]}
            placeholder={titre[i]}
            value={produit[mask]}
            autoFocus={mask === 'ref_prod'}
            id={mask}
            name={mask}
            required
            onChange={changeEdit}
            fullWidth
          ></TextField>

        ))}

        <Button
          fullWidth
          variant="contained"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={sauvegarder}
        >
          {type === 'nouvel' ? 'Ajouter' : 'Modifier'}
        </Button>

      </form>
    </div>
  );
}