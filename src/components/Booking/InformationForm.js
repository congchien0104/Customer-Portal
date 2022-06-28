import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';

const validationSchema = Yup.object({
  fullname: Yup.string()
    .required('Vui lòng nhập họ và tên'),
  phone: Yup.string()
    .required('Vui lòng nhập số điện thoại'),
  // cccd: Yup.string()
  //   .required('Vui lòng nhập CCCD/CMND'),
  email: Yup.string()
    .required('Vui long nhập email')
    .email("Không phải là một email"),
});




export default function InformationForm({
  information,
  onSubmit,
}
) {

  const [typePayment, setTypePayment] = React.useState();

  const handleSubmit = async (data) => {
    console.log(data);
    data.typePayment = typePayment;
    try {
      await onSubmit(data);
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      fullname: information.fullname || '',
      phone: information.phone || '',
      email: information.email || '',
      cccd: information.cccd || '',
      note: information.note || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const onFieldBlur = async (event: FocusEvent, fieldName: string) => {
    const target = event.target
    target.value = target.value?.trim()
    console.log(target.value);
    formik.handleChange(event)
    await formik.validateField(fieldName)
    formik.handleBlur(event)
  }

  const handlePaymentType = (e) => {
    console.log("type payment: ",e.target.value);
    setTypePayment(e.target.value);
  }



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Nhập thông tin
      </Typography>
      <Grid container spacing={3} component="form" onSubmit={formik.handleSubmit}>
        <Grid item xs={12}>
          <TextField
            label="Họ và Tên"
            fullWidth
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={(e) => onFieldBlur(e, 'fullname')}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={
              (formik.touched.fullname && formik.errors.fullname)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Số Điện Thoại"
            fullWidth
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={(e) => onFieldBlur(e, 'phone')}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={
              (formik.touched.phone && formik.errors.phone)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={(e) => onFieldBlur(e, 'email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              (formik.touched.email && formik.errors.email)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="CCCD/CMND"
            fullWidth
            name="cccd"
            value={formik.values.cccd}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Ghi Chú"
            fullWidth
            name="note"
            value={formik.values.note}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Hình thức thanh toán</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="1"
              name="radio-buttons-group"
              onChange={handlePaymentType}
            >
              <FormControlLabel value="0" control={<Radio />} label="Sử dụng Paypal để thanh toán" />
              <FormControlLabel value="1" control={<Radio />} label="Thanh toán trực tiếp khi lên xe" />
            </RadioGroup>
          </FormControl>
          {/* <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Sử dụng Paypal để thanh toán"
            sx={{ display: 'block' }}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Thanh toán trực tiếp tới nhà xe"
            sx={{ display: 'block' }}
          /> */}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
          >
            Thanh toán
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}