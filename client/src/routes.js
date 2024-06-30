/*eslint-disable*/
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LibraryBooks from "@material-ui/icons/Assignment";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Language from "@material-ui/icons/Language";
import Mag from "@material-ui/icons/GroupSharp"
import Prod from "@material-ui/icons/ShoppingBasket"
import Detail from "@material-ui/icons/ListRounded"
import Det from "@material-ui/icons/ViewList"
import Liv from "@material-ui/icons/LocalShipping"
// import DashboardPage from "views/Dashboard/Dashboard.js";
import Maps from "views/Maps/Maps.js";
import AdminPage from "views/Admin/Admin";
import MagasinierPage from "views/Magasinier/Magasinier";
import MagasinPage from "views/Magasin/Magasin.js";
import ProduitPage from "views/Produit/Produit.js"

import BonCommande from "views/Bon/CommandeList";
// import HomeScreen from "Screens/HomeScreen";
// import ProduitScreen from "Screens/ProduitScreen";
// import CartScreen from "Screens/CartScreen";
import DashboardPage from "views/Dashboard/Tableaudebord"
// import Hidden from "@material-ui/core/Hidden";
import CommandeScreen from "Screens/CommandeListScreen";
import Livraison from "views/Bon/bonLivraison"
import LivraisonScreen from "Screens/livraisonScreen";
import Test from "views/Test/Test"
import DirectionRoute from "views/App";
const user = JSON.parse(localStorage.getItem('profile'));

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Tableau de bord",
  //    icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin",
  // },
  {
    path: "/tableaudebord",
    name: "Tableau de bord",
     icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/Admin",
    name: "Administrateur",
    icon: Person,
    component: AdminPage,
    layout: "/admin",
  },
   {
    path: '/Magasin/',
    name: "Magasin",
    icon: ShoppingCart,
    component: MagasinPage,
    layout: "/admin",
  },
  {
    path: "/Magasinier/",
    name: "Magasinier",
    icon: Mag,
    component: MagasinierPage,
    layout: "/admin",
  },

  {
    path: "/Produit/",
    name: "Produit",
    icon: Prod,
    component: ProduitPage,
    layout: "/admin",
  },
  // {
  //   path: "/qrcode",
  //   name: "Qrcode",
  //   icon: LibraryBooks,
  //   component: Qrcode,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Bon ex",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin",
  // },
  {
   path: "/commande",
   name: "Bon de commandes",
   icon: LibraryBooks,
   component: BonCommande,
   layout: "/admin",
 }, 
  {
   path: "/commandeScreen/:id",
   name: "Commande Details",
   icon: Detail,
   component: CommandeScreen,
   layout: "/admin",
 },
  {
    path: "/livraison",
    name: "Bon de livraison",
    icon: Liv,
    component: Livraison,
    layout: "/admin",
  },
  {
    path: "/livraisonScreen/:id",
    name: "Bon de livraison details",
    icon: Det,
    component: LivraisonScreen,
    layout: "/admin",
    
  },
  
  // {
  //   path: "/notifications",
  //   name: "Profil",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin",
  // },
  // {
  //   path: "/Ajout",
  //   name: "Ajout",
  //   icon: Language,
  //   component: AjoutPage,
  //   layout: "/admin",
  // },

];

export default dashboardRoutes;
