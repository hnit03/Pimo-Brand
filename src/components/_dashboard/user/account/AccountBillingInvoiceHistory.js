import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Link, Stack, Button, Typography } from '@material-ui/core';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
import db from '../../../../adapter/firebase'
import { useEffect } from 'react';
import { useState } from 'react'

// ----------------------------------------------------------------------

AccountBillingInvoiceHistory.propTypes = {
   invoices: PropTypes.array
};

export default function AccountBillingInvoiceHistory({ invoices }) {

   const [history, setHistory] = useState([])
   var item_firebase = []

   const fetchBlogs = async () => {
      const response = db.collection('history');
      const data = await response.get();
      data.docs.forEach(item => {
         item_firebase.push({ ...item.data(), id: item.id })
      })
      setHistory(item_firebase)
   }

   useEffect(() => {
      fetchBlogs()
   }, [])

   useEffect(() => {
      console.log(history);
      history.map((item, index) => {
         console.log(item.modelName)
         console.log(item.nameCasting)
         console.log(item.value)
         console.log((item.dateCreate.toDate()).toLocaleDateString('vi-vn'))
      })
   }, [history])

   return (
      <Stack spacing={3} alignItems="flex-end">
         <Typography variant="subtitle1" sx={{ width: 1 }}>
            Lịch sử thanh toán
         </Typography>

         <Stack spacing={2} sx={{ width: 1 }}>
            {
               (history.length > 0) ?
                  (history.map((item, index) => (
                     <Stack key={item.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
                        <Typography variant="body2" sx={{ minWidth: 120 }}>
                           {(item.dateCreate.toDate()).toLocaleDateString('vi-vn', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </Typography>
                        <Typography variant="body2" sx={{ minWidth: 180 }} style={{ wordWrap: 'break-word' }}>
                           {item.nameCasting}
                        </Typography>
                        <Typography variant="body2" sx={{ minWidth: 130 }} style={{textAlign: 'right'}}>{item.value} VND</Typography>
                     </Stack>
                  ))) : null
            }
         </Stack>
      </Stack>
   );
}
