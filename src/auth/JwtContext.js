import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession, jwtDecode } from './utils';

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.accessToken ? action.payload.user : null,
        accessToken: action.payload.accessToken,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.accessToken ? action.payload.user : null,
        accessToken: action.payload.accessToken,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const { id: tokenID } = jwtDecode(accessToken);

        const response = await axios.get(`/user/${tokenID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const role = await axios.get(`/role/${response.data.role_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const {first_name} = response.data;
        const {last_name} = response.data;
        const {email} = response.data;
        const {name} = role.data;
        const {id} = response.data;

        // meter los datos en user
        const user = {
          first_name,
          last_name,
          email,
          name,
          id,
        };

        console.log(user);

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
            accessToken,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
            accessToken: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
          accessToken: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });
      const { token, user } = response.data;

      setSession(token);

      console.log('Token:', token); // Imprime el token en la consola

      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          accessToken: token,
        },
      });

    } catch (error) {
      console.error(error);
    }
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    try {
      const response = await axios.post('/api/account/register', {
        email,
        password,
        firstName,
        lastName,
      });
      const { token, user } = response.data;

      setSession(token);

      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          accessToken: token,
        },
      });

      const { id: tokenID } = jwtDecode(token);

      // eslint-disable-next-line no-unused-vars
      const response2 = await axios.get(`/user/${tokenID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


    } catch (error) {
      console.error(error);
    }

  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  useEffect(() => {
    let logoutTimer;

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, 30 * 60 * 1000); // 30 minutes

    };

    if (state.isAuthenticated) {
      resetLogoutTimer();
    }

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [state.isAuthenticated, logout]);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      accessToken: state.accessToken,
      method: 'jwt',
      login,
      register,
      logout,
    }),
    [state.isInitialized, state.isAuthenticated, state.user, state.accessToken, login, register, logout]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}