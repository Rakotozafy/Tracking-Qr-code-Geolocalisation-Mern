/*eslint-disable*/
import React, { useState, useRef, useEffect } from 'react';

import { Paper,Grid, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Container, Grow } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import { useParams, useHistory, Link } from 'react-router-dom';
//card


import IconButton from '@material-ui/core/Button';
import Position from '@material-ui/icons/Place'
import QR from '@material-ui/icons/SelectAll'

import Map from '@material-ui/icons/Map'
//Tableau
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import axios from 'axios';

//card
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";


import MapScreen from './MapScreen';
//Generateur QR

import QRCode from 'qrcode';
// import QrReader from 'react-qr-reader';
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
    btn: {
        color: '#fea500',
        backgroundColor: '#0f3353'
    }
});

const QrCode = ({ livraison }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const masks = ['nom_prod', 'qte']
    const titre = ['Nom produit', 'Quantité']
    const mouvMasks = ['date_depart', 'date_arriver', 'lng_depart', 'lng_arriver', 'lat_depart', 'lat_arriver']
    const titreMouv = ['Date depart', 'Date arriver', 'longitude depart', 'longitude arriver', 'latitude depart', 'latitude arriver']
    const id = livraison._id
    //QR Code

    const [imageUrl, setImageUrl] = useState('');
    const [scanResultFile, setScanResultFile] = useState({});
    const qrRef = useRef(null);


    const generateQrCode = async (produit, key) => {
        try {
            // const response = await QRCode.toDataURL(JSON.stringify(produit));
            const response = await QRCode.toDataURL((Object.values(id.concat(';' + key))));


            setImageUrl(response);
        } catch (error) {
            console.log(error);
        }
    }
    const handleErrorFile = (error) => {
        console.log(error);
    }
    const handleScanFile = (result) => {
        if (result) {
            setScanResultFile(JSON.parse(result));
        }
    }
    const onScanFile = () => {
        qrRef.current.openImageDialog();
    }


    const [mouve, setMouv] = useState(null)
    const [mapme, setMapme] = useState(null)
    const [magasin, setMagasin] = useState()


    const mouvements = (e, tepr) => {

        axios.get('http://localhost:5000/mobile/' + id).then((res) => {
            const prod = res.data
            const mo = prod.produits[tepr]
            const mouv = mo.mouvement
            setMouv(mouv)
            setMapme(mouv)
            // setMapme(mouv)
            console.log(mouv)
        })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/magasin').then((allMagasin) => {
            setMagasin(allMagasin.data);
        })

    }, [])

    //Direction
    // const po = mapme
    // let lng1 = 47.08283918082708
    // let lat1 = -21.456105638134336
    // let lng = 47.52771124044695
    // let lat =  -18.89583010587047 

    // // const origin = [  lat,  lng ]
    // // const destination = [ lat1,lng1 ]
    // const [directions, setDirections] = useState()
    // async function calcul() {
    //     let google = window.google;
    //     // let map = mapRef.current;

    //     const start = new google.maps.LatLng(-18.89583010587047 , 47.52771124044695)
    //     const end = new google.maps.LatLng(-21.456105638134336, 47.08283918082708)

    //     const directionsServices = new google.maps.DirectionsService()

    //     const resuts = await directionsServices.route(
    //         {
    //             origin: start,
    //             destination:  end,
    //             travelMode: google.maps.TravelMode.DRIVING
    //         },
    //         setDirections(resuts)
    //     )
    // }
    // const calcul=0
    // const directions=1

    return (
        <>
            <div className="ProduitScreen">
                <br />
                <Container maxWidth="sm" >
                    <Grow in>
                        <Container>
                            <Grid container justify="space-between">
                                <Grid item xl={12} sm={14}>


                <Typography variant="h6" component="h2" align='center' > Liste des produits à livré

                </Typography>
                <br />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>

                            <StyledTableRow>

                                {titre.map((mask, i) => (
                                    <StyledTableCell key={i}>{mask}</StyledTableCell>
                                ))}
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {livraison.produits.map((list, key) => (
                                <StyledTableRow key={key}>
                                    {masks.map((mask, i) => (
                                        <StyledTableCell key={i}>{list[mask]}</StyledTableCell>
                                    ))}

                                    <StyledTableCell>

                                    
                                        <IconButton
                                            className={classes.btn}
                                            aria-label="Generer"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => generateQrCode(list._id, key)}
                                            disabled={livraison.status === 'Arrivé'} >
                                            <QR fontSize="small" />
                                        </IconButton>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <IconButton
                                            className={classes.btn}
                                            variant="contained"
                                            color="primary"
                                            aria-label="Mouvement"
                                            onClick={e => mouvements(e, key)}
                                            disabled=  {livraison.status === 'En attente' || livraison.status === 'En route' }
                                        >
                                            <Position fontSize="small" />
                                        </IconButton>
                                    </StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                                </Grid>
                            </Grid>
                        </Container>
                    </Grow>

                </Container>




            </div>
            <br>
            </br>
            <div>
                {mouve === null ? null :
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>

                                <StyledTableRow>

                                    {titreMouv.map((mask, i) => (
                                        <StyledTableCell key={i}>{mask}</StyledTableCell>
                                    ))}
                                    <StyledTableCell>action</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {mouve.map((list, key) => (
                                    <StyledTableRow key={key}>
                                        {mouvMasks.map((mask, i) => (
                                            <StyledTableCell key={i}>{list[mask]}</StyledTableCell>
                                        ))}

                                        <StyledTableCell>

                                            <IconButton
                                                className={classes.btn}
                                                variant="contained"
                                                color="primary"
                                                aria-label="Map"
                                            // onClick={calcul}
                                            >
                                                <Map fontSize="small" />
                                            </IconButton>
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>

            <div>

                <br />
                <br />
                <br />
                {imageUrl ? (

                    <a href={imageUrl} download>
                        <Typography> Telecharger l'image ici</Typography>
                        <img src={imageUrl} alt="img" />
                    </a>) : null}
            </div>
            <div className='map'>
                {
                    mapme === null ? null :

                        // <MapScreen mapme={mapme} magasin={magasin} directions={directions} />

                        <MapScreen mapme={mapme} magasin={magasin} />
                }
            </div>
        </>
    );
};

export default QrCode;