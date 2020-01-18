import React, { useEffect, useState } from 'react';
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

const useSelected = () => {
  const [selectedProduct, setSelectedProducts] = useState([]);
  const addItemCart = (itm, size) => {
    setSelectedProducts(
      selectedProduct.find(product => product.sku === itm.sku) ?
        selectedProduct.map(product =>
          product.sku === itm.sku ?
            { ...product, quantity: product.quantity + 1 }
            :
            product
        )
        :
        [{ ...itm, size, quantity: 1 }].concat(selectedProduct)
    );
  }
  return [selectedProduct, addItemCart];
}

const Items = ({product, addSelectedProduct}) => {
  
  const classes = useStyles();
  const [itemSize, setItemSize] = useState("");
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
        <CardActions>
         
        
          <SelectSize setItemSize = {setItemSize} selectedSize = {itemSize} size = "S" />
          <SelectSize setItemSize = {setItemSize} selectedSize = {itemSize} size = "M" />
          <SelectSize setItemSize = {setItemSize} selectedSize = {itemSize} size = "L" />
          <SelectSize setItemSize = {setItemSize} selectedSize = {itemSize} size = "XL" />

          <Button variant="contained" onClick={() => 
            itemSize ? addSelectedProduct(product, itemSize) : alert("Select t-shirt size")}>
            Add to Cart
          </Button>
        </CardActions>
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

const App = () => {

  const classes = useStyles();
  const [data, setData] = useState({});
  const products = Object.values(data);
  const [openCart, setOpenCart] = useState(false);
  const [selectedProduct, addSelectedProduct] = useSelected();
  const myData = selectedProduct;
  console.log(myData);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  useEffect(() => {
      const fetchProducts = async () => {
      const response = await fetch('/data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div className = {classes.list} role = "presentation" onClick = {toggleDrawer(side, false)} onKeyDown = {toggleDrawer(side, false)}>
      <List>
        {myData.map(myData => 
        <ListItem>
          <img className = {classes.cartmedia} src = {'./data/products/' + myData.sku + '_1.jpg'} />
          <br/>Name: {myData.title}
          <br/>Price: {myData.currencyFormat}{myData.price}
          <br/>Size: {myData.size}
          <br/>Quantity: {myData.quantity}
          <Divider/>
        </ListItem>)}
      </List>
    </div>
  );

  return (

    <React.Fragment>
      
      <AppBar position="static" className = {classes.appbar} color='secondary'>
        <Toolbar>
          <IconButton onClick = {toggleDrawer('right', true)} edge = "end" className = {classes.menuButton} color = "inherit" aria-label = "menu">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>          </IconButton>
          <Drawer anchor = "right" open = {state.right} onClose={toggleDrawer('right', false)}>
            {sideList('right')}

          </Drawer>
          <Typography align="right" variant = "h5" className = {classes.title}>
            REACT CART
          </Typography>
        </Toolbar>
      </AppBar>
      <h1 align='center'  >REACT SHOPPING CART </h1>
      <Grid container spacing = {5} justify = "center">
        {products.map(product => <Items product = {product} addSelectedProduct = {addSelectedProduct}></Items>)}     
      </Grid>
    </React.Fragment>
  );
};

export default App;


// const App = () => {

//   var car=[1,2,4,5];
//   const [data, setData] = useState({});
//   const [cart,addCart]=useAddtoCart();  
//   const products = Object.values(data);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await fetch("./data/products.json");
//       const json = await response.json();
//       setData(json);
//     };
//     fetchProducts();
//   }, []);

//   const val=useStyles(); 
 
//   return (

    
//     <React.Fragment>
//     <h1 align="center">Shopping Zone</h1>
//     <br />
//     {
//     /* <ul>
//       {products.map(product => <li key={product.sku}>{product.title}</li>)}
//     </ul> */}

//     {/* <div>{Page}
//     </div> */}
//     <div>
//     {/* <Column.Group>
//   {[1, 2, 3, 4, 5].map(i => (
//     <Column key={i}>
//        <Notification color="primary" textAlign="centered">
//         Column {i}
//         </Notification>

//     </Column>
//   ))}
// </Column.Group>
//     </div>
//     <div>
//     <Column.Group>
//   {products.map(i => (
//     <Column key={i.sku}>
//        <Notification color="primary" textAlign="centered">
//         Column {i.sku}
//         </Notification>

//     </Column>
//   ))}
// </Column.Group>
    
// <Column.Group>
//   {products.map(i => (
//     <Column key={i.sku}>

//        <Notification color="primary" textAlign="centered">
//        <Image.Container size={128}>
//         <Image src="./data/products/  " />
//         </Image.Container>
//         </Notification>

//     </Column>
//   ))}
// </Column.Group> */}
//  {
//   <Grid container spacing={1} direction="row" justify="center">
//   {products.map(i => ( 
//    <Grid item s={5} direction="row">
//    <Card className={val.card} variant='outlined' >
//       <CardActionArea>
//         <CardMedia className={val.media}
//           image={"./data/products/"+i.sku+"_1.jpg"}
//           title={i.title}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h6  " component="h3">
//             {i.title}
//           </Typography>
//           <Typography variant="body1"  component="h4">
//             Desc: {i.description}
//           </Typography>
//           <Typography variant="h5  " component="h3">
//             Price: {i.price}{i.currencyFormat}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
       
//         <Button size="extrasmall" color="primary" variant='contained'>
//           S
//         </Button>
//         <Button size="extrasmall" color="primary" variant='contained'>
//           M
//         </Button>
//         <Button size="extrasmall" color="primary" variant='contained'>
//           L
//         </Button>
//         <Button size="extrasmall" color="primary" variant='contained'>
//           XL
//         </Button>

//       </CardActions>
//     </Card>
//     <Button size="medium" variant="contained" onClick={addCart(i.sku)}>
//       Add to Cart
//     </Button>
//     </Grid>
//     ))}
//     </Grid>
// }
   
//     </div>
//     <div>Test123</div>
//     </React.Fragment> 
//   );
// };

// export default App;