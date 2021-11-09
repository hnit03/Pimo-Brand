import React,{ useEffect } from 'react';
// material
import { Container, Grid, Skeleton } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUsers,getCastingApply } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { UserCard } from '../../components/_dashboard/user/cards';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(8)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

export default function UserCards() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  var [pageNo, setPageNo] = React.useState(1);
  console.log('users2222 ',users)
  useEffect(() => {
    dispatch(getCastingApply(pageNo));
  }, [pageNo]);
  const handleChangePage = (event, value) => {
    setPageNo(value);
    // window.scrollTo(0, 0);
    // changeURL(value);
 };
  return (
    <Page title="Ứng tuyển">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Người mẫu Apply"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Người mẫu', href: PATH_DASHBOARD.user.cards },
            { name: 'Thẻ' }
          ]}
        />
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid key={user.id} item xs={12} sm={6} md={4}>
              <UserCard user={user} />
            </Grid>
          ))}

          {!users.length && SkeletonLoad}
        </Grid>
      </Container>
      <Stack spacing={2} style={{ alignItems: "center", marginBottom: "5%",marginTop:'5rem' }}>
      <Pagination
         onChange={handleChangePage}
         defaultPage={parseInt(pageNo)}
         count={ users.length > 0 ? users[0].follower:1 }
         showFirstButton
         showLastButton
      />
   </Stack>
    </Page>
  );
}
