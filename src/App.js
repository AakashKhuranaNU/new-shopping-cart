import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import { render } from '@testing-library/react';


const useStyles = makeStyles({
  card: {
    maxWidth: 300,

  },
  media: {
    height:480
  },
});


// const Page=() => {

  
//     render(
//     <Card className={val.card}>
//       <CardActionArea>
//         <CardMedia
//           className={val.media}
//           image="./data/products/100_1.jpg"
//           title="Deadly Reptile"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Ugly Lizard
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//             across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//         <Button size="small" color="primary">
//           Learn More
//         </Button>
//       </CardActions>
//     </Card>
//     );
// }


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const val=useStyles(); 
 
  return (

    
    <React.Fragment>
    <h1 align="center">Shopping Zone</h1>
    <br />
    {
    /* <ul>
      {products.map(product => <li key={product.sku}>{product.title}</li>)}
    </ul> */}

    {/* <div>{Page}
    </div> */}
    <div>
    {/* <Column.Group>
  {[1, 2, 3, 4, 5].map(i => (
    <Column key={i}>
       <Notification color="primary" textAlign="centered">
        Column {i}
        </Notification>

    </Column>
  ))}
</Column.Group>
    </div>
    <div>
    <Column.Group>
  {products.map(i => (
    <Column key={i.sku}>
       <Notification color="primary" textAlign="centered">
        Column {i.sku}
        </Notification>

    </Column>
  ))}
</Column.Group>
    
<Column.Group>
  {products.map(i => (
    <Column key={i.sku}>

       <Notification color="primary" textAlign="centered">
       <Image.Container size={128}>
        <Image src="./data/products/  " />
        </Image.Container>
        </Notification>

    </Column>
  ))}
</Column.Group> */}
 {
  <Grid container spacing={1} direction="row" justify="center">
  {products.map(i => ( 
   <Grid item s={5} direction="row">
   <Card className={val.card} variant='outlined' >
      <CardActionArea>
        <CardMedia className={val.media}
          image={"./data/products/"+i.sku+"_1.jpg"}
          title={i.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6  " component="h3">
            {i.title}
          </Typography>
          <Typography variant="body1"  component="h4">
            Desc: {i.description}
          </Typography>
          <Typography variant="h5  " component="h3">
            Price: {i.price}{i.currencyFormat}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
       
        <Button size="extrasmall" color="primary" variant='contained'>
          S
        </Button>
        <Button size="extrasmall" color="primary" variant='contained'>
          M
        </Button>
        <Button size="extrasmall" color="primary" variant='contained'>
          L
        </Button>
        <Button size="extrasmall" color="primary" variant='contained'>
          XL
        </Button>


      </CardActions>
    </Card>
    </Grid>
    ))}
    </Grid>
    }
    </div>
    <div>Test123</div>
    </React.Fragment> 
  );
};

export default App;