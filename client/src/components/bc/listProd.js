/*eslint-disable*/
import { Button } from '@material-ui/core'
import React, {useState} from 'react'
//Tableau
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper';

import UpdateIcons from '@material-ui/icons/Update'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { withStyles, makeStyles } from '@material-ui/core/styles';

// import List from 'components/bc/ajoutBc'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#060f94',
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



export default function ListProd({ listProd , ajouterPanier, commande, reduire,supprimer}) {

  const classes = useStyles();
 const masks = ['ref_prod', 'nom_prod', 'type_prod','unite_prod','etat_stock']
 const titre= ['Reference produit','Nom produit','Type','Unite','Stock']

 

 return (<>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>

          <StyledTableRow>

            {titre.map((mask, i) => (
              <StyledTableCell key={i}>{mask}</StyledTableCell>
            ))}
            <StyledTableCell>Edition</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {listProd.map((list, key) => (
            <StyledTableRow key={key}>
              {masks.map((mask, i) => (
                <StyledTableCell key={i}>{list[mask]}</StyledTableCell>
              ))}
              <StyledTableCell>
                
               
                <button aria-label="Ajouter" className={classes.margin}
                 onClick={(e) => ajouterPanier(e, key)}
                  // onClick={adds(list)}
                 >
                 +
                </button>

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
      
      <h3>Commande</h3>
      {JSON.stringify(commande)}
      {/* <List commande={commande}/> */}
      
      {/* Listes des commandes:
      
      {commande["listes"].map((ls, i) => (
        <p key={i}>
           Produit: {ls.nom_prod} - Type: {ls.type_prod} - Quantites: {ls.quantite + ' ' + ls.unite_prod}
          {"\t \t"}
          <input
            type="range"
            min="1"
            max={ls.etat_stock}
            value={ls.quantite}
            onChange={(e)=>reduire(e, ls)}
            />
          {"\t \t"}
          <button onClick={() => supprimer(ls._id)}>-</button>
        </p>
      ))}
      <button>Enregistrer</button> */}
      </>
  )
}

