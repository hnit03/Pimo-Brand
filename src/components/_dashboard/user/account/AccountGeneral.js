import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { UploadAvatar } from '../../../upload';
// utils
import { fData } from '../../../../utils/formatNumber';
//
import countries from '../countries';
import JSCookies from 'js-cookie';
import axios from 'axios';
// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  console.log('hihihi ',user)
   const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
    address: Yup.string().required('địa chỉ is required'),
    phoneNumber: Yup.string().required('điện thoại is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: user.displayName || '',
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      country: user.country,
      address: user.address,
      state: user.state,
      city: user.city,
      zipCode: user.zipCode,
      about: user.about,
      isPublic: user.isPublic,
      brandCateId: user.brandCateId
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      const accessToken = JSCookies.get('jwt')
      try {
        var result = false;
        var formData = new FormData();
        formData.append('name', values.displayName)
        formData.append('description', values.about)
        formData.append('brandCateId', values.brandCateId)
        formData.append('address', values.address)
        formData.append('phone', values.phoneNumber)
        formData.append('imageLogo', values.photoURL.file)
        
        console.log('formData ',formData.get('name'))
        console.log('formData ',formData.get('description'))
        console.log('formData ',formData.get('brandCateId'))
        console.log('formData ',formData.get('address'))
        console.log('formData ',formData.get('phone'))
        console.log('formData ',formData.get('imageLogo'))
        let axiosConfig = {
          headers: {
            "Content-Type": "multipart/form-data; boundary=AaB03x" +
               "--AaB03x" +
               "Content-Disposition: file" +
               "Content-Type: png" +
               "Content-Transfer-Encoding: binary" +
               "...data... " +
               "--AaB03x--",
            "Accept": "application/json",
            "type": "formData",
            "authorization": "Bearer " + accessToken     
         }
      };
       

       try {
        const { data } = await axios.put('https://api.pimo.studio/api/v1/brands', formData, axiosConfig);
        console.log('hihihi ' ,data)
        if(data.success) {
          result = true;
       }else{
         result = false;
       }
        } catch (error) {
           result = false;
       }
            
        if(result){
          await updateProfile();
          enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
          }else{
          enqueueSnackbar('Update failed', { variant: 'error' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
         }

      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('photoURL', {
          ...file,
          preview: URL.createObjectURL(file),
          file:file
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <UploadAvatar
                accept="image/*"
                file={values.photoURL}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.photoURL && errors.photoURL)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Cho phép file dạng *.jpeg, *.jpg, *.png, *.gif
                    <br /> với kích thước tối đa {fData(3145728)}
                  </Typography>
                }
              />

              {/* <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.photoURL && errors.photoURL}
              </FormHelperText> */}

              {/* <FormControlLabel
                control={<Switch {...getFieldProps('isPublic')} color="primary" />}
                labelPlacement="start"
                label="Public Profile"
                sx={{ mt: 5 }}
              /> */}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Tên"
                   error={Boolean(touched.displayName && errors.displayName)}
                   helperText={touched.displayName && errors.displayName}
                   {...getFieldProps('displayName')} />
                  <TextField fullWidth disabled label="Email" {...getFieldProps('email')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth 
                   error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                   helperText={touched.phoneNumber && errors.phoneNumber}
                  label="Số điện thoại" {...getFieldProps('phoneNumber')} />
                  <TextField fullWidth 
                   error={Boolean(touched.address && errors.address)}
                   helperText={touched.address && errors.address}
                  label="Địa chỉ" {...getFieldProps('address')} />
                </Stack>

                {/* <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    select
                    fullWidth
                    label="Quốc gia"
                    placeholder="Quốc gia"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField fullWidth label="Tỉnh" {...getFieldProps('state')} />
                </Stack> */}

                {/* <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Thành phố" {...getFieldProps('city')} />
                  <TextField fullWidth label="Mã vùng" {...getFieldProps('zipCode')} />
                </Stack> */}

                <TextField {...getFieldProps('about')} fullWidth multiline minRows={4} maxRows={4} label="Mô tả" />
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton style={{backgroundColor: '#ff93a6'}} type="submit" variant="contained" loading={isSubmitting}>
                Lưu thay đổi
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
