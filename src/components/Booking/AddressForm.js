import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';

export default function AddressForm({ journeys, total, handleAddress }) {
  //const { journeys } = props;
  console.log("journey", journeys);
  console.log("total", total);

  const [start, setStart] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const handleChangeAddressGo = (e) => {
    console.log(e.target.value);
    setStart(e.target.value);
  }
  const handleChangeAddressTo = (e) => {
    console.log(e.target.value);
    setDestination(e.target.value);
  }

  const handleSubmit = async (values) => {
    console.log("dkm");
    try {
      await handleAddress({ start, destination });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Điểm đón
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="0"
            name="address_go"
            onChange={handleChangeAddressGo}
          >
            {
              journeys && journeys.map((item, index) => {
                if (!item.status) {
                  return (
                    <FormControlLabel key={index} value={item.address} control={<Radio />} label={item.time_hour + "  " + item.address} />
                  )
                }
              })
            }
          </RadioGroup>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Điểm trả
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="0"
            name="adrress_to"
            onChange={handleChangeAddressTo}
          >
            {
              journeys && journeys.map((item, index) => {
                if (item.status) {
                  return (
                    <FormControlLabel key={index} value={item.address} control={<Radio />} label={item.time_hour + "  " + item.address} />
                  )
                }
              })
            }
          </RadioGroup>
        </Grid>
        {/* <div className='row'>
          <div className='col-6'>
            
          </div>
          <div className='col-6'>

          </div>
        </div> */}
        <Grid container sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            Tổng tiền: {total}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained"
              type="submit"
              onClick={handleSubmit}              
              fullWidth
            >
              Tiếp tục
            </Button>
          </Grid>
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}