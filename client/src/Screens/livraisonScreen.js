/*eslint-disable*/
import React, { useEffect, useState, useRef } from 'react';
import { Container, AppBar, Grow, Grid, Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import { useParams, useHistory, Link } from 'react-router-dom';
import bgImage from "assets/img/jirama.png";


import bg from "assets/img/route.jpg";
import at from "assets/img/at.PNG"

import ok from "assets/img/ok.png";

import { getLivraison } from '../redux/actions/livraisonActions';

// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";

//Tableau
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import axios from 'axios';
//Generateur QR
import QrCode from './qrCode';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: 'orange',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
    col: {
        color : '#0f3353'
    }
});



const LivraisonScreen = () => {
    const { livraison, livraisons, isLoading } = useSelector((state) => state.livraisons);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const [nomMagasin, setNom] = useState()
    const [adresse, setAdress] = useState()
    const [mag, setMag] = useState()
    const [pro, setProvince] = useState()
    const { id } = useParams();
    useEffect(() => {
        dispatch(getLivraison(id));
    }, [id]);

    const nom = (e) => {


        axios.get('http://localhost:5000/magasin/' + livraison.magasin).then((allMagasin) => {
            const tepr = (allMagasin.data);
            const ft = tepr.nom_magasin
            const ad = tepr.adresse_magasin
            const pro = tepr.province
            setProvince(pro)
            setAdress(ad)
            setNom(ft)

        })


    }
    const nomMag = (e) => {
        axios.get('http://localhost:5000/magasinier/' + livraison.userId).then((allMagasinier) => {
            const ma = (allMagasinier.data)
            const mags = ma.name
            setMag(mags)
        })
    }

    if (!livraison) return null;

    const masks = ['produit', 'nom_prod', 'qte']
    const titre = ['ID produit', 'Nom produit', 'Quantité']





    //QR Code

    // const [imageUrl, setImageUrl] = useState('');
    // const [scanResultFile, setScanResultFile] = useState({});
    // const [scanResultWebCam, setScanResultWebCam] = useState('');
    // const qrRef = useRef(null);


    // const generateQrCode = async (magasinier) => {
    //     try {
    //         const response = await QRCode.toDataURL(JSON.stringify(magasinier));
    //         setImageUrl(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const handleErrorFile = (error) => {
    //     console.log(error);
    // }
    // const handleScanFile = (result) => {
    //     if (result) {
    //         setScanResultFile(JSON.parse(result));
    //     }
    // }
    // const onScanFile = () => {
    //     qrRef.current.openImageDialog();
    // }
    // const handleErrorWebCam = (error) => {
    //     console.log(error);
    // }
    // const handleScanWebCam = (result) => {
    //     if (result) {
    //         setScanResultWebCam(result);
    //     }
    // }



    return (
        <>&nbsp;
        <br/><br/><br/><br/><br/>
            <div className="ProduitScreen" >{nom()} {nomMag()}
                <Container maxWidth="xl">
                    <AppBar className={classes.appBar} position="static" color="inherit" >
                        {/* <Typography className={classes.heding} variant="h3" align="center"  > Livraison details</Typography> */}
                        <Grow in>
                            <Container>
                                <Grid container justify="space-between" alignItems="strect">

                                    <Grid item xl={6} sm={12} md={6}>

                                        <GridItem xl={7} sm={7} align='left'>
                                            <br/>
                                            <br/>
                                            <Card>
                                                <CardHeader color="default" stats icon>
                                                    <center>

                                                        <img className={classes.media} src={livraison.status === 'En route' ? bg  : livraison.status==='En attente' ?at : ok } height='50px' />
                                                    </center>

                                                </CardHeader>
                                                <CardBody stats>
                                                    <div className={classes.card}>
                                                        <div className={classes.section}>
                                                            <Typography variant="h5" component="h2"> Date du Commande :  {livraison.date_bc}</Typography>
                                                            <Typography component="h2"> Nom magasinier : {mag}
                                                            </Typography>
                                                            <Typography component="h2"> Nom magasin : {nomMagasin}
                                                            </Typography>
                                                            <Typography component="h2"> Adresse :  {adresse} {pro}

                                                            </Typography>
                                                            <Typography className={classes.col} variant="h4">
                                                                Status:
                                                                {livraison.status}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </GridItem>
                                    </Grid>

                                    <Grid item xl={6} sm={12} md={6} >
{/* <p>Test</p> */}
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grow>
                    </AppBar>
                </Container>

                <div>
                </div>
<div>
                                        <QrCode livraison={livraison} />

</div>
            </div>
        </>
    );
};

export default LivraisonScreen;