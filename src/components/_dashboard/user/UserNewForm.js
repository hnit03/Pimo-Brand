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

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function UserNewForm({ isEdit, currentUser,listUser }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(new Date());
  var [checkBoxStyle, setCheckBoxStyle] = React.useState([]);
  var [checkSex, setCheckSex] = React.useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const sex = [
    { id: 1, phoneNumber:{name: "Nam"}, checked: false },
    { id: 2, phoneNumber:{name: "Nữ"} , checked: false },
    { id: 3, phoneNumber:{name: "Khác"}, checked: false },
 ];;
  console.log(currentUser, " currentUser");
  // console.log(listUser[0].phoneNumber.name, " listUser ");
   
  function valuetext(value) {
    return `${value}°C`;
  }
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required("Tên là bắt buộc"),
    email: Yup.string().required("Email là bắt buộc").email(),
    phoneNumber: Yup.string().required("Điện thoại là bắt buộc"),
    country: Yup.string().required("Quốc gia là bắt buộc"),
    address: Yup.string().required("Địa điểm là bắt buộc"),
    company: Yup.string().required("Công ty là bắt buộc"),
    state: Yup.string().required("Tỉnh là bắt buộc"),
    city: Yup.string().required("Thành phố là bắt buộc"),
    sex: Yup.string().required("Giới tính là bắt buộc"),
    style: Yup.string().required("Phong cách là bắt buộc"),
    //  role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().required("Avatar là bắt buộc"),
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
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? "Create success" : "Update success", {
          variant: "success",
        });
        navigate(PATH_DASHBOARD.user.list);
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
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue("avatarUrl", {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue],
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {isEdit && (
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
                  {/* {values.status} */}
                </Label>
              )}

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

              {isEdit && (
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
              )}
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
                  </TextField>
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
                          helperText="thời gian bắt đầu lớn hơn kết thúc"
                          error={Boolean(touched.state && errors.state)}
                          // helperText={touched.address && errors.state}
                          {...getFieldProps("state")}
                        />
                      )}
                      value={values.state}
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
                      value={values.city}
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
                  {/* <p style={{ marginLeft: "17.5rem" }}>Chiều cao</p> */}
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                
                  <Slider
                    aria-label="Temperature"
                    // defaultValue={values.zipCode}
                    value={values.zipCode}
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
                 
                </Stack>

                

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  {/* <TextField
                    fullWidth
                    label="Quận/Huyện"
                    {...getFieldProps("address")}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth
                    label="Mã vùng"
                    {...getFieldProps("zipCode")}
                  /> */}
                  {/* {listUser !== undefined ? (
                           <MyFormControlLabel
                              listStyle={listUser}
                              checkedStyle={checkBoxStyle}
                              setCheckedStyle={setCheckBoxStyle}
                           />
                        ) : null}
                        {listUser !== undefined ? (
                           <MyFormControlLabel
                              listStyle={listUser}
                              checkedStyle={sex}
                              setCheckedStyle={setCheckSex}
                           />
                        ) : null} */}
                 
                 {sex.map((value, index) => (
                            <FormControlLabel
                            control={
                               <Checkbox
                                  tabIndex={-1}
                                  checked={value.checked}
                                  value={value.id}
                                  checkedIcon={<Check   />}
                                  icon={<Check  />}
                                  // onClick={(input) => handlerFilter(input, item)}
                                  
                               //    classes={{
                               //       checked: classes.checked,
                               //       root: classes.checkRoot,
                               //    }}
                               />
                            }
                           //  classes={{ label: classes.label, root: classes.labelRoot }}
                            label={value.phoneNumber.name}
                           //  className={classes.formControl}
                         />
                        ))}
                          {listUser.map((value, index) => (
                            <FormControlLabel
                            control={
                               <Checkbox
                                  tabIndex={-1}
                                  checked={value.checked}
                                  value={value.id}
                                  checkedIcon={<Check   />}
                                  icon={<Check  />}
                                  // onClick={(input) => handlerFilter(input, item)}
                                  
                               //    classes={{
                               //       checked: classes.checked,
                               //       root: classes.checkRoot,
                               //    }}
                               />
                            }
                           //  classes={{ label: classes.label, root: classes.labelRoot }}
                            label={value.phoneNumber.name}
                           //  className={classes.formControl}
                         />
                        ))}
                  {/* <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={listUser}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.phoneNumber.name}
                    renderOption={(props, option, { selected }) => (
                       <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={true}
                          value={option.phoneNumber.id}
                          onClick={(input) => console.log("input ",input)}
                        />
                        {option.phoneNumber.name}
                      </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...getFieldProps('role')}
                        error={Boolean(touched.role && errors.role)}
                        helperText={touched.role && errors.role}
                        label="Phong cách"
                        placeholder="Favorites"
                        // value={values.address}
                      />
                    )}
                  />
                */}

               
                </Stack>
                <TextField
                  {...getFieldProps("company")}
                  error={Boolean(touched.company && errors.company)}
                  helperText={touched.company && errors.company}
                  value={values.company}
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
