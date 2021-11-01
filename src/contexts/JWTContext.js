import React,{ createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import Cookies from 'universal-cookie';
import JSCookies from 'js-cookie';
import jwt from 'jwt-decode';
import Login from '../pages/authentication/Login'
 
// ----------------------------------------------------------------------

const initialState = {
   isAuthenticated: false,
   isInitialized: false,
   user: null
};

const handlers = {
   INITIALIZE: (state, action) => {
      const { isAuthenticated, user } = action.payload;
      return {
         ...state,
         isAuthenticated,
         isInitialized: true,
         user
      };
   },
   LOGIN: (state, action) => {
      const { user } = action.payload;

      return {
         ...state,
         isAuthenticated: true,
         user
      };
   },
   LOGOUT: (state) => ({
      ...state,
      isAuthenticated: false,
      user: null
   }),
   REGISTER: (state, action) => {
      const { user } = action.payload;

      return {
         ...state,
         isAuthenticated: true,
         user
      };
   }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
   ...initialState,
   method: 'jwt',
   login: () => Promise.resolve(),
   logout: () => Promise.resolve(),
   register: () => Promise.resolve()
});

AuthProvider.propTypes = {
   children: PropTypes.node
};

function AuthProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState);
 
   useEffect(() => {
      const initialize = async () => {
         try {
            // const accessToken = window.localStorage.getItem('accessToken');
            const accessToken = JSCookies.get('jwt')
            console.log(jwt(accessToken));

            if (accessToken) {
               // setSession(accessToken);
              const url = `https://api.pimo.studio/api/v1/brands/profile/${jwt(accessToken)[Object.keys(jwt(accessToken))[4]]}`
               //  const {data} = await axios.get(`${url}`);
             fetch(url)
            .then(res=>res.json())
            .then(data=>
              {

                 console.log(data ,' hihi');
               //   const user = JSON.parse(JSCookies.get('user'));
               const user = {
                   about: data.brand.brand.description,
                  address: data.brand.brand.address,
                  displayName: data.brand.brand.name,
                  email: data.brand.brand.mail,
                  id: data.brand.brand.id,
                  isPublic:true,
                  phoneNumber: data.brand.brand.phone,
                  photoURL: data.brand.brand.logo,
                  role:'Nhãn hàng'
                  // about: 'data.brand.description',
                  //  address: 'data.brand.address',
                  // displayName: 'data.brand.name',
                  // email: 'data.brand.mail',
                  // id: 'data.brand.id',
                  // isPublic:true,
                  // phoneNumber: 'data.brand.phone',
                  // photoURL: 'data.brand.logo',
                  // role:'Nhãn hàng'

               }
               console.log(user);
                 dispatch({
                    type: 'INITIALIZE',
                    payload: {
                       isAuthenticated: true,
                       user
                    }
                 });
              }
               )
               
                // const { user } = response.data;
              
            } else {
               dispatch({
                  type: 'INITIALIZE',
                  payload: {
                     isAuthenticated: false,
                     user: null
                  }
               });
            }
         } catch (err) {
            console.error(err);
            dispatch({
               type: 'INITIALIZE',
               payload: {
                  isAuthenticated: false,
                  user: null
               }
            });
         }
      };

      initialize();
   }, []);

   const login = async () => {
   
      const cookies = new Cookies();
      const response = await axios.post('/api/account/login');
        const { accessToken } = response.data;
      // setSession(accessToken)
      // cookies.set('user', user, { path: '/', maxAge: 60 * 60 * 1000 });
    
      const role = jwt(accessToken)[Object.keys(jwt(accessToken))[3]];
      console.log('role ',role)
      if(role === 'Brand'){
         cookies.set('jwt', accessToken, { path: '/', maxAge: 60 * 60 * 1000 });
          const url = `https://api.pimo.studio/api/v1/brands/profile/${jwt(accessToken)[Object.keys(jwt(accessToken))[4]]}`
         //  const {data} = await axios.get(`${url}`);
       fetch(url)
      .then(res=>res.json())
      .then(data=>
        {
           console.log(data.brand.brand , " lala");
         //   const user = JSON.parse(JSCookies.get('user'));
         const user = {
            about: data.brand.brand.description,
            address: data.brand.brand.address,
            displayName: data.brand.brand.name,
            email: data.brand.brand.mail,
            id: data.brand.brand.id,
            isPublic:true,
            phoneNumber: data.brand.brand.phone,
            photoURL: data.brand.brand.logo,
            role:'Nhãn hàng'
         }
         console.log(user);
         dispatch({
            type: 'LOGIN',
            payload: {
               user
            }
         });
        }
         )
      } else{
        console.log('alalalalalala') 
      return [200, { message: true }];
         // <Login/> 
        }
      // setSession(user);
      
   };
   
   const register = async (email, password, firstName, lastName) => {
      const response = await axios.post('/api/account/register', {
         email,
         password,
         firstName,
         lastName
      });
      const { accessToken, user } = response.data;

      window.localStorage.setItem('accessToken', accessToken);
      dispatch({
         type: 'REGISTER',
         payload: {
            user
         }
      });
   };

   const logout = async () => {
      // setSession(null);
      JSCookies.remove('jwt')
       dispatch({ type: 'LOGOUT' });
   };

   const resetPassword = () => { };

   const updateProfile = () => { };

   return (
      <AuthContext.Provider
         value={{
            ...state,
            method: 'jwt',
            login,
            logout,
            register,
            resetPassword,
            updateProfile
         }}
      >
           
         {children}
      </AuthContext.Provider>
   );
}



export { AuthContext, AuthProvider };
