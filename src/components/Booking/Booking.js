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
import Seats from './Seats';
import AddressForm from './AddressForm';
import InformationForm from './InformationForm';
import { useParams } from 'react-router-dom';
import carService from '../../services/car.service';
import reservationService from '../../services/reservation.service';

const steps = ['Chỗ mong muốn', 'Điểm đón trả', 'Nhập thông tin'];



const theme = createTheme();

export default function Booking() {

  // My code 
  const { id } = useParams();

  const initialValues = {
    fullname: '',
    phone: '+84',
    email: '',
    cccd: '',
    note: '',
  };
  const [car, setCar] = React.useState();
  const [journeys, setJourneys] = React.useState([]);
  const [information, setInformation] = React.useState(initialValues);

  const [total, setTotal] = React.useState(0);
  const [pickup, setPickup] = React.useState();
  const [dropoff, setDropoff] = React.useState();

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





  // My phase 1
  const handleSubmitSeat = (data) => {
    console.log("cong chien", data);
    setTotal(data?.amount);
    setStep(1);
  }

  // My phase 2

  const handleAddress = (data) => {
    console.log("handle Address", data);
    setPickup(data?.start);
    setDropoff(data?.destination);
    setStep(2);
  }

  // My phase 3

  const handleSubmitInformation = (values) => {
    console.log("submit main", values);


    var data = {
      amount: total,
      carId: car.id,
      quantity: 2,
      reservations_date: new Date(),  // change reservation_date
      fullname: values.fullname,
      phone: values.phone,
      email: values.email,
      cccd: values.cccd,
      pickup_place: pickup || "Eahleo",
      dropoff_place: dropoff || "Thu Duc",
      arr: ['A1', 'A2'],
      status: 'active',
    }
    console.log(data);
    reservationService.paypal(data)
      .then((response) => {
        console.log(response.data);
        window.location.href = response.data.data;
      })
      .catch((e) => {
        console.log(e);
      });

    setStep(5);
  }







  // end




  const [step, setStep] = React.useState(0);

  // const [activeStep, setActiveStep] = React.useState(0);

  // const handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  // const getStepContent = (step) => {
  //   switch (step) {
  //     case 0:
  //       return <AddressForm {...car}/>;
  //     case 1:
  //       return <AddressForm journeys={journeys} handleAddress={handleAddress}/>;
  //     case 2:
  //       return <Review infor={basicInfor} onSubmit={handleSubmitBasicInfor}/>;
  //     default:
  //       throw new Error('Unknown step');
  //   }
  // }

  const renderPage = () => {
    switch (step) {
      case 0:
        return (
          <Seats
            car={car}
            onSubmit={handleSubmitSeat}
          />
        );
      case 1:
        return (
          <AddressForm
            journeys={journeys}
            total={total}
            handleAddress={handleAddress}
          />
        );
      case 2:
        return (
          <InformationForm
            information={information}
            onSubmit={handleSubmitInformation}
          />
        );
      default:
        return <div></div>
    }
  };


  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline />
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
      </AppBar> */}
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <div class="card mb-3 mt-3">
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
                  <h5 class="card-title fs-3 fw-bolder">Nhà Xe {car?.name}</h5>
                  <span class="badge rounded-pill bg-info text-dark fs-5 text-center">
                    {car?.price} VNĐ
                  </span>
                </div>
                <p class="card-text text-muted">Limousine {car?.capacity} giường</p>
                <p class="card-text hour">{car?.departure_time}</p>
                <p class="card-text place">Bến xe {car?.station}</p>
                <p class="card-text hour">{car?.arrival_time}</p>
                <p class="card-text place">Bến xe {car?.station_to}</p>
              </div>
            </div>
          </div>
        </div>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Thông Tin Đặt Vé
          </Typography>
          <Stepper step={step} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {renderPage()}
          </React.Fragment>
          {/* <React.Fragment>
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
          </React.Fragment> */}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}