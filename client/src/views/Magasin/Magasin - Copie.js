/*eslint-disable*/
import React, { useEffect , useState} from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import useStyles from 'styles.js';
import List from 'components/magasin/listMagasin.js';
import AjoutMagasin from 'components/magasin/ajoutMagasin.js';


import axios from 'axios';
import { useHistory } from 'react-router';


export default function Magasin() {
  const history=useHistory()

  const [magasinList, setMagasinList] = useState([])
  
  const [magasin, setMagasin] = useState({ _id:'', nom_magasin:'', adresse_magasin:'',province:''})

    useEffect(() => {
    axios.get('http://localhost:5000/magasin').then((allMagasin) => {
      setMagasinList(allMagasin.data);
    })
  }, []);
  
  //supr
  
  const deleteMagasin = (id) => {
        axios.delete(`http://localhost:5000/magasin/${id}`).then(() => {
            window.location.reload(false);
        })
    }
    //edit
  const editerMagasin=(tepr)=>(e)=>{
    setMagasin(tepr)
    history.push(`/admin/magasin/${tepr._id}`)
  }
// //ajout1
//     const ajoutMagasin = async () => {
//      await axios.post('http://localhost:5000/magasin', magasin).then(() => {
//             window.location.reload(false);
//         })
//     }

// ajout2
  const ajoutMagasin = async () => {
    
    if(magasin._id===''){
      // await axios.post('http://localhost:5000/magasin', magasin).then(() => {
   
      // })
      alert('mety')
    }else{
  alert('ok')
      // await axios.put(`http://localhost:5000/magasin/${id}`, magasin).then((res)=>{
      // alert('ok')
      // })
    }
  }
  // read



  const classes = useStyles();
  return (
    <div className="Magasin">
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit" >
          <Typography className={classes.heding} variant="h2" align="center"  > Magasin JIRAMA</Typography>
        
          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="strect">

                <Grid item xs={12} sm={7}>
                  <AppBar className={classes.appBar} position="static" color="inherit" >

                    <List magasinList={magasinList} deleteMagasin={deleteMagasin} editerMagasin={editerMagasin} ajoutMagasin={ajoutMagasin} />

                  </AppBar>
                </Grid>

                <Grid item xs={12} sm={4} >
                  <AppBar className={classes.appBar} position="static" color="inherit" >
                    <AjoutMagasin magasin={magasin} setMagasin={setMagasin} ajoutMagasin={ajoutMagasin}/>
                  </AppBar>
                </Grid>
                {/* <Grid item xs={12} sm={4} >
                  <AppBar className={classes.appBar} position="static" color="inherit" >
                    <Modifier />
                  </AppBar>
                </Grid> */}
              </Grid>
            </Container>
          </Grow>
        </AppBar>
      </Container>

    </div>
  )
}
