import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider';
import Spinner from '../layouts/Spinner';
import Login from './Login';

const Auth = ({children}) => {
    // const { user, loaded } = useAuth();
    const { user, loaded }:any = useContext(AuthContext);
    //useContext(AxiosContext);

    if (!loaded) {
      return <Spinner />;
    }
    if (children.auth && !user) {
      return <Login />;
    }
    return children
}

export default Auth