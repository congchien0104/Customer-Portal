import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import carService from "../../services/car.service";

export default function AddressForm(props) {
    const car = props;
    console.log("car: ", car);
  const id = 11;
  //const [seats, setSeats] = React.useState(car.carseats);
  const [choose, setChoose] = React.useState([]);
  const [amount, setAmout] = React.useState(0);

//   const getCar = (id) => {
//     carService
//       .getCarSeat(id)
//       .then((response) => {
//         setSeats(response.data.data.car.carseats);
//         console.log(response.data.data.car);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   React.useEffect(() => {
//     getCar(id);
//   }, [id]);

  const handleSeat = async (e) => {
    if(e.target.checked){
      await setChoose([...choose, e.target.name]);
    }else{
      await setChoose(choose.filter((name) => name !== e.target.name));
    }
  }

  React.useEffect(() => {
    setAmout(choose.length*200000)
  }, [choose]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Chỗ mong muốn
      </Typography>
      <Grid container spacing={3}>
        <div class="container">
          <div class="row row-cols-3">
            {car.carseats &&
              car.carseats.map((seat, index) => (
                <div class="col">
                  <input
                    type="checkbox"
                    id={seat.id}
                    name={seat.name}
                    //disabled={flag.includes(seat.name)}
                    onChange={(e) => handleSeat(e)}
                  />
                  <label for={seat.id}>{seat.name}</label>
                </div>
              ))}
          </div>
        </div>
      </Grid>
      <Grid container spacing={3}>
          <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Số vé</span>
              <span class="badge badge-secondary badge-pill">{choose.length}</span>
            </h4>
            <ul class="list-group mb-3">
              {
                choose && choose.map((item) => (
                  <li class="list-group-item d-flex justify-content-between lh-condensed" >
                    <div class="text-success">
                      <h6 class="my-0">{item}</h6>
                    </div>
                    <span class="text-muted">{car.price}</span>
                  </li>
                ))
              }
              {
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Tổng giá (VND)</span>
                    <strong>{amount}</strong>
                  </li>
              }
            </ul>
          </div>
      </Grid>
    </React.Fragment>
  );
}
