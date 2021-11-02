import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import ReplayIcon from '@mui/icons-material/Replay';

import {base, cryptoCurrency} from './common/APIUtils';
import './App.css';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App = (props) => {
  // State Management
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState('btc');


  // Event Functions
  const handleCryptoChange = (event) => {
    setCurrency(event.target.value);
    reloadPrices(event.target.value);
  };

  function reloadPrices(curr) {
    fetch(`${base}/compare/${curr}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      setData(data);
      setIsLoaded(true);
      console.log(data);
    })
    .catch((error) => {
      setIsLoaded(true);
      setError(error);
    });
  }

  useEffect(() => {
    reloadPrices(currency);
  }, []);


  // Render Page
  if (error) {
    return <div>{error.message}</div>;
  } else if (!isLoaded) {
    return <div></div>;
  } else {
    return (
      <div className="App">
        <h2>
          Compare Crypto Exchanges
        </h2>
        <Box>
          <FormControl style={{width: '150px'}}>
            <Select
              value={currency}
              onChange={handleCryptoChange}
            >
            {cryptoCurrency.map((data, index) => (
              <MenuItem key={index} value={data.abbr}>{data.name}</MenuItem>
            ))}
            </Select>
          </FormControl>
        </Box>

        <div>Recommendation: </div>
        <Container maxWidth="sm">
          <div style={{display: 'inline', paddingRight: '20px'}}>
            Buy: {data['buy']}
          </div>
          <div style={{display: 'inline'}}>
            Sell: {data['sell']}
          </div>
        </Container>

        <Container maxWidth="lg" class="cont">
          <Button onClick={() => reloadPrices(currency)} style={{float: 'right'}}>
            <ReplayIcon/>
          </Button>
          <Grid container spacing={2} style={{height: '300px'}}>
            <Grid item xs={6} md={6}>
              <Item style={{height: '75%'}}>
                <h2>
                  Coinbase
                </h2>
                <div>
                  Buy Price: {data['coinbase']['buy']}
                </div>
                <div>
                  Sell Price: {data['coinbase']['sell']}
                </div>
              </Item>
            </Grid>
            <Grid item xs={6} md={6}>
              <Item style={{height: '75%'}}>
                <h2>
                  Crypto.com
                </h2>
                <div>
                  Buy Price: {data['crypto']['buy']}
                </div>
                <div>
                  Sell Price: {data['crypto']['sell']}
                </div>
              </Item>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
