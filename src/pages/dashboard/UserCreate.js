import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserList,getCastings } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  console.log('name ',name)
   const { users } = useSelector((state) => state.user);
   console.log('userList ',users)

  const isEdit = pathname.includes('edit');
  var currentUser = null;
  if(name !== undefined){
     currentUser= users.find((user) => paramCase(user.name) === name);
  }
  var STYLE;
  users.forEach((user) => {
    console.log('user1231 ',user.phoneNumber)

  })
  useEffect(() => {
    dispatch(getCastings());
  }, [dispatch]);

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Tạo mới chiến dịch' : 'Chỉnh sửa chiến dịch'}
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Người mẫu', href: PATH_DASHBOARD.user.root },
            { name: !isEdit ? 'Tạo mới người mẫu' : name }
          ]}
        />

        <UserNewForm isEdit={isEdit} currentUser={currentUser} listUser={users} />
      </Container>
    </Page>
  );
}
