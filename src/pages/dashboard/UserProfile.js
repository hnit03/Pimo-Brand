import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import {
   Card,
   Table,
   Stack,
   Avatar,
   Button,
   Checkbox,
   TableRow,
   TableBody,
   TableCell,
   Container,
   Typography,
   TableContainer,
   TablePagination
} from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { deleteUser, getApplyList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UserListHead, UserListToolbar, BrandMoreMenu } from '../../components/_dashboard/user/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
   { id: 'name', label: 'Tên', alignRight: false },
   { id: 'company', label: 'Tài năng', alignRight: false },
   { id: 'role', label: 'Địa chỉ', alignRight: false },
   { id: 'isVerified', label: 'Xác thực', alignRight: false },
   { id: 'status', label: 'Chiến dịch tham gia', alignRight: false },
   { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
   }
   return 0;
}

function getComparator(order, orderBy) {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
   const stabilizedThis = array.map((el, index) => [el, index]);
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
   });
   if (query) {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
   }
   return stabilizedThis.map((el) => el[0]);
}

export default function UserList() {
   const { themeStretch } = useSettings();
   const theme = useTheme();
   const dispatch = useDispatch();
   const { userList } = useSelector((state) => state.user);
   console.log('userLISSSSS ' ,userList)
   const [page, setPage] = useState(0);
   const [order, setOrder] = useState('desc');
   const [selected, setSelected] = useState([]);
   const [orderBy, setOrderBy] = useState('name');
   const [filterName, setFilterName] = useState('');
   const [rowsPerPage, setRowsPerPage] = useState(5);

   useEffect(() => {
      dispatch(getApplyList());
   }, [dispatch]);

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = userList.map((n) => n.name);
         setSelected(newSelecteds);
         return;
      }
      setSelected([]);
   };

   const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleFilterByName = (event) => {
      setFilterName(event.target.value);
   };

   const handleDeleteUser = (userId) => {
      dispatch(deleteUser(userId));
   };

   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

   const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

   const isUserNotFound = filteredUsers.length === 0;

   return (
      <Page title="User: List | Minimal-UI">
         <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
               heading="Danh sách người mẫu"
               links={[
                  { name: 'Trang chủ', href: PATH_DASHBOARD.root },
                  { name: 'Người mẫu', href: PATH_DASHBOARD.user.root },
                  { name: 'Danh sách' }
               ]}
               // action={
               //    <Button
               //       variant="contained"
               //       component={RouterLink}
               //       to={PATH_DASHBOARD.brand.newUser}
               //       startIcon={<Icon icon={plusFill} />}
               //    >
               //       Thêm nhãn hàng
               //    </Button>
               // }
            />

            <Card>
               <UserListToolbar placeholder='Tìm kiếm người mẫu...' numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

               <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                     <Table>
                        <UserListHead
                           order={order}
                           orderBy={orderBy}
                           headLabel={TABLE_HEAD}
                           rowCount={userList.length}
                           numSelected={selected.length}
                           onRequestSort={handleRequestSort}
                           onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBody>
                           {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                              const { id, name, role, status, company, avatarUrl, isVerified,country } = row;
                              const isItemSelected = selected.indexOf(name) !== -1;
                              return (
                                 <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}
                                    role="checkbox"
                                    selected={isItemSelected}
                                    aria-checked={isItemSelected}
                                 >
                                    {/* <TableCell padding="checkbox">
                                       <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                                    </TableCell> */}
                                    <TableCell component="th" scope="row" padding="none">
                                       <Stack direction="row" alignItems="center" spacing={2}>
                                          <Avatar alt={name} src={avatarUrl} />
                                          <Typography variant="subtitle2" noWrap>
                                             {name}
                                          </Typography>
                                       </Stack>
                                    </TableCell>
                                    <TableCell align="left">{company}</TableCell>
                                    <TableCell align="left">{role}</TableCell>
                                    <TableCell align="left">{isVerified ? 'Đã xác thực' : 'Chưa xác thực'}</TableCell>
                                    <TableCell align="left">
                                       {/* <Label
                                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                          color={(status === 'banned' && 'error') || 'success'}
                                       >
                                          {((status === 'banned') ? 'Ngừng hoạt động' : 'Hoạt động')}
                                       </Label> */}
                                       {country}
                                    </TableCell>

                                    <TableCell align="right">
                                       <BrandMoreMenu onDelete={() => handleDeleteUser(id)} userName={name} castingName={country}/>
                                    </TableCell>
                                 </TableRow>
                              );
                           })}
                           {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                 <TableCell colSpan={6} />
                              </TableRow>
                           )}
                        </TableBody>
                        {isUserNotFound && (
                           <TableBody>
                              <TableRow>
                                 <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={filterName} />
                                 </TableCell>
                              </TableRow>
                           </TableBody>
                        )}
                     </Table>
                  </TableContainer>
               </Scrollbar>

               <TablePagination
                  labelRowsPerPage={"Số hàng trong trang"}
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={userList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
               />
            </Card>
         </Container>
      </Page>
   );
}
