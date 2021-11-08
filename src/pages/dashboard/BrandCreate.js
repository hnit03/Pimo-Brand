import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getApplyList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import BrandNewForm from '../../components/_dashboard/user/BrandNewForm';

// ----------------------------------------------------------------------

export default function BrandCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name,country } = useParams();
  console.log('country ',country)
   const { userList } = useSelector((state) => state.user);
  const isEdit = pathname.includes('edit');
  const currentUser = userList.find((user) => (
    paramCase(user.name) === name && paramCase(user.country) === country
  ));

  useEffect(() => {
    dispatch(getApplyList());
  }, [dispatch]);

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <HeaderBreadcrumbs
          heading={!isEdit ? 'Tạo mới nhãn hàng' : 'Thông tin'}
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Người mẫu', href: PATH_DASHBOARD.user.profile },
            { name: !isEdit ? 'Tạo mới nhãn hàng' : name }
          ]}
        /> */}

        <BrandNewForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
