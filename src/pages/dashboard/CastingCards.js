import { useEffect } from 'react';
// material
import { Container, Grid, Skeleton,Button } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUsers,getCastings } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { UserCard,CastingCard } from '../../components/_dashboard/user/cards';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';



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
  console.log('lalala ' ,users)
   useEffect(() => {
    dispatch(getCastings());
  }, [dispatch]);

  return (
    <Page title="Chiến dịch">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <HeaderBreadcrumbs
          heading="User Cards"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Cards' }
          ]}
        /> */}
         <HeaderBreadcrumbs
               heading="Danh sách chiến dịch"
               links={[
                  { name: 'Trang chủ', href: PATH_DASHBOARD.root },
                  { name: 'Chiến dịch', href: PATH_DASHBOARD.casting.cards },
                  { name: 'Danh sách' }
               ]}
               action={
                  <Button
                     variant="contained"
                     component={RouterLink}
                     to={PATH_DASHBOARD.user.newUser}
                     startIcon={<Icon icon={plusFill} />}
                     style={{backgroundColor:'#ff93a6'}}
                  >
                     Thêm chiến dịch
                  </Button>
               }
            />
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid key={user.id} item xs={12} sm={6} md={4}>
              <CastingCard user={user} />
            </Grid>
          ))}

          {!users.length && SkeletonLoad}
        </Grid>
      </Container>
    </Page>
  );
}
