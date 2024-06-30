/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '42ch',
    },
  },
  button :{
  color: 'White',
  backgroundColor : 'Orange'
  },
}));


export default function AjoutMagasin({magasin, setMagasin ,ajoutMagasin}) {
  let {id}=useParams() 
  const classes = useStyles();
  const masks = ['nom_magasin','adresse_magasin','province']
  // const [magasin, setMagasin] = useState(magasin);


  // const ajoutMagasin = async () => {
  //   if(magasin._id===''){
  //     await axios.post('http://localhost:5000/magasin', magasin).then(() => {
  //       window.location.reload(false);
  //     })
  //   }else{
  //     await axios.put(`http://localhost:5000/magasin/${id}`, magasin).then((res)=>{
  //       console.log(res.data)
  //     })
  //   }
  // }
  
  
  return (
    <div>
      
    <form className={classes.root} noValidate autoComplete="off">
    
      
      <TextField id="standard-basic" required label="Nom Magasin" value={magasin.nom_magasin} onChange={(event) => {
          setMagasin({ ...magasin, nom_magasin: event.target.value })
        }} />
        <TextField id="filled-basic" required label="Adresse Magasin" value={magasin.adresse_magasin} onChange={(event) => {
          setMagasin({ ...magasin, adresse_magasin: event.target.value })}} />
       <InputLabel id="demo-simple-select-label">Province</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={magasin.province}
          onChange={(event) => {
            setMagasin({ ...magasin, province: event.target.value })
          }}
        >
          <MenuItem value={'Tananarive'}>Tananarive</MenuItem>
          <MenuItem value={'Diego-Suarez'}>Diego-suarez</MenuItem>
          <MenuItem value={'Fianarantsoa'}>Fianarantsoa</MenuItem>
          <MenuItem value={'Majunga'}>Majunga</MenuItem>
          <MenuItem value={'Tamatave'}>Tamatave</MenuItem>
          <MenuItem value={'Tulear'}>Tulear</MenuItem>
        </Select>
         <Button
        variant="contained"
        color="orange"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={ajoutMagasin}
      >
    
       {magasin._id==='' ? 'Ajouter' : 'Modifier'}
      </Button>
    </form>
    </div>
  );
}
