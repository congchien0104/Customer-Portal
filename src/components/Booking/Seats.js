import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import carService from "../../services/car.service";
import { Button } from "@mui/material";
// import EventSeatSharpIcon from '@mui/icons-material/EventSeatSharp';
import seat_img from "../../img/seat-img.png";
import "./seat.css";

export default function Seats(props) {
  const { car, positions, onSubmit } = props;
  console.log("car: ", car);
  console.log("car:positions ", positions);


  const [choose, setChoose] = React.useState([]);
  const [amount, setAmout] = React.useState(0);

  //const [positions, setPositions] = React.useState([]);
  const [flag, setFlag] = React.useState([]);



  const handleSeat = async (e) => {
    if (e.target.checked) {
      await setChoose([...choose, e.target.name]);
    } else {
      await setChoose(choose.filter((name) => name !== e.target.name));
    }
  }

  React.useEffect(() => {
    setAmout(choose.length * 200000)
  }, [choose]);

  const handleSubmit = async () => {
    console.log("choose", choose);
    await onSubmit({ choose: choose, amount: amount });
  }

  var temp = [];
  var result = [];
  React.useEffect(() => {
    console.log(positions)
    if(positions.length > 0){

     for(var i=0; i< positions.length; i++){
       console.log(positions[i].position.split(","));
      temp = positions[i].position.split(",");
      result = result.concat(temp);
     }
     setFlag(result);
      console.log(result);
      console.log(result.includes("A2"));
    }
  }, [positions || []]);

  return (
    <React.Fragment>
      <div className="seat-placement row row-cols-6 mb-4 text-center">
        {car?.carseats &&
          car?.carseats?.map((seat, index) => (
            <div className="col mb-3 seat-col">
              <label for={seat.id} style={{"display":"inline"}}>
                <input
                  style={{"display":"none"}}
                  type="checkbox"
                  id={seat.id}
                  name={seat.name}
                  className="seat-checkbox"
                  disabled={flag.includes(seat.name)}
                  onChange={(e) => handleSeat(e)}
                />
                <img src={seat_img} className="seat-img" width="30%" alt="seat"/>
              </label>
            </div>
          ))}
      </div>
      <div className="">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <Typography variant="h5" gutterBottom>
            Số lượng
          </Typography>
          <span className="badge badge-secondary badge-pill">{choose.length}</span>
        </h4>
        <ul className="list-group mb-3">
          {
            choose && choose.map((item) => (
              <li className="list-group-item d-flex justify-content-between lh-condensed" >
                <div className="text-success">
                  <h6 className="my-0">{item}</h6>
                </div>
                <span className="text-muted">{car.price}</span>
              </li>
            ))
          }
          {
            <li className="list-group-item d-flex justify-content-between">
              <span>Tổng giá (VND)</span>
              <strong>{amount}</strong>
            </li>
          }
        </ul>
      </div>
      <Button
        variant={'contained'}
        fullWidth
        type="submit"
        onClick={handleSubmit}
      //endIcon={<ArrowForwardIosIcon sx={{ height: '14px' }} />}
      >
        Tiếp tục
      </Button>
    </React.Fragment>
  );
}
