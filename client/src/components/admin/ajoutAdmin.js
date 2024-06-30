/*eslint-disable*/
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
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
  text :{
margin: '8px',
width: '95%'
  },
  button: {
    color: 'White',
    backgroundColor: 'Orange'
  },
}));


export default function AjoutAdmin({ type, edit, setListAdmin, ListAdmin, remise }) {
  const classes = useStyles();
  const masks = ['nom_utilisateur', 'prenom_utilisateur', 'mail_utilisateur','mdp_utilisateur']
  const titre= ['Nom','Prenom','Mail','Mot de passe']

  const [admin, setAdmin] = useState(edit)

  const changeEdit = (e) => {
    let { name, value } = e.target
    setAdmin({ ...admin, [name]: value })
  }

  const sauvegarder = async (e) => {
    e.preventDefault()
    if (type === 'nouvel') {
      await axios.post('http://localhost:5000/admin', admin)
        .then((res) => {
          console.log(res)
          setListAdmin([...ListAdmin, res.data])
        })
      remise()
    } else {
      await axios.put(`http://localhost:5000/admin/${admin._id}`, admin)
        .then(() => {

          setListAdmin(ListAdmin.map(item => {
            if (item['_id'] === admin['_id']) {
              return admin
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
    setAdmin(edit)
  }, [edit])

  return (
    <div>
      <form  noValidate autoComplete="off">
        {masks.map((mask, i) => (
          
            <TextField
            className={classes.text}
              variant='outlined'
              label={titre[i]}
              placeholder={titre[i]}
              value={admin[mask]}
              autoFocus={mask === 'ref_prod'}
              id={mask}
              name={mask}
              required
              onChange={changeEdit}
              fullWidth
            ></TextField>

        ))}
        
        <Button 
        type="submit"
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