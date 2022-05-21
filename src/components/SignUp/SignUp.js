import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import authService from '../../services/auth.service';
import { ErrorNotify, SuccessNotify } from '../../utils/Notify';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const validationSchema = Yup.object({
  firstname: Yup.string()
      .required('Yêu cầu tên'),
  lastname: Yup.string()
      .required('Yêu cầu họ'),
  username: Yup.string()
      .required('Yêu cầu tên đăng nhập'),
  email: Yup.string()
      .required('Yêu cầu email')
      .email("Không phải email"),
  password: Yup.string()
      .min(6, 'Mật khẩu yều cầu ít nhất phải 6 kí tự')
      .required('Yêu cầu mật khẩu'),
  passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu phải khớp')
      .required('Yêu cầu nhập lại mật khẩu'),
  });

export default function SignUp() {

  const handleSubmit = async (event) => {
    console.log(event);
    const { username, email, password } = event;
    try {
      await authService.register(username, email, password).then((res) => {
        SuccessNotify("Đăng Ký Thành Công");
      },(error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        ErrorNotify(resMessage);
      }
      )
    } catch(error) {
      console.log("error", error);
    }
  };

  const onFieldBlur = async (event: FocusEvent, fieldName: string) => {
    const target = event.target
    target.value = target.value?.trim()
    console.log(target.value);
    formik.handleChange(event)
    await formik.validateField(fieldName)
    formik.handleBlur(event)
  }

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng Ký
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstname"
                  fullWidth
                  label="Tên"
                  onChange={formik.handleChange}
                  onBlur={(e) => onFieldBlur(e , 'firstname')}
                  error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                  helperText={formik.touched.firstname && formik.errors.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Họ"
                  name="lastname"
                  onChange={formik.handleChange}
                  onBlur={(e) => onFieldBlur(e , 'lastname')}
                  error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên Đăng Nhập"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={(e) => onFieldBlur(e , 'username')}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={(e) => onFieldBlur(e , 'email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Mật Khẩu"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={(e) => onFieldBlur(e , 'password')}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="passwordConfirmation"
                  label="Nhập Lại Mật Khẩu"
                  type="passwordConfirmation"
                  onChange={formik.handleChange}
                  onBlur={(e) => onFieldBlur(e , 'passwordConfirmation')}
                  error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                  helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng Ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}