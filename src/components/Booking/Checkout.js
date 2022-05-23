import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useParams } from 'react-router-dom';
import carService from '../../services/car.service';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Chỗ mong muốn', 'Điểm đón trả', 'Nhập thông tin'];



const theme = createTheme();

export default function Checkout() {

    // My code 
    //const { id } = useParams();

    const initialValues = {
      fullname: '',
      phone: '+84',
      email: '',
      cccd: '',
      note: '',
    };

    const id = 11;

    const [car, setCar] = React.useState();
    const [journeys, setJourneys] = React.useState([]);
    const [basicInfor, setBasicInfor] = React.useState(initialValues);

    const getCar = (id) => {
        carService
          .getCarSeat(id)
          .then((response) => {
            setCar(response.data.data.car);
            setJourneys(response.data.data.journeys);
            console.log(response.data.data.journeys);
          })
          .catch((e) => {
            console.log(e);
        });
    };

    console.log(journeys);
    
    React.useEffect(() => {
    getCar(id);
    }, [id]);

    const handleSubmitBasicInfor = (data) => {
      console.log("submit main", data);
      setActiveStep(1);
    }

    const handleAddress = (data) => {
      console.log("handle Address", data);
      setActiveStep(2);
    }





    // end


  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm {...car}/>;
      case 1:
        return <PaymentForm journeys={journeys} handleAddress={handleAddress}/>;
      case 2:
        return <Review infor={basicInfor} onSubmit={handleSubmitBasicInfor}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <div class="card mb-3">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img
                        src={car?.image}
                        class="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body h-100 position-relative">
                        <div class="d-flex align-items-center justify-content-between">
                          <h5 class="card-title">Nhà Xe {car?.name}</h5>
                          <span class="badge rounded-pill bg-info text-dark">
                            {car?.price}
                          </span>
                        </div>
                        <p class="card-text">
                          <small class="text-muted">
                            Limousine giường
                          </small>
                        </p>
                        <div class="from-to d-flex justify-content-start">
                          <svg
                            class="TicketPC__LocationRouteSVG-sc-1mxgwjh-4 eKNjJr"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="74"
                            viewBox="0 0 14 74"
                          >
                            <path
                              fill="none"
                              stroke="#787878"
                              stroke-linecap="round"
                              stroke-width="2"
                              stroke-dasharray="0 7"
                              d="M7 13.5v46"
                            ></path>
                            <g fill="none" stroke="#484848" stroke-width="3">
                              <circle
                                cx="7"
                                cy="7"
                                r="7"
                                stroke="none"
                              ></circle>
                              <circle cx="7" cy="7" r="5.5"></circle>
                            </g>
                            <path
                              d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
                              fill="#787878"
                            ></path>
                          </svg>
                          <div class="from-to-content">
                            <div class="content from d-flex">
                              <div class="hour">{car?.departure_time}</div>
                              <div class="place">• Bến xe {car?.station}</div>
                            </div>
                            <div class="duration">12h25m</div>
                            <div class="content to d-flex">
                              <div class="hour">{car?.arrival_time}</div>
                              <div class="place">• Bến xe {car?.station_to}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Thông Tin Đặt Vé
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Quay lại
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Đặt vé' : 'Tiếp tục'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}