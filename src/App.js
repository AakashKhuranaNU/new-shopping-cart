import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import "rbx/index.css";
import {  Container, Message, Title } from "rbx";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
//import 'typeface-roboto'
//import { render } from '@testing-library/react';


const useStyles = makeStyles({
  card: {
    variant: "outlined",
    textAlign: "center",
    height: 700
  },
  media: {
    height:480
  },
  list: {
        width: 500,
      },
});

// const useStyles = makeStyles(theme => ({
//   card: {
//     variant: "outlined",
//     textAlign: "center",
//     height: 700,
//   },
//   media: {
//     height: 500,
//   },
//   list: {
//     width: 500,
//   },
// }));

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const Banner = ({ user }) => (
  <React.Fragment>
    { user ? <Welcome user={ user } /> : <SignIn /> }
  </React.Fragment>
);

const useSelected = () => {
  var prod=[];
  const [selectedProduct, setSelectedProducts] = useState([]);
  console.log(selectedProduct);
  console.log("print");
  var i=0;  

  

  const addItemCart = (itm, size,inv,setInv) => {
    
    setSelectedProducts(
      selectedProduct.find(product => product.sku === itm.sku && product.size === size) ?
        selectedProduct.map(product =>
          product.sku === itm.sku && product.size === size  ?
            { ...product, quantity: product.quantity + 1 }
            :
            product
        )
        :
        [{ ...itm, size, quantity: 1 }].concat(selectedProduct)
    );
    var inve=inv;
    inve[itm.sku][size]-=1
    setInv(inve);        
      // console.log(inv[product.sku]);
    alert("Added to Cart...\n"+"Click cart icon to see your cart")
  }

  const removeItemCart = (itm,inv,setInv) => {  
    for(i=0;i<selectedProduct.length;++i)
    {
      if(itm.sku != selectedProduct[i].sku)prod.push(selectedProduct[i]);
      if(itm.sku === selectedProduct[i].sku && itm.size!=selectedProduct[i].size)prod.push(selectedProduct[i]);
    }
    setSelectedProducts(prod);
    var inve=inv;
    inve[itm.sku][itm.size]+=itm.quantity;
    setInv(inve);
    prod=[];
    alert("Item Removed from Cart")
        
  }

  const removeItemCart2 = (itm) => {  
    for(i=0;i<selectedProduct.length;++i)
    {
      if(itm.sku != selectedProduct[i].sku)prod.push(selectedProduct[i]);
      if(itm.sku === selectedProduct[i].sku && itm.size!=selectedProduct[i].size)prod.push(selectedProduct[i]);
    }
    setSelectedProducts(prod);
    // alert("done");

  }

  
  return [selectedProduct, addItemCart ,removeItemCart,removeItemCart2];
}

const Items = ({product, addSelectedProduct,inv,setInv}) => {
  console.log("hereh");
  // console.log(inv[product.sku].S);
  const classes = useStyles();
  const [itemSize, setItemSize] = useState("");
  // console.log(inv[product.sku].S);
  return (
    <Grid item s = {3}>
      <Card className = {classes.card}>
        <CardActionArea>
          <CardMedia className = {classes.media} image = {'./data/products/' + product.sku + '_1.jpg'} />
          <CardContent>
            <Typography variant = "h6">
              {product.title}
            </Typography>
            <Typography variant = "subtitle1">
              Details: {product.description}
            </Typography>
            <Typography variant = "h6">
              {product.currencyFormat}{product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
        </CardActions> */}

          
          {inv[product.sku].S ?<SelectSize setItemSize = {setItemSize} selectedSize = {itemSize} size = "S" /> :  console.log("unavailable")}
          {inv[product.sku].M ?<SelectSize setItemSize = {setItemSize} selectedSize = {itemSize} size = "M" /> :  console.log("unavailable")}
          {inv[product.sku].L ?<SelectSize setItemSize = {setItemSize} selectedSize = {itemSize} size = "L" /> :  console.log("unavailable")}
          {inv[product.sku].XL ?<SelectSize setItemSize = {setItemSize} selectedSize = {itemSize} size = "XL" /> : console.log("unavailable")}
          
         
          {(inv[product.sku].S || inv[product.sku].M || inv[product.sku].L || inv[product.sku].XL)?  <Button variant="contained" onClick={() => 
            itemSize ? addSelectedProduct(product, itemSize,inv,setInv) : alert("Select t-shirt size")}>
            Add to Cart
          </Button>
          :
         <div>Out of Stock</div>}
    

        
      </Card>
    </Grid>)
};

const SelectSize = ({ setItemSize, selectedSize, size }) => {
  return (
      size === selectedSize ?
          <Button variant = "contained" color = "secondary" onClick={() => setItemSize(size)}>
              {size}
          </Button>
          :
          <Button variant = "contained" onClick={() => setItemSize(size)}>
              {size}
          </Button>

  );
}

const firebaseConfig = {
  apiKey: "AIzaSyConH3BuRJyl5K3aokJ7NNG44gX4AviqvY",
  authDomain: "react-shopping-cart-49f12.firebaseapp.com",
  databaseURL: "https://react-shopping-cart-49f12.firebaseio.com",
  projectId: "react-shopping-cart-49f12",
  storageBucket: "react-shopping-cart-49f12.appspot.com",
  messagingSenderId: "162113176965",
  appId: "1:162113176965:web:032113f1264177e2a3f0ec"
}
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const cartCheckout = (myData, inv,remSelectedProduct) => {
  console.log("hell1");
  console.log(myData);
  console.log(inv);
  db.transaction(inv => {
      if (inv) {
          Object.values(myData)
              .forEach(item => {
                  console.log(item);
                  remSelectedProduct(item);
                  inv[item.sku][item.size] -= item.quantity;
              })
      }
      return inv;
  });
  // setco("yesy")
  
  alert("You Checked Out. Awesome!")
}

const App = () => {

  const classes = useStyles();
  const [data, setData] = useState({});
  const [user, setUser] = useState(false);
  const [inv, setInv] = useState({});
  const [co, setco] = useState('');
  const products = Object.values(data);
  const invent=Object.values(inv)
  const [openCart, setOpenCart] = useState(false);
  const [selectedProduct, addSelectedProduct,delSelectedProduct,remSelectedProduct] = useSelected();
  const myData = selectedProduct;
  console.log("strt");
  console.log(inv);
  // console.log(prod)
  console.log(selectedProduct);
  // console.log(inv[12064273040195392])
  console.log(data);
  // console.log(products[0].sku);
  // console.log(inv.map(inv));
  console.log(invent);
  console.log("end");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  


 

  useEffect(() => {
    const handleData = async snap => {
      console.log(snap)
      console.log("above is snap value")
      if (snap.val()) setInv(snap.val());
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };
  

  const invsize = (produ,inve,inval) => {  
    var i=0;
    for(i=0;i<inve.length;++i)
    {
      if(inve[i]===produ.sku)return inval[i];
    }    

  }

 

  const sideList =(user,side)  => (
    <div className = {classes.list} role = "presentation" onClick = {toggleDrawer(side, false)} onKeyDown = {toggleDrawer(side, false)}>
      <List>
        {myData.map(myData => 
        <ListItem>
          <img className = {classes.cartmedia} src = {'./data/products/' + myData.sku + '_2.jpg'} />
          <br/>Name: {myData.title}
          <br/>Price: {myData.currencyFormat}{myData.price}
          <br/>Size: {myData.size}
          <br/>Quantity: {myData.quantity}
          <Divider/>
          <IconButton aria-label="delete" onClick={()=> {delSelectedProduct(myData,inv,setInv)}} >
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>								
          </IconButton>
        </ListItem>)}
        {console.log("test")}
        {console.log(inv)}
        {console.log(myData)  }
        {!user ? "Please login first to checkout!" : 
              <Button onClick={() => cartCheckout(myData,inv,remSelectedProduct  )}>Checkout</Button>}
        {/* <button >Delete from Cart</button> */}
        
      </List>
    </div>
  );

  return (

    <React.Fragment>
      <Banner user={ user } />
      <AppBar position="static" className = {classes.appbar} color='secondary'>
        <Toolbar>
          <IconButton onClick = {toggleDrawer('right', true)} edge = "end" className = {classes.menuButton} color = "inherit" aria-label = "menu">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>          
         </IconButton>
          <Drawer anchor = "right" open = {state.right} onClose={toggleDrawer('right', false)}>
            {sideList(user,'right',inv)}

          </Drawer>
          <Typography align="right" variant = "h5" className = {classes.title}>
            REACT CART
          </Typography>
        </Toolbar>
      </AppBar>
      <h2 align='center'>REACT SHOPPING CART </h2>
      <Grid container spacing = {5} justify = "center">
        {products.map(product => <Items product = {product} addSelectedProduct = {addSelectedProduct} inv={inv} setInv={setInv} ></Items>)}     
      </Grid>
    </React.Fragment>
    // inv={inv.find(product.sku === inv.sku)}
  );
};

export default App;