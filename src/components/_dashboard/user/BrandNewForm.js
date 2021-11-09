import React,{ useEffect, useState } from 'react'
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import axios from 'axios';
// material
import { LoadingButton } from '@material-ui/lab';
import {
   Box,
   Card,
   Grid,
   Stack,
   Switch,
   TextField,
   Typography,
   FormHelperText,
   FormControlLabel,
   Button
} from '@material-ui/core';
// utils
import { fData } from '../../../utils/formatNumber';
import fakeRequest from '../../../utils/fakeRequest';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import countries from './countries';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Slider from "@mui/material/Slider";
import JSCookies from 'js-cookie';
import Cookies from 'universal-cookie';
import db from '../../../adapter/firebase'
 // ----------------------------------------------------------------------

BrandNewForm.propTypes = {
   isEdit: PropTypes.bool,
   currentUser: PropTypes.object
};

function formatDate(date) {
   var hours = date.getHours();
   var minutes = date.getMinutes();
   var amPm = hours >= 12 ? "pm" : "am";
   hours = hours % 12;
   hours = hours ? hours : 12;
   minutes = minutes < 10 ? "0" + minutes : minutes;
   var strTime = hours + ":" + minutes + " " + amPm;
   return (
     date.getFullYear() +
     "-" +
     parseInt(date.getMonth() + 1) +
     "-" +
     date.getDate() +
     " " +
     strTime
   );
 }


export default function BrandNewForm({ isEdit, currentUser }) {
   const navigate = useNavigate();
   const [isPass,setIsPass] = React.useState(false);
   const [isFail,setIsFail] = React.useState(false);
   const [isCheck,setIsCheck] = React.useState(false);
   const { enqueueSnackbar } = useSnackbar();


   console.log(currentUser , " lalaal")
   const NewUserSchema = Yup.object().shape({
      // name: Yup.string().required('Tên nhãn hàng'),
      // email: Yup.string().required('Email là bắt buộc').email(),
      // phoneNumber: Yup.string().required('Điện thoại là bắt buộc'),
      // address: Yup.string().required('Địa chỉ là bắt buộc'),
      // country: Yup.string().required('Quốc gia là bắt buộc'),
      // company: Yup.string().required('Công ty là bắt buộc'),
      // state: Yup.string().required('Tỉnh là bắt buộc'),
      // city: Yup.string().required('Thành phố là bắt buộc'),
      // role: Yup.string().required('Lĩnh vực là bắt buộc'),
      // avatarUrl: Yup.mixed().required('Avatar là bắt buộc')
      openTime: Yup.string().required('Thời gian bắt đầu là bắt buộc và lớn hơn kết thúc'),
      closeTime: Yup.string().required('Thời gian kết thúc là bắt buộc'),
   });
   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         name: currentUser?.name || '',
         email: currentUser?.email || '',
         phoneNumber: currentUser?.phoneNumber || '',
         address: currentUser?.address || '',
         country: currentUser?.country || '',
         state: currentUser?.state || '',
         city: currentUser?.city || '',
         zipCode: currentUser?.zipCode || '',
         avatarUrl: currentUser?.avatarUrl || null,
         isVerified: currentUser?.isVerified || true,
         status: currentUser?.status,
         company: currentUser?.company || '',
         role: currentUser?.role || '',
         openTime : currentUser?.openTime || "",
         closeTime : currentUser?.closeTime || "",
         salary : currentUser?.salary || "",
         id_model : currentUser?.id_model || "",
         id_casting : currentUser?.id_casting || "",
      },
      validationSchema: NewUserSchema,
      onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
         try {
            await fakeRequest(500);
            var OPEN_TIME = formatDate(new Date(values.openTime))
        var CLOSE_TIME = formatDate(new Date(values.closeTime))
            const accessToken = JSCookies.get('jwt')
            var result = false;
            var resultBrowser = false
               let axiosConfig = {
               headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": "*",
                  'authorization': 'Bearer ' + accessToken
               }
            };
 
               var postData = {
               modelId : values.id_model,
               castingId : values.id_casting,
               status : true,
               review : "string"
               }
               try {
               const { data } = await axios.post('https://api.pimo.studio/api/v1/results', postData, axiosConfig);
                  if(data.success) {
                     console.log('cassingressult ',data.success)
                     result = true;
               }else{
                  result = false;
               }
               } catch (error) {
               }

               if(result){
                  var postTaskData = {
                     modelId : values.id_model,
                     castingId : values.id_casting,
                     status : true,
                     startDate : OPEN_TIME,
                     endDate : CLOSE_TIME,
                     salary : values.salary,
                      }
                     const { data } = await axios.post('https://api.pimo.studio/api/v1/tasks', postTaskData, axiosConfig);
                     if(data.success) {
                        resultBrowser = true;
                        db.collection("history")
                        .add({
                           dateCreate : new Date(),
                           modelName : values.name,
                           nameCasting : values.country,
                           value : values.salary,
                        })

                        console.log('task ',data.success)
                       
                  }else{
                     resultBrowser = false;
                     
                  }
              
                  }

                  if(resultBrowser){
                     var postBrowserData = {
                        modelId : values.id_model,
                        castingId : values.id_casting,
                        status:true
                      }
                  
                        try {
                          const { data } = await axios.put('https://api.pimo.studio/api/v1/browses', postBrowserData, axiosConfig);
                           if(data.success) {
                              enqueueSnackbar(!isEdit ? 'Create success' : 'Lưu tác vụ thành công', { variant: 'success' });
                          }else{
                           enqueueSnackbar(!isEdit ? 'Create success' : 'Lưu tác vụ không thành công', { variant: 'error' });
                            }
                          } catch (error) {
                            }
                   }



            resetForm();
            setSubmitting(false);
            // navigate(PATH_DASHBOARD.user.list);
         } catch (error) {
            console.error(error);
            setSubmitting(false);
            setErrors(error);
         }
      }
   });

   const handlePass = (e) => {
      setIsPass(!isPass)
   }
 const handleFail = async (e) => {
   setIsPass(false)
   const accessToken = JSCookies.get('jwt')
   var result =false;
   let axiosConfig = {
     headers: {
       'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'authorization': 'Bearer ' + accessToken
     }
  };
  console.log('model ',values.id_model)
  console.log('casting ',values.id_casting)
   var postData = {
     modelId : values.id_model,
     castingId : values.id_casting,
     status : false,
     review : "string"
   }
   try {
     const { data } = await axios.post('https://api.pimo.studio/api/v1/results', postData, axiosConfig);
      if(data.success) {
         result = true;
         console.log('fail111 ',data.success)
        
    }else{
       result = false;
    
    }
     } catch (error) {
    }

    if(result){
      var postBrowserData = {
         modelId : values.id_model,
         castingId : values.id_casting,
         status:true
       }
   
         try {
           const { data } = await axios.put('https://api.pimo.studio/api/v1/browses', postBrowserData, axiosConfig);
            if(data.success) {
               enqueueSnackbar(!isEdit ? 'Create success' : 'Đã chọn rớt', { variant: 'success' });
           }else{
            enqueueSnackbar(!isEdit ? 'Create success' : 'Rớt không thành công', { variant: 'error' });
             }
           } catch (error) {
             }
    }
   }
   const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;
   console.log(currentUser , " 23 ");

   const handleDrop = useCallback(
      (acceptedFiles) => {
         const file = acceptedFiles[0];
         if (file) {
            setFieldValue('avatarUrl', {
               ...file,
               preview: URL.createObjectURL(file)
            });
         }
      },
      [setFieldValue]
   );

   useEffect(() => {
//          const accessToken = JSCookies.get('jwt')
//    let axiosConfig = {
//      headers: {
//         'authorization': 'Bearer ' + accessToken
//      }
//   };
//   if(currentUser !== undefined){
//    const cookies = new Cookies();
//    cookies.set('CASTING_ID', currentUser.id_casting);
//    cookies.set('MODEL_ID', currentUser.id_model);
//  }
//             axios.get(`https://api.pimo.studio/api/v1/tasks/casting?castingId=${JSCookies.get('CASTING_ID')}`,axiosConfig)
//          .then(res => {
//             console.log(res.data.taskList)
//             res.data.taskList.map((value)=>{
//               if(currentUser !== undefined){
//                if(values.id_casting === value.task.castingId && values.id_model === value.task.modelId){
//                   setIsCheck(true)
//                }
//               } else{
//                if(parseInt(JSCookies.get('CASTING_ID')) === value.task.castingId && parseInt(JSCookies.get('MODEL_ID')) === value.task.modelId){
//                   setIsCheck(true)
//                }
//               }
//             })
//          })
//          .catch(err => {   
//             console.log(err)
//          })
   }, [])

   return (
      <FormikProvider value={formik}>
         <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
               <Grid item xs={12} md={4}>
                  <Card sx={{ py: 10, px: 3 }}>
                     {/* {isEdit && (
                        <Label
                           color={values.status !== 'active' ? 'error' : 'success'}
                           sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                        >
                           {((values.status === 'banned') ? 'Ngừng hoạt động' : 'Hoạt động')}
                         </Label>
                     )} */}

                     <Box sx={{ mb: 5 }}>
                        <UploadAvatar
                           accept="image/*"
                           file={values.avatarUrl}
                           maxSize={3145728}
                           onDrop={handleDrop}
                           error={Boolean(touched.avatarUrl && errors.avatarUrl)}
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
                        <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                           {touched.avatarUrl && errors.avatarUrl}
                        </FormHelperText>
                     </Box>
                     <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingBottom: "1.5rem",
          marginTop:'1.5rem'
        }}
      >
       
       {!isCheck &&
       <>
        <Button
          variant="contained"
          style={{ backgroundColor: "#FF3030",width:'8rem',height:'2.5rem' }}
          onClick={(e) => handleFail(e)}
          
        >
         Rớt
        </Button>
        <Button
          variant="contained" 
          style={{ backgroundColor: "#00AB55",width:'8rem',height:'2.5rem'  }}
          onClick={(e) => handlePass(e)}
        >
          Đậu
        </Button>
       </>
       }

      </div>
                     {/* {isEdit && (
                        <FormControlLabel
                           labelPlacement="start"
                           control={
                              <Switch
                                 onChange={(event) => setFieldValue('status', event.target.checked ? 'banned' : 'active')}
                                 checked={values.status !== 'active'}
                              />
                           }
                           label={
                              <>
                                 <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                    Banned
                                 </Typography>
                                 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Cấm nhãn hàng
                                 </Typography>
                              </>
                           }
                           sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                        />
                     )} */}

                  </Card>
                  
               </Grid>

               <Grid item xs={12} md={8}>
                  <Card sx={{ p: 3 }}>
                     <Stack spacing={3}>
                     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <h2>Thông tin</h2>
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField
                              fullWidth
                              disabled
                              label="Tên người mẫu"
                              {...getFieldProps('name')}
                              error={Boolean(touched.name && errors.name)}
                              helperText={touched.name && errors.name}
                             
                           />
                           <TextField
                           disabled
                              fullWidth
                              label="Địa chỉ email"
                              {...getFieldProps('email')}
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                           />
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField
                           disabled
                              fullWidth
                              label="Số điện thoại"
                              {...getFieldProps('phoneNumber')}
                              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                              helperText={touched.phoneNumber && errors.phoneNumber}
                           />
                           {/* <TextField
                              select
                              fullWidth
                              label="Quốc gia"
                              placeholder="Country"
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
                           </TextField> */}
                            {/* <TextField
                              fullWidth
                              label="ngày sinh"
                              {...getFieldProps('zipCode')}
                              error={Boolean(touched.role && errors.role)}
                              helperText={touched.role && errors.role}
                           /> */}

                     <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          fullWidth
                          {...props}
                           error={Boolean(touched.zipCode && errors.zipCode)}
                          helperText={touched.zipCode && errors.zipCode}
                        />
                      )}
                      disabled
                      label="Ngày sinh"
                      {...getFieldProps("zipCode")}
                       onChange={(newValue) => {
                        setFieldValue("zipCode", newValue);
                      }}
                    />
                  </LocalizationProvider>
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           {/* {(listCategory !== undefined && listCategory !== null) ? (
                              <TextField
                                 select
                                 fullWidth
                                 label="Lĩnh vực"
                                 placeholder="Country"
                                 {...getFieldProps('company')}
                                 SelectProps={{ native: true }}
                                 error={Boolean(touched.company && errors.company)}
                                 helperText={touched.company && errors.company}
                              >
                                 <option value="" />
                                 {

                                    listCategory.map((option) => (
                                       <option key={option.id} value={option.name}>
                                          {option.name}
                                       </option>
                                    ))
                                 }
                              </TextField>
                           ) : null} */}
                          
                        </Stack>

                        <TextField disabled {...getFieldProps('city')} fullWidth multiline minRows={4} maxRows={4} label="Mô tả" />
                        {/* <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                           <LoadingButton style={{backgroundColor:'rgb(255, 147, 166)'}} type="submit" variant="contained" loading={isSubmitting}>
                              {!isEdit ? 'Tạo mới' : 'Lưu thay đổi'}
                           </LoadingButton>
                        </Box> */}

                        {/* task */}
                     {isPass &&  
                     <Stack spacing={3}>
                     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <h2>Tác vụ</h2>
                        </Stack>

                        {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           <TextField
                              fullWidth
                              label="Tên người mẫu"
                              // {...getFieldProps('name')}
                              // error={Boolean(touched.name && errors.name)}
                              // helperText={touched.name && errors.name}
                              {...getFieldProps('test')}
                              // onChange={(e,newValue) => setTest(newValue)}
                             
                           />
                           <TextField
                              fullWidth
                              label="Địa chỉ email"
                              {...getFieldProps('email')}
                              error={Boolean(touched.email && errors.email)}
                              helperText={touched.email && errors.email}
                           />
                        </Stack> */}

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          fullWidth
                          {...props}
                           error={Boolean(touched.openTime && errors.openTime)}
                          helperText={touched.openTime && errors.openTime}
                        />
                      )}
                      
                      label="Ngày bắt đầu"
                      {...getFieldProps("openTime")}
                       onChange={(newValue) => {
                        setFieldValue("openTime", newValue);
                      }}
                    />
                  </LocalizationProvider>

                     <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          fullWidth
                          {...props}
                           error={Boolean(touched.closeTime && errors.closeTime)}
                          helperText={touched.closeTime && errors.closeTime}
                        />
                      )}
                      
                      label="Ngày kết thúc"
                      {...getFieldProps("closeTime")}
                       onChange={(newValue) => {
                        setFieldValue("closeTime", newValue);
                      }}
                    />
                  </LocalizationProvider>
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                           {/* {(listCategory !== undefined && listCategory !== null) ? (
                              <TextField
                                 select
                                 fullWidth
                                 label="Lĩnh vực"
                                 placeholder="Country"
                                 {...getFieldProps('company')}
                                 SelectProps={{ native: true }}
                                 error={Boolean(touched.company && errors.company)}
                                 helperText={touched.company && errors.company}
                              >
                                 <option value="" />
                                 {

                                    listCategory.map((option) => (
                                       <option key={option.id} value={option.name}>
                                          {option.name}
                                       </option>
                                    ))
                                 }
                              </TextField>
                           ) : null} */}
                          
                        </Stack>
                        <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <p>Mức lương</p>
                  </Stack>
                        {/* <TextField {...getFieldProps('city')} fullWidth multiline minRows={4} maxRows={4} label="Mô tả" /> */}
                       <div  style={{textAlign: 'center'}}>
                       <Slider
                    aria-label="Temperature"
                  min={1000000}
                  step={500000}
                     max={50000000}
                     style={{zIndex:1000,width:'93%'}}
                    {...getFieldProps("salary")}
                    error={Boolean(touched.salary && errors.salary)}
                    helperText={touched.salary && errors.salary}
                    onChange={(e, newValue) => {
                      setFieldValue("salary", newValue);
                    }}
                    
                  //   getAriaValueText={valuetext}
                    color="secondary"
                    valueLabelDisplay="auto"
                    sx={{
                      "& .MuiSlider-track": {
                        color: "#ff93a6",
                      },
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#ff93a6",
                      },
                      "& .MuiSlider-rail": {
                        opacity: 0.5,
                        backgroundColor: "#bfbfbf",
                      },
                    }}
                  />
                       </div>
                       
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                           <LoadingButton style={{backgroundColor:'rgb(255, 147, 166)'}} type="submit" variant="contained" loading={isSubmitting}>
                              {!isEdit ? 'Tạo mới' : 'Lưu tác vụ'}
                           </LoadingButton>
                        </Box>
                     </Stack>
                                }                  
                     </Stack>
                  </Card>
               </Grid>
            </Grid>
          {/* task */}
           
         </Form>
      </FormikProvider>
   );
}
