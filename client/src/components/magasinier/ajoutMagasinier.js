/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory, useParams } from 'react-router'
// import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { Container } from '@material-ui/core';

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
    form: {

    }
}));

export default function ajoutMagasinier({ type, magasinier, setListMag, listMag, remise }) {
    let { id } = useParams()
    const classes = useStyles();


    //Magasin
    const [magasinNom, setMagasinNom] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/magasin').then((allMagasin) => {
            setMagasinNom(allMagasin.data);
        })
    }, []);

    //nouveau
    const history = useHistory()
    const masks = ['matricule', 'nom_magasinier', 'prenom_magasinier', 'mail_magasinier', 'adresse_magasinier', 'magasin', 'mdp_magasinier']
    const titre = ['Matricule', 'Nom', 'Prenom', 'Mail', 'Adresse', 'Magasin', 'Mot depasse']

    const [ajout, setAjout] = useState(magasinier)

    const changeEdit = (e) => {
        let { name, value } = e.target
        setAjout({ ...ajout, [name]: value })
    }

    const sauvegarder = async (e) => {
        e.preventDefault()
        if (type === 'nouvel') {
            await axios.post('http://localhost:5000/magasinier', ajout)
                .then((res) => {
                    console.log(res)
                    setListMag([...listMag, res.data])
                })
            remise()
        } else {
            await axios.put(`http://localhost:5000/magasinier/${ajout._id}`, ajout)
                .then(() => {

                    setListMag(listMag.map(item => {
                        if (item['_id'] === ajout['_id']) {
                            return ajout
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
        setAjout(magasinier)
    }, [magasinier])

    return (
        <form className={classes.form} noValidate autoComplete="off">
            {masks.map((mask, i) => (
                mask !== 'magasin' ? (
                    <TextField 
                        className={classes.text}
                        variant='outlined'
                        label={titre[i]}
                        placeholder={titre[i]}
                        value={ajout[mask]}
                        autoFocus={mask === 'matricule'}
                        id={mask}
                        name={mask}
                        required
                        onChange={changeEdit}
                        fullWidth
                    ></TextField>)
                    : (

                        <Select
                        className={classes.text}
                            fullWidth
                            name={mask}
                            labelId="demo-simple-select-label"
                            label='Magasin'
                            id="demo-simple-select"
                            value={ajout[mask]}
                            onChange={changeEdit}
                        >
                            {magasinNom.map((magasin, key) => (
                                <MenuItem key={key} value={magasin.nom_magasin.concat(' ' + magasin.adresse_magasin)} >{magasin.nom_magasin} {magasin.adresse_magasin} </MenuItem>
                            ))}
                        </Select>
                    )

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

    );
}
