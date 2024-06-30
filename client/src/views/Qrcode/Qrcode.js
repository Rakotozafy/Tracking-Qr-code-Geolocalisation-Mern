/*eslint-disable*/
import React, { useState, useRef } from 'react';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';


function Qrcode() {
  const [text, setText] = useState(
    {
      produit: 'test',
      id: 456
    },

  );

  const [texta, setTexta] = useState('rabe');
  const [imageUrl, setImageUrl] = useState('');

  const [scanResultFile, setScanResultFile] = useState('');
  const [file, setFile] = useState('');

  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const classes = useStyles();
  const qrRef = useRef(null);


  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(JSON.stringify(text));
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
      const res = result.split(";");
      setScanResultFile(res[0]);
      setFile(res[1])

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
  return (
    <Container className={classes.conatiner}>
      <Card>
        <h2 className={classes.title}>Generate Download & Scan QR Code with React js</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)} />
              <Button className={classes.btn} variant="contained"
                color="primary" onClick={generateQrCode}>Generate</Button>
              <br />
              <br />
              <br />
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>) : null}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: '100%' }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
            
              <h3>Scanned Code result  0: {scanResultFile}</h3> 
              <h3>Scanned Code result  1: {file}</h3> 

              {/* <h2> produit : { JSON.stringify(scanResultFile)} </h2> */}

            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>Qr Code Scan by Web Cam</h3>
              <QrReader
                delay={300}
                style={{ width: '100%' }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
              <h3 id="demo">Scanned By WebCam Code: {scanResultWebCam}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20
  },
  btn: {
    marginTop: 10,
    marginBottom: 20
  }
}));
export default Qrcode;
