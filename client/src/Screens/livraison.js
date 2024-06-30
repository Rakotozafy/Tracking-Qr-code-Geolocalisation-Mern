/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
//livrasison

import { createLivraison, updateLivraison } from 'redux/actions/livraisonActions'
import { updateCommande } from 'redux/actions/commandeActions';
import axios from 'axios';
import { updateStatus } from 'redux/actions/commandeActions';
const useStyles = makeStyles({
    Boutton: {
        backgroundColor: "#085a96",
    },
    Boutton2: {
        backgroundColor: "grey",
    }, Boutton1: {
        backgroundColor: '#f93d37',
    }
});



export default function livraison({ produit, commande }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();

    const [currentId, setCurrentId] = useState(0);
    const [livraisonData, setLivraisonData] = useState();
    const user = JSON.parse(localStorage.getItem('profile'));

    // const [commandeData, setCommandeData] = useState();
    const idCommande = useState(commande._id)
    const confirme = 'Confirmé'
    const ref = 'Refusé'
    const [status, setStatus] = useState(commande?.status);

    const [mouv, setMouv] = useState({

        mouvement: [

            {
                date_depart: null,
                date_arriver: null,
                lng_depart: null,
                lng_arriver: null,
                lat_depart: null,
                lat_arriver: null,
            }
        ]

    })


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createLivraison({ ...livraisonData, userId: commande.userId, magasin: commande.magasin, date_bc: commande.date_bc, produits: produit }, history));


            const newStatus = await dispatch(updateStatus(commande._id, { status: confirme }));
            setStatus(newStatus);




        }

    };

    const refuser = async (e) => {
        e.preventDefault();
        const newStatus = await dispatch(updateStatus(commande._id, { status: ref }));
        setStatus(newStatus);
        history.push('/admin/commande')

    }

    const annuler = async (e) => {
        history.push('/admin/commande')
    }

    return (
        <div>
            <Button
                onClick={handleSubmit}
                disabled={ commande.status === 'Confirmé' || commande.status === 'Refusé'}
                className={classes.Boutton}
                fullWidth
            >
                Effectuer un bon de livraison
            </Button>

            <br /> <br />

            <Button
                onClick={refuser}
                disabled={ 
                    commande.status === 'Confirmé' || commande.status === 'Refusé'
                }
                className={classes.Boutton1}
                fullWidth
            >
                Refusé
            </Button>

            <br />  <br />

            <Button
                onClick={annuler}
                className={classes.Boutton2}
                fullWidth
            >
                Annuler
            </Button>
        </div>
    )
}
