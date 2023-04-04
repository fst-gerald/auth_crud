import { Preferences } from '@capacitor/preferences';
import { AxiosError } from 'axios';
import { Axios } from "./Axios";

export module Auth {
  export const getCurrentToken = async () => {
    const pref  = await Preferences.get({ key: 'token' });
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
      const user = await Axios.client.get('/api/user', {
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
}
