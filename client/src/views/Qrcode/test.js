/*eslint-disable*/
import React, { useState, useRef } from 'react';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import Hidden from "@material-ui/core/Hidden";
// core components

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function Qrcode() {
  
  const classes = useStyles();


const [text, setText] = useState('');
const [datas, setDatas]=useState([
    {_id:1, nom:'test',prenom:'tom'},
    {_id:2, nom:'rakoto',prenom:'benja'},
    {_id:3, nom:'ravoavy',prenom:'babs'},
])
const [infos, setInfos]=useState({_id:0, nom:'', prenom:''});

let masks = Object.keys(infos)

const tepr = (e)=>{
    let {name, value}=e.target
    setInfos({
        ...infos,
        [name] : value
    })
}

const [imageUrl, setImageUrl] = useState('');
const [scanResultFile, setScanResultFile] = useState('');
const [scanResultWebCam, setScanResultWebCam] = useState('');
const qrRef = useRef(null); 


const generateQrCode = async (data)=> {
    // e.preventDefault()
  try {
    const response = await QRCode.toDataURL(Object.values(data).join(','));
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
    setScanResultFile(result);
  }
}
const onScanFile = () => {
  qrRef.current.openImageDialog();
}
const handleErrorWebCam = (error) => {
  console.log(error);
}
const handleScanWebCam = (result) => {
  if (result) {
    setScanResultWebCam(result);
  }
}

React.useEffect(()=>{
    handleScanFile
},[])

  return (
      <div>
          {datas.map((data, i)=>(
              <p key={i}>{JSON.stringify(data)} - 
                <Button className={classes.btn} variant="contained" color="primary" onClick={() => generateQrCode(data)}>Generate</Button>
            </p>
          ))}
          <hr/>

                {masks.map((mask, i)=>(
                    <TextField label={mask} key={i} onChange={tepr} name={mask}></TextField>
                ))}
                {JSON.stringify(infos)}
                {/* <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)} /> */}
                <Button className={classes.btn} variant="contained"
                  color="primary" onClick={() => generateQrCode()}>Generate</Button>
                <br />
                <br />
                <br />
                {imageUrl ? (
                  <a href={imageUrl} download>
                    <img src={imageUrl} alt="img" /> Download 
                  </a>) : null}


                <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
                <QrReader
                  ref={qrRef}
                  delay={300}
                  style={{ width: '100%' }}
                  onError={handleErrorFile}
                  onScan={handleScanFile}
                  legacyMode
                />
                <h3>Scanned Code: {scanResultFile}</h3>
                <h3>Qr Code Scan by Web Cam</h3>
                <QrReader
                  delay={300}
                  style={{ width: '100%' }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                />
                <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
        </div>
  );
}
