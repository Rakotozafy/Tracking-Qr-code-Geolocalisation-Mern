/*eslint-disable*/
import { Button } from '@material-ui/core'
import React from 'react'
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

export default function ListProduit({ ListProduits, editer, deleteProduit }) {
  const classes = useStyles();
  const masks = ['ref_prod', 'nom_prod', 'type_prod', 'unite_prod', 'etat_stock']
  const titre = ['Reference', 'Nom', 'Type', 'Unite de mesure', 'Etat du stock']

  return (
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
          {ListProduits.map((list, key) => (
            <StyledTableRow key={key}>
              {masks.map((mask, i) => (
                <StyledTableCell key={i}>{list[mask]}</StyledTableCell>
              ))}
              <StyledTableCell>

                <IconButton aria-label="Suprimer" className={classes.margin} onClick={() => deleteProduit(list._id)} >
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="Edit" className={classes.margin} onClick={editer(list)} >
                  <UpdateIcons fontSize="small" />
                </IconButton>

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

