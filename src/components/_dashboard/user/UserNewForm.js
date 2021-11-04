import * as Yup from "yup";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useSnackbar } from "notistack5";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { LoadingButton } from "@material-ui/lab";
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
} from "@material-ui/core";
// utils
import { fData } from "../../../utils/formatNumber";
import fakeRequest from "../../../utils/fakeRequest";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
//
import Label from "../../Label";
import { UploadAvatar } from "../../upload";
import countries, { hairColor } from "./countries";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Slider from "@mui/material/Slider";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import MyFormControlLabel from './MyFormControlLabel';
import Check from "@material-ui/icons/Check";
import JSCookies from 'js-cookie';
import axios from 'axios';
import SliderForm from './Slider';
// ----------------------------------------------------------------------
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
UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};
export default function UserNewForm({ isEdit, currentUser,listUser }) {
  const navigate = useNavigate();
   var [checkBoxStyle, setCheckBoxStyle] = React.useState([]);
   const [valueHeight, setValueHeight] = React.useState([160, 250]);
   const [valueAge, setValueAge] = React.useState([18, 100]);
   const [valueMeasure1, setValueMeasure1] = React.useState([20, 40]);
   const [valueMeasure2, setValueMeasure2] = React.useState([20, 45]);
   const [valueMeasure3, setValueMeasure3] = React.useState([31, 50]);
  var [checkBoxSex, setCheckBoxSex] = React.useState([
    { id: 1, name: "Nam", checked: false },
    { id: 2, name: "Nữ" , checked: false },
    { id: 3, name: "Khác", checked: false },
 ]);
 var [checkBoxHair, setCheckBoxHair] = React.useState([
  { id: 1, name: "Đen", checked: false },
  { id: 2, name: "Xám" , checked: false },
  { id: 3, name: "Trắng", checked: false },
  { id: 4, name: "Nâu", checked: false },
  { id: 5, name: "Đỏ" , checked: false },
  { id: 6, name: "Hồng", checked: false },
  { id: 7, name: "Tím", checked: false },
  { id: 8, name: "Vàng" , checked: false },
  { id: 9, name: "Xanh", checked: false },
  { id: 10, name: "Khác", checked: false },
]);
var [checkBoxSkin, setCheckBoxSkin] = React.useState([
  { id: 1, name: "Trắng", checked: false },
  { id: 2, name: "Vàng" , checked: false },
  { id: 3, name: "Đen", checked: false },
  { id: 4, name: "Đỏ", checked: false },
  { id: 5, name: "Khác", checked: false },
]);
  var [isCheckStyle, setIsCheckStyle] = React.useState(true);
  var [isCheckSex, setIsCheckSex] = React.useState(true);

  const { enqueueSnackbar } = useSnackbar();

  console.log(currentUser, " currentUser");
  

  function valuetext(value) {
    return `${value}°C`;
  }
  // console.log('checkBoxStyle ',checkBoxStyle)
 if(!isCheckStyle){
  if(checkBoxStyle.length > 0  && currentUser !== undefined) {
    setIsCheckStyle(true)
    for(var i = 0; i < checkBoxStyle.length; i++){
      for(var j = 0; j < currentUser.phoneNumber.length; j++){
          if(checkBoxStyle[i].id === currentUser.phoneNumber[j].id){
            checkBoxStyle[i].checked = true;
          }
      }
     }
  }
 }
 if(!isCheckSex){
  if(checkBoxSex.length > 0  && currentUser !== undefined) {
    setIsCheckSex(true)
    for(var m = 0; m < checkBoxSex.length; m++){
      for(var n = 0; n < currentUser.role.length; n++){
          if(checkBoxSex[m].id === currentUser.role[n].id){
            checkBoxSex[m].checked = true;
          }
      }
     }
  }
 }
  // console.log('checkBoxStyle After ',checkBoxStyle)
  React.useEffect(() => {
    fetch('https://api.pimo.studio/api/v1/styles')
    .then(res=>res.json())
    .then(json=>{
      json.style.map((value) => {
        value.checked = false;
      })
      setIsCheckStyle(false)
      setIsCheckSex(false)
       setCheckBoxStyle(json.style)
    })
   
 }, []);

  const NewUserSchema = Yup.object().shape({
    // name: Yup.string().required("Tên là bắt buộc"),
    
    // email: Yup.string().required("Email là bắt buộc").email(),
    // phoneNumber: Yup.string().required("Điện thoại là bắt buộc"),
    // country: Yup.string().required("Quốc gia là bắt buộc"),
    // company: Yup.string().required("Công ty là bắt buộc"),

    // address: Yup.string().required("Địa điểm là bắt buộc"),
    
    
   
    // state: Yup.string().required("Thời gian bắt đầu bắt buộc và lớn hơn kết thúc"),
    
    // city: Yup.string().required("Thời gian kết thúc là bắt buộc"),
    
    // sex: Yup.string().required("Giới tính là bắt buộc"),
    // style: Yup.string().required("Phong cách là bắt buộc"),
    //  role: Yup.string().required('Role Number is required'),
    //  zipCode: Yup.string().required('ZipCode is required'),
    
    // avatarUrl: Yup.mixed().required("Hình ảnh là bắt buộc"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phoneNumber: currentUser?.phoneNumber || "",
      address: currentUser?.address || "",
      country: currentUser?.country || "",
      state: currentUser?.state || "",
      city: currentUser?.city || "",
      zipCode: currentUser?.zipCode || "",
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || "",
      role: currentUser?.role || "",
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        var HAIR =[]
        checkBoxHair.map((value, index) => {
          if(value.checked === true){
            HAIR.push(value.name)
          }
        })
        var HAIR_NAME ="";
        HAIR.forEach((value,index)=>{
         if(index === HAIR.length -1){
          HAIR_NAME += value
         }else{
          HAIR_NAME += value + ', '
         }
        })
        var SKIN =[]
        checkBoxSkin.map((value, index) => {
          if(value.checked === true){
            SKIN.push(value.name)
          }
        })
        var SKIN_NAME ="";
        SKIN.forEach((value,index)=>{
          if(index === SKIN.length -1){
            SKIN_NAME += value
           }else{
            SKIN_NAME += value + ', '
           }
        })
        values.country += "Chiều cao: "+ valueHeight[0] + "-" + valueHeight[1]+"cm" + "<br/>"
        + "Tuổi: "+ valueAge[0] + "-" + valueAge[1] + "<br/>"
        + "Vòng 1: "+ valueMeasure1[0] + "-" + valueMeasure1[1] + "<br/>"
        + "Vòng 2: "+ valueMeasure2[0] + "-" + valueMeasure2[1] + "<br/>"
        + "Vòng 3: "+ valueMeasure3[0] + "-" + valueMeasure3[1] + "<br/>"
        + "Màu Tóc: "+  HAIR_NAME + "  -  "
        + "Màu Da: "+  SKIN_NAME
        console.log('values ',values.country)
        // console.log('forrmat ',formatDate(new Date(values.city)))
        var OPEN_TIME = formatDate(new Date(values.state))
        var CLOSE_TIME = formatDate(new Date(values.city))
        var result = false;
          const accessToken = JSCookies.get('jwt')
        if(isEdit){

          console.log('update ')
        }else{
          console.log('create ')
          var SEX =[]
          checkBoxSex.map((value, index) => {
            if(value.checked === true){
              SEX.push(value.id)
            }
          })
          console.log('SEX ',SEX)
           var STYLE =[]
          checkBoxStyle.map((value, index) => {
            if(value.checked === true){
              STYLE.push(value.id)
            }
          })


        //   var postData = {
        //     name: values.name,
        //     description: values.company,
        //     openTime: OPEN_TIME,
        //     closeTime: CLOSE_TIME,
        //     filePoster: URL.createObjectURL(values.avatarUrl.file),
        //     salary: values.zipCode,
        //     address: values.address,
        //     request: '',
        //     genders: SEX, 
        //     styles: STYLE
        //  };
        var formData = new FormData();
        formData.append('name', values.name)
        formData.append('description', values.company)
        formData.append('openTime', OPEN_TIME)
        formData.append('closeTime', CLOSE_TIME)
        formData.append('filePoster', values.avatarUrl.file)
        formData.append('salary', values.zipCode)
        formData.append('address', values.address)
        formData.append('request', values.country)
        formData.append('genders', SEX)
         formData.append('styles', STYLE)

         console.log('formData ',formData.get('filePoster'))
         console.log('formData ',formData.get('name'))
         console.log('formData ',formData.get('description'))
         console.log('formData ',formData.get('openTime'))
         console.log('formData ',formData.get('closeTime'))
         console.log('formData ',formData.get('salary'))
         console.log('formData ',formData.get('address'))
         console.log('formData ',formData.get('request'))
         console.log('formData ',formData.get('genders'))
          console.log('formData ',formData.get('styles'))
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
        const { data } = await axios.post('https://api.pimo.studio/api/v1/castings', formData, axiosConfig);
        console.log('hihihi ' ,data)
        if(data.success) {
          console.log('successssss ')
         result = true;
       }else{
        console.log('faillll ')
        result = false;
       }
        } catch (error) {
        console.log('faillll33333 ')
          result = false;
       }
        }
       if(result){
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
      
        enqueueSnackbar(!isEdit ? "Tạo chiến dịch thành công" : "Cập nhật chiến dịch thành công", {
          variant: "success",
        });
        navigate(PATH_DASHBOARD.casting.cards);
       }else{
        enqueueSnackbar(!isEdit ? "Tạo chiến dịch không thành công" : "Cập nhật chiến dịch không thành công", {
          variant: "error",
        });
        values.country = "";
       }
       
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      console.log('acceptedFiles ',acceptedFiles)
      const file = acceptedFiles[0];
      console.log('file ',file)
      if (file) {
        setFieldValue("avatarUrl", {
          ...file,
          preview: URL.createObjectURL(file),
          file: file
        
        });
      }
    },
    [setFieldValue],
  );

  const handlerFilter = (e, value, item) => {
    switch (value) {
       case 1:
        const updateSex = checkBoxSex.map((value) => {
            
          value.checked = value.id === item.id ? !value.checked : value.checked;
          // console.log('updateSex ',value)
          return value;
       });
       setCheckBoxSex(updateSex);

          break;
          case 2:
        const updateHair = checkBoxHair.map((value) => {
            
          value.checked = value.id === item.id ? !value.checked : value.checked;
           return value;
       });
       setCheckBoxHair(updateHair);

          break;
          case 3:
        const updateSkin = checkBoxSkin.map((value) => {
            
          value.checked = value.id === item.id ? !value.checked : value.checked;
           return value;
       });
       setCheckBoxSkin(updateSkin);

          break;
       case 4:
          const updateStyle = checkBoxStyle.map((value) => {
            
             value.checked = value.id === item.id ? !value.checked : value.checked;
            //  console.log('updateStyle ',value)
             return value;
          });
          setCheckBoxStyle(updateStyle);
          break;
    
        default:
    }
 };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {/* {isEdit && (
                <Label
                  color={values.status !== "active" ? "error" : "success"}
                  sx={{
                    textTransform: "uppercase",
                    position: "absolute",
                    top: 24,
                    right: 24,
                  }}
                >
                  {values.status === "banned" ? "Ngừng hoạt động" : "Hoạt động"}
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
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      Cho phép file dạng *.jpeg, *.jpg, *.png, *.gif
                      <br /> với kích thước tối đa {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                  {touched.avatarUrl && errors.avatarUrl}
                </FormHelperText>
              </Box>

              {/* {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      onChange={(event) =>
                        setFieldValue(
                          "status",
                          event.target.checked ? "banned" : "active",
                        )
                      }
                      checked={values.status !== "active"}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Cấm người mẫu
                      </Typography>
                    </>
                  }
                  sx={{
                    mx: 0,
                    mb: 3,
                    width: 1,
                    justifyContent: "space-between",
                  }}
                />
              )} */}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Tên chiến dịch"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
               
               <TextField
                    fullWidth
                    label="Địa điểm"
                    {...getFieldProps("address")}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  {/* <TextField
                    select
                    fullWidth
                    label="Địa điểm"
                    placeholder="address"
                     {...getFieldProps("address")}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  
                  >
                    <option value="" />
                    {listUser.map((option) => (
                      <option key={option.email} value={option.address}>
                        {option.address}
                      </option>
                    ))}
                  </TextField> */}
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                 
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          fullWidth
                          {...props}
                          error={Boolean(touched.state && errors.state)}
                          helperText={touched.address && errors.state}
                         
                        />
                      )}
                      {...getFieldProps("state")}
                      label="thời gian bắt đầu"
                      onChange={(newValue) => {
                        setFieldValue("state", newValue);
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          fullWidth
                          {...props}
                           error={Boolean(touched.city && errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      )}
                      label="thời gian kết thúc"
                      {...getFieldProps("city")}
                       onChange={(newValue) => {
                        setFieldValue("city", newValue);
                      }}
                    />
                  </LocalizationProvider>
                
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <p>Mức lương</p>
                 </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                
                  <Slider
                    aria-label="Temperature"
                  
                     max={10000}
                    {...getFieldProps("zipCode")}
                    error={Boolean(touched.zipCode && errors.zipCode)}
                    helperText={touched.zipCode && errors.zipCode}
                    onChange={(e, newValue) => {
                      setFieldValue("zipCode", newValue);
                    }}
                    
                    getAriaValueText={valuetext}
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
               {!isEdit &&  <SliderForm value={valueHeight} setValue={setValueHeight}/>}
                
                </Stack>

              {!isEdit && <>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <p>Tuổi</p>
                  <p style={{ marginLeft: "21rem" }}>Vòng 1</p>
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                 <SliderForm value={valueAge} setValue={setValueAge}/>
                 <SliderForm value={valueMeasure1} setValue={setValueMeasure1}/>
                </Stack>
                
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <p>Vòng 2</p>
                  <p style={{ marginLeft: "21rem" }}>Vòng 3</p>
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                 <SliderForm value={valueMeasure2} setValue={setValueMeasure2}/>
                 <SliderForm value={valueMeasure3} setValue={setValueMeasure3}/>
                </Stack>
              </>
              }

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <p>Giới tính</p>
                  {/* <p style={{ marginLeft: "17.5rem" }}>Chiều cao</p> */}
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                 >
                 {
                checkBoxSex.map((value, index) => (
                  <FormControlLabel
                  // style={{border:'1px dashed black',width:'20%',margin:0}}
                  control={
                     <Checkbox
                     sx={{ '&.Mui-checked': {color: '#ff93a6',},}}
                        tabIndex={-1}
                        checked={value.checked}
                        value={value.id}
                        checkedIcon={<Check   />}
                        icon={<Check  />}
                        onClick={(input) => {
                          console.log('oooo')
                          handlerFilter(input, 1,value)
                        }}
                        
                   
                     />
                  }
                  label={value.name}
               />
              ))}
                        
          
                </Stack>

              {!isEdit && 
              <>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <p>Màu tóc</p>
                  {/* <p style={{ marginLeft: "17.5rem" }}>Chiều cao</p> */}
                </Stack>
                <Stack

                  // direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                 
                >
                  <div  style={{display: 'flex',justifyContent:'space-between',marginBottom:'0.5rem'}}>
                  {checkBoxHair.map((value, index) => (
                            <>
                           {(index < 5) ? (
                              <FormControlLabel                             
                              style={{border:'1px dashed black',width:'18%',margin:0}}
                              control={
                                 <Checkbox
                                 sx={{ '&.Mui-checked': {color: '#ff93a6',},}}
                                    tabIndex={-1}
                                    checked={value.checked}
                                    value={value.id}
                                    checkedIcon={<Check   />}
                                    icon={<Check  />}
                                    onClick={(input) => handlerFilter(input,2, value)}
                                    
                               
                                 />
                              }
                              label={value.name}
                           />
                           ) : null}
                            
                         </>
                        ))}
                  </div>
                  <div  style={{display: 'flex',justifyContent:'space-between'}}>
                  {checkBoxHair.map((value, index) => (
                            <>
                           {(index >= 5) ? (
                              <FormControlLabel
                              style={{border:'1px dashed black',width:'18%',margin:0}}
                              control={
                                 <Checkbox
                                 sx={{ '&.Mui-checked': {color: '#ff93a6',},}}
                                    tabIndex={-1}
                                    checked={value.checked}
                                    value={value.id}
                                    checkedIcon={<Check   />}
                                    icon={<Check  />}
                                    onClick={(input) => handlerFilter(input,2, value)}
                                    
                               
                                 />
                              }
                              label={value.name}
                           />
                           ) : null}
                            
                         </>
                        ))}
                  </div>                                           
                </Stack>
              </>
              }

              {!isEdit &&
              <>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <p>Màu da</p>
                  {/* <p style={{ marginLeft: "17.5rem" }}>Chiều cao</p> */}
                </Stack>
                <Stack

                  // direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                 
                >
                  <div  style={{display: 'flex',justifyContent:'space-between',marginBottom:'0.5rem'}}>
                  {checkBoxSkin.map((value, index) => (
                            <>
                           {(index < 5) ? (
                              <FormControlLabel
                              
                              style={{border:'1px dashed black',width:'18%',margin:0}}
                              control={
                                 <Checkbox
                                 sx={{ '&.Mui-checked': {color: '#ff93a6',},}}
                                    tabIndex={-1}
                                    checked={value.checked}
                                    value={value.id}
                                    checkedIcon={<Check   />}
                                    icon={<Check  />}
                                    onClick={(input) => handlerFilter(input,3, value)}
                                    
                               
                                 />
                              }
                              label={value.name}
                           />
                           ) : null}
                            
                         </>
                        ))}
                  </div>
                 
                       
                </Stack>
              </>
              }

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <p>Phong cách</p>
                  {/* <p style={{ marginLeft: "17.5rem" }}>Chiều cao</p> */}
                </Stack>
                <Stack

                  // direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                 
                >
                  <div  style={{display: 'flex',justifyContent:'space-between',marginBottom:'0.5rem'}}>
                  {checkBoxStyle.map((value, index) => (
                            <>
                           {(index < 4) ? (
                              <FormControlLabel
                              
                              style={{border:'1px dashed black',width:'20%',margin:0}}
                              control={
                                 <Checkbox
                                 sx={{ '&.Mui-checked': {color: '#ff93a6',},}}
                                    tabIndex={-1}
                                    checked={value.checked}
                                    value={value.id}
                                    checkedIcon={<Check   />}
                                    icon={<Check  />}
                                    onClick={(input) => handlerFilter(input,4, value)}
                                    
                               
                                 />
                              }
                              label={value.name}
                           />
                           ) : null}
                            
                         </>
                        ))}
                  </div>
                  <div  style={{display: 'flex',justifyContent:'space-between'}}>
                  {checkBoxStyle.map((value, index) => (
                            <>
                           {(index >= 4) ? (
                              <FormControlLabel
                              style={{border:'1px dashed black',width:'20%',margin:0}}
                              control={
                                 <Checkbox
                                 sx={{ '&.Mui-checked': {color: '#ff93a6',},}}
                                    tabIndex={-1}
                                    checked={value.checked}
                                    value={value.id}
                                    checkedIcon={<Check   />}
                                    icon={<Check  />}
                                    onClick={(input) => handlerFilter(input,4, value)}
                                    
                               
                                 />
                              }
                              label={value.name}
                           />
                           ) : null}
                            
                         </>
                        ))}
                  </div>
                        
                </Stack>

              {isEdit &&  <TextField
                  {...getFieldProps("country")}
                  error={Boolean(touched.country && errors.country)}
                  helperText={touched.country && errors.country}
                  // value={values.country}
                    fullWidth
                  multiline
                  minRows={4}
                  maxRows={4}
                  label="Yêu cầu"
                />    }          

                <TextField
                  {...getFieldProps("company")}
                  error={Boolean(touched.company && errors.company)}
                  helperText={touched.company && errors.company}
                  // value={values.company}
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={4}
                  label="Mô tả"
                />
              

                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    style={{ backgroundColor: "#ff93a6" }}
                  >
                    {!isEdit ? "Tạo mới" : "Lưu thay đổi"}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
