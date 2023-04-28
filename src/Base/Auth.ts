import { Preferences } from '@capacitor/preferences';
import { AxiosError } from 'axios';
import { Axios } from "./Axios";
import { User } from '../models/User';

type loginCredentials = {
  email: string;
  password: string;
  device_id: string;
};

export module Auth {
  export const createToken = async (credentials: loginCredentials) => {
    const createdToken = await Axios.client.post("/api/auth/token", credentials);

    Preferences.set({
      key: 'token',
      value: createdToken.data,
    });
  }

  export const getCurrentToken = async () => {
    const pref = await Preferences.get({ key: 'token' });
    const token = pref.value;

    return token;
  }

  export const isLoggedIn = async () => {
    const user = await getUser();

    if (Object.keys(user).length > 0) {
      return true;
    }

    return false;
  }

  export const getUser = async () => {
    try {
      const user = await Axios.client.get<User>('/api/users/user', {
        headers: {
          'Authorization': 'Bearer ' + await getCurrentToken()
        }
      });

      return user.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.response?.data);
      
      return {};
    }
  }

  export const logout = async () => {
    await Axios.client.post('/api/auth/logout', {}, {
      headers: {
        'Authorization': 'Bearer ' + await Auth.getCurrentToken()
      }
    });

    await Preferences.remove({ key: 'token' });
  }
}
