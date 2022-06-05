import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button } from '@mui/material';

const validationSchema = Yup.object({
    fullname: Yup.string()
        .required('Vui lòng nhập họ và tên'),
    phone: Yup.string()
        .required('Vui lòng nhập số điện thoại'),
    cccd: Yup.string()
        .required('Vui lòng nhập CCCD/CMND'),
    email: Yup.string()
        .required('Vui long nhập email')
        .email("Không phải là một email"),
});
  
  


export default function InformationForm({
  information,
  onSubmit,
  }
  ) {

    const handleSubmit = async (values) => {
      console.log(values);
      try {
        console.log("dkm submit");
        await onSubmit(values);
      } catch(error) {
        console.log(error);
      }
    }

    const formik = useFormik({
        initialValues: {
          fullname: information.fullname || '',
          phone: information.phone || '+84 ',
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
            onBlur={(e) => onFieldBlur(e , 'fullname')}
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
                onBlur={(e) => onFieldBlur(e , 'phone')}
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
                onBlur={(e) => onFieldBlur(e , 'email')}
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
                onBlur={(e) => onFieldBlur(e , 'cccd')}
                error={formik.touched.cccd && Boolean(formik.errors.cccd)}
                helperText={
                    (formik.touched.cccd && formik.errors.cccd)
                }
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
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Sử dụng Paypal để thanh toán"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Thanh toán trực tiếp tới nhà xe"
          />
        </Grid>
        <Button variant="contained"
                type="submit"
                sx={{ mt: 3, ml: 1 }}
          >
            Payment
        </Button>
      </Grid>
    </React.Fragment>
  );
}