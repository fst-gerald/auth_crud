import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import { Auth } from '../Base/Auth';
import { Axios } from '../Base/Axios';
import { Device } from '@capacitor/device';
import { AxiosError } from 'axios';

type ErrorResponse = {
  message: string
}

const Login: React.FC = () => {
  const [email, setEmail]       = useState<string>("test@example.com");
  const [password, setPassword] = useState<string>("password");
  const [iserror, setIserror]   = useState<boolean>(false);
  const [message, setMessage]   = useState<string>("");
  const [deviceId, setDeviceId] = useState<string>("");

  const history = useHistory();

  const handleLogin = async () => {
    const loginData = {
        "email": email,
        "password": password,
        "device_id": deviceId
    }
  
    try {
      const createdToken = await Axios.client.post("/api/sanctum/token", loginData);

      Preferences.set({
        key: 'token',
        value: createdToken.data,
      });
      
      history.push("/home");
    } catch (error) {
      const err      = error as AxiosError;
      const response = err.response?.data as ErrorResponse;

      setMessage(response.message);
      setIserror(true)
    }
  };

  useEffect(() => {
    (async () => {
      if (await Auth.isLoggedIn()) {
        history.push('/home');
      } else {
        const deviceIdData = await Device.getId();
        setDeviceId(deviceIdData.uuid);    
      }
    })();
  
    return () => {};
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
        <IonRow>
          <IonCol>
            <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
            />
          </IonCol>
        </IonRow>
          <IonRow>
            <IonCol>
            <IonItem>
            <IonLabel position="floating"> Email</IonLabel>
            <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                >
            </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
            <IonItem>
              <IonLabel position="floating"> Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                >
              </IonInput>
            </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
              <p style={{ fontSize: "medium" }}>
                  Don't have an account? <a href="#">Sign up!</a>
              </p>

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;