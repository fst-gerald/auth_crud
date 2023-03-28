import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { Preferences } from '@capacitor/preferences';
import './Home.css';
import { Auth } from '../Base/Auth';
import { Axios } from '../Base/Axios';

const Home: React.FC = () => {
  const history         = useHistory();
  const [user, setUser] = useState<object>({});

  const handleLogout = async () => {
    await Axios.client.post('/api/logout', {}, {
      headers: {
        'Authorization': 'Bearer ' + await Auth.getCurrentToken()
      }
    });

    await Preferences.remove({ key: 'token' });
    
    history.replace("/login");
  }

  useEffect(() => {
    (async () => {
      const currentUser = await Auth.getUser();

      if (Object.keys(currentUser).length == 0) {
        history.replace('/login'); 
      } else {
        setUser(currentUser);
      }
    })();
  
    return () => {};
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
          <IonButton slot="end" onClick={handleLogout}>Log Out</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
