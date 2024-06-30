/*eslint-disable*/
import Dashboard from "@material-ui/icons/Dashboard";
import Language from "@material-ui/icons/Language";
import Shop from "@material-ui/icons/LocalGroceryStore"
import Com from "@material-ui/icons/AssignmentTurnedIn"
import Cmd from "@material-ui/icons/AmpStories"
import Pro from "@material-ui/icons/ShoppingBasket"
import Prod from "@material-ui/icons/List"

import DashboardPage from "views/Dashboard/Dashboard.js";

import BonCommande from "views/Bon/bonCommande";
import HomeScreen from "Screens/HomeScreen";
import ProduitScreen from "Screens/ProduitScreen";
import CartScreen from "Screens/CartScreen";
import CommandeScreen from "Screens/CommandeScreen";


const clientRoutes = [
    // {
    //     path: "/dashboard",
    //     name: "Tableau de bord",
    //     icon: Dashboard,
    //     component: DashboardPage,
    //     layout: "/client",
    // },
    {
        path: "/commande",
        name: "Commandes",
        icon: Com,
        component: BonCommande,
        layout: "/client",
    },
    {
        path: "/commandeScreen/:id",
        name: "Commande Details",
        icon: Cmd,
        component: CommandeScreen,
        layout: "/client",
    },
    {
        path: "/produitList",
        name: "Produits",
        icon: Pro,
        component: HomeScreen,
        layout: "/client",
    },
    {

        path: "/produitScreen/:id",
        name: "Produit details",
        icon: Prod,
        component: ProduitScreen,
        layout: "/client",

    },
    {
        path: "/CartScreen",
        name: "Panier",
        icon: Shop,
        component: CartScreen,
        layout: "/client",
    },


];

export default clientRoutes;
