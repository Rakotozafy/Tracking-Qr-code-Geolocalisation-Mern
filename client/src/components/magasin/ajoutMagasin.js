/*eslint-disable*/
import React, { useState } from 'react'
import { useHistory } from 'react-router'


import { makeStyles } from '@material-ui/core/styles';

// import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/styles'

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
    margin: '8px',
    width: '95%'
  },
  button: {
    color: 'White',
    backgroundColor: 'Orange'
  },
}));


export default function AjoutMagasin({ coord, type, edit, setLists, lists, remise }) {
  const classes = useStyles();
  const history = useHistory()
  const masks = ['nom_magasin', 'adresse_magasin', 'province', 'lng', 'lat']
  const titre = ['Nom magasin', 'Adresse', 'Province', 'lngitude', 'Latitude']

  const [test, setTest] = useState(  edit
    // {

    // nom_magasin: '', 
    // adresse_magasin: '',
    //  province: '', 
    //  lng: coord.lng, 
    //  lat: coord.lat 
    // }
)

  const changeEdit = (e) => {
    let { name, value } = e.target
    setTest({ ...test, [name]: value })
  }


  const sauvegarder = async (e) => {
    e.preventDefault()
    if (type === 'nouvel') {
      await axios.post('http://localhost:5000/magasin', test)
        .then((res) => {
          console.log(res)
          setLists([...lists, res.data])
        })
      remise()
    } else {
      await axios.put(`http://localhost:5000/magasin/${test._id}`, test)
        .then(() => {

          setLists(lists.map(item => {
            if (item['_id'] === test['_id']) {
              return test
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
    setTest(edit)
  }, [edit])

  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          className={classes.text}
          variant='outlined'
          placeholder="Nom Magasin"
          fullWidth
          required 
          label="Nom Magasin" id='nom_magasin' name='nom_magasin' value={ test.nom_magasin} onChange={changeEdit} />
        <TextField className={classes.text}
          variant='outlined'
          placeholder="Adresse Magasin"
          fullWidth
          required label="Adress Magasin" id='adresse_magasin' name='adresse_magasin' value={test.adresse_magasin} onChange={changeEdit} />

        <Select
          className={classes.text}
          label='province'
          fullWidth
          labelId="demo-simple-select-label"
          id='province'
          name='province'

          value={test.province}
          onChange={changeEdit}
        >
          <MenuItem value={'Tananarive'}>Tananarive</MenuItem>
          <MenuItem value={'Diego-Suarez'}>Diego-suarez</MenuItem>
          <MenuItem value={'Fianarantsoa'}>Fianarantsoa</MenuItem>
          <MenuItem value={'Majunga'}>Majunga</MenuItem>
          <MenuItem value={'Tamatave'}>Tamatave</MenuItem>
          <MenuItem value={'Tulear'}>Tulear</MenuItem>
        </Select>
        <TextField className={classes.text}
          variant='outlined'
          placeholder= {JSON.stringify(coord.lat)}
          fullWidth
          id='lat' name='lat' required label={JSON.stringify(coord.lat)} disabled value={test.lat} onChange={changeEdit} />
        <TextField 
        className={classes.text}
          variant='outlined'
          placeholder="Longitude"
          fullWidth
          id='lng' name='lng' required label={JSON.stringify(coord.lng)} disabled value={test.lng} onChange={changeEdit} />

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