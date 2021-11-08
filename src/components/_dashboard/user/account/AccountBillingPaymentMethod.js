import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import plusFill from '@iconify/icons-eva/plus-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Box, Paper, Stack, Card, Button, Collapse, TextField, IconButton, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import db from '../../../../adapter/firebase'
import { useEffect } from 'react';
import { useState } from 'react'
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// ----------------------------------------------------------------------

AccountBillingPaymentMethod.propTypes = {
   formik: PropTypes.object,
   cards: PropTypes.array,
   isOpen: PropTypes.bool,
   onOpen: PropTypes.func,
   onCancel: PropTypes.func
};




export default function AccountBillingPaymentMethod({ formik, cards, isOpen, onOpen, onCancel }) {
   const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
   const [cardName, setCardName] = useState()
   const [cardExpired, setCardExpired] = useState()
   const [cardNumber, setCardNumber] = useState()
   const [cardCVV, setCardCVV] = useState()
   const [cardType, setCardType] = useState()
   const [card, setCard] = useState([])
   var item_firebase = []

   const fetchBlogs = async () => {
      const response = db.collection('card');
      const data = await response.get();
      data.docs.forEach(item => {
         item_firebase.push({ ...item.data(), id: item.id })
      })
      setCard(item_firebase)
   }

   useEffect(() => {
      fetchBlogs()
   }, [])

   useEffect(() => {
      console.log(card)
   }, [card])

   const clearForm = () => {
      setCardName('')
      setCardExpired('')
      setCardNumber('')
      setCardCVV('')
      setCardType('')
   }

   const submitEvent = (e) => {
      e.preventDefault()
      db.collection("card")
         .add({
            cardCVV: cardCVV,
            cardExpired: cardExpired,
            cardName: cardName,
            cardNumber: cardNumber,
            cardType: cardType,
         })
         .then(() => {
            fetchBlogs();
            clearForm();
         });
   }

   return (
      <Card sx={{ p: 3 }}>
         <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
            Phương thức thanh toán
         </Typography>
         <Grid container spacing={2}>
            {
               (card.length > 0) ?
                  (card.map((item, index) => (
                     <Grid item xs={6}>
                        <Paper
                           key={item.id}
                           sx={{
                              p: 3,
                              position: 'relative',
                              border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
                           }}
                        >
                           <Box
                              component="img"
                              alt="icon"
                              src={item.cardType === 'master_card' ? '/static/icons/ic_mastercard.svg' : '/static/icons/ic_visa.svg'}
                              sx={{ mb: 1 }}
                           />
                           <Typography variant="subtitle2">{item.cardNumber}</Typography>
                           <Typography variant="subtitle2">{item.cardName}</Typography>
                           <Typography variant="subtitle2">Exp: {item.cardExpired}</Typography>
                           <IconButton
                              sx={{
                                 top: 8,
                                 right: 8,
                                 position: 'absolute'
                              }}
                           >
                              <Icon icon={moreVerticalFill} width={20} height={20} />
                           </IconButton>
                        </Paper>
                     </Grid>
                  ))) : null
            }
         </Grid>

         <Box sx={{ mt: 3 }}>
            <Button style={{color:'rgb(255, 147, 166)'}} size="small" startIcon={<Icon style={{color:'rgb(255, 147, 166)'}} icon={plusFill} />} onClick={onOpen}>
               Thêm thẻ mới
            </Button>
         </Box>

         <Collapse in={isOpen}>
            <Box
               sx={{
                  padding: 3,
                  marginTop: 3,
                  borderRadius: 1,
                  bgcolor: 'background.neutral'
               }}
            >
               <FormikProvider value={formik}>
                  <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                     <Stack spacing={3}>
                        <Typography variant="subtitle1">Thêm thẻ mới</Typography>
                        <Grid container spacing={2} >
                           <div style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: '1rem' }}>
                              <p>Chọn loại thẻ:</p>
                           </div>
                           <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                              <Grid item xs={6} style={{ display: 'flex', paddingLeft: '1rem' }}>
                                 <FormControlLabel value="female" control={<Radio />} label=""
                                    onClick={() => setCardType('master_card')} />
                                 <img src="https://cdn.freelogovectors.net/wp-content/uploads/2016/12/mastercard-logo2.png" alt="icon"
                                    style={{ width: '4rem' }} />
                              </Grid>
                              <Grid item xs={6} style={{ display: 'flex', paddingLeft: '1rem' }}>
                                 <FormControlLabel value="male" control={<Radio />} label=""
                                    onClick={() => setCardType('visa')} />
                                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/3072px-Former_Visa_%28company%29_logo.svg.png" alt="icon"
                                    style={{ width: '4rem' }} />
                              </Grid>
                           </RadioGroup>
                        </Grid>


                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                           <TextField
                              fullWidth
                              label="Tên chủ thẻ"
                              // {...getFieldProps('cardName')}
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              error={Boolean(touched.cardName && errors.cardName)}
                              helperText={touched.cardName && errors.cardName}
                           />

                           <TextField
                              fullWidth
                              label="Mã số thẻ"
                              // {...getFieldProps('cardNumber')}
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              error={Boolean(touched.cardNumber && errors.cardNumber)}
                              helperText={touched.cardNumber && errors.cardNumber}
                           />
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                           <TextField
                              fullWidth
                              label="Ngày hết hạn"
                              placeholder="MM/YY"
                              // {...getFieldProps('cardExpired')}
                              value={cardExpired}
                              onChange={(e) => setCardExpired(e.target.value)}
                              error={Boolean(touched.cardExpired && errors.cardExpired)}
                              helperText={touched.cardExpired && errors.cardExpired}
                           />

                           <TextField
                              fullWidth
                              label="Mã CVV"
                              type="password"
                              // {...getFieldProps('cardCvv')}
                              value={cardCVV}
                              onChange={(e) => setCardCVV(e.target.value)}
                              error={Boolean(touched.cardCvv && errors.cardCvv)}
                              helperText={touched.cardCvv && errors.cardCvv}
                           />
                        </Stack>

                        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                           <Button type="button" color="inherit" variant="outlined" onClick={onCancel}>
                              Hủy
                           </Button>
                           <LoadingButton style={{backgroundColor:'rgb(255, 147, 166)'}} type="submit" variant="contained" onClick={(e) => submitEvent(e)}>
                              Lưu thay đổi
                           </LoadingButton>
                        </Stack>
                     </Stack>
                  </Form>
               </FormikProvider>
            </Box>
         </Collapse>
      </Card>
   );
}
