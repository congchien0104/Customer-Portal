import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';

export default function PaymentForm({journeys, handleAddress}) {
    //const { journeys } = props;
    console.log("journey", journeys);

    const handleChangeAddressGo = (e) => {
      console.log(e.target.value);
    }
    const handleChangeAddressTo = (e) => {
      console.log(e.target.value);
    }

    const handleSubmit = async (values) => {
      console.log("dkm");
      try {
        await handleAddress(values);
      } catch(error) {
        console.log(error);
      }
    }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
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
                    if(!item.status) {
                        return (
                          <FormControlLabel key={index} value={index} control={<Radio />} label={ item.time_hour + "  " + item.address } />
                        )
                    }
                })
              }
          </RadioGroup>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
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
                    if(item.status) {
                        return (
                          <FormControlLabel key={index} value={index} control={<Radio />} label={ item.time_hour + "  " + item.address } />
                        )
                    }
                })
              }
          </RadioGroup>
          <Grid item container direction="column" xs={12} sm={6}>
            <Button variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                  sx={{ mt: 3, ml: 1 }}
            >
              Submit Address
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}