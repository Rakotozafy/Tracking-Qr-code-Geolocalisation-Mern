/*eslint-disable*/
import React from 'react';
import "./CartItem.css"
import { Link } from 'react-router-dom';
import logo from "assets/img/jirama.png";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles'


export default function CartItem({ item, qteChange, remove }) {
    const classes = useStyles();
    return (

        <div className={classes.stats}>

            <div className="cartitem">
                <Link to={`/admin/produitScreen/${item.produit}`} className="cartitem__name">
                    <p>  <strong>
                        {item.nom_prod}
                    </strong>
                    </p>
                </Link>

                <p className="cartitem__reference"> {item.ref_prod} </p>
                <p className="cartitem__reference"> {item.type_prod} </p>
                <div className="cartitem__image">

                    <input
                        type="range"
                        min="1"
                        max={item.etat_stock}
                        value={item.qte}
                        onChange={(e) => qteChange(item.produit, e.target.value)}
                    />
                </div>
                <p className="cartitem__reference"> {item.qte} </p>
                <p className="cartitem__reference"> {item.unite_prod} </p>

                <IconButton aria-label="Suprimer"   >
                    <DeleteIcon fontSize="small" onClick={() => remove(item.produit)} />
                </IconButton>
            </div>
        </div>

    )
}

// export default CartItem;
