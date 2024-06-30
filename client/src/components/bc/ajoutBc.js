/*eslint-disable*/
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import ChipInput from 'material-ui-chip-input';
import commande from './listProd'

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


export default function AjoutBc({ type, edit, setEdit, setListBc, ListBc, remise, commande, reduire, supprimer, listProd, SetListProd, add, adds }) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const classes = useStyles();
    const masks = ['numero_bc', 'magasinier', 'magasin', 'produit', 'date_bc']
    //   const produit= ['nomProd','type','unite', 'nombre']
    const titre = ['Numero commande', 'Nom magasinier', 'Magasin', 'Produit', 'Date']

    const [bc, setBc] = useState(edit)


    const changeEdit = (e) => {
        let { name, value } = e.target
        setBc({ ...bc, [name]: value })
    }


    const handleAddChip = (e) => {
        setBc({ ...bc, produit: [...bc.produit, e] });
    };

    const handleDeleteChip = (chipToDelete) => {
        setBc({ ...bc, produit: bc.produit.filter((e) => e !== chipToDelete) });
    };






    const sauvegarder = async (e) => {
        e.preventDefault()
        if (type === 'nouvel') {
            await axios.post('http://localhost:5000/bc', bc)
                .then((res) => {
                    console.log(res)
                    setListBc([...ListBc, res.data])
                })
            remise()
        } else {
            await axios.put(`http://localhost:5000/bc/${bc._id}`, bc)
                .then(() => {

                    setListBc(ListBc.map(item => {
                        if (item['_id'] === bc['_id']) {
                            return bc
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
        setBc(edit)
    }, [edit])



    return (
        <div>

            Listes des produits:

            {commande['listes'].map((ls, i) => (
                <p key={i}
                    value={bc.produit}
                    onChange={(event) => {
                        setBc({ ...bc, produit: event.target.value })
                    }}
                >
                    
                    Produit: {ls.nom_prod} - Type: {ls.type_prod} - Quantites: {ls.quantite + ' ' + ls.unite_prod}
                    {"\t \t"}
                    <input
                        type="range"
                        min="1"
                        max={ls.etat_stock}
                        value={ls.quantite}
                        onChange={(e) => reduire(e, ls)}
                    />
                    {"\t \t"}
                    <button onClick={() => supprimer(ls._id)}>-</button>
                </p>
            ))}

            {/* <form noValidate autoComplete="off">
                {masks.map((mask, i) => (
                    mask !== 'produit' ? (
                        <TextField
                            className={classes.text}
                            variant='outlined'
                            label={titre[i]}
                            placeholder={titre[i]}
                            value={bc[mask]}
                            autoFocus={mask === 'numero_bc'}
                            id={mask}
                            name={mask}
                            required
                            onChange={changeEdit}
                            fullWidth
                        ></TextField>)
                        :
                        (

                            <ChipInput
                                className={classes.text}
                                variant='outlined'
                                label={titre[i]}
                                placeholder={titre[i]}
                                value={bc[mask]}
                                onChange={changeEdit}
                                id={mask}
                                name={mask}
                                required

                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}

                                fullWidth
                            />
                            
                        )

                ))}

                {user?.result.email}
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

            </form> */}

            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" required label="Numero BC" value={bc.numero_bc} onChange={(event) => {
                    setBc({ ...bc, numero_bc: event.target.value })
                }} />
                <TextField id="filled-basic" required label="Nom Magasinier" value={bc.magasinier} onChange={(event) => {
                    setBc({ ...bc, magasinier: event.target.value })
                }} />
                <TextField id="filled-basic" required label="Magasin" value={bc.magasin} onChange={(event) => {
                    setBc({ ...bc, magasin: event.target.value })
                }} />

                <Button
                    variant="contained"
                    color="orange"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={sauvegarder}
                >
                    Ajouter
                </Button>
            </form>

        </div>
    );
}