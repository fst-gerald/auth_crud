import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react"
import { logOut } from 'ionicons/icons';
import { useEffect, useState } from "react";
import { Auth } from "../base/Auth";
import { useHistory } from 'react-router';
import { User } from "../models/User";
  
  const Account: React.FC = () => {
    const history = useHistory();
    const [user, setUser] = useState<User>();

    const handleLogout = async () => {
        Auth.logout();
        history.replace('/login');
    }

    useEffect(() => {
      (async () => {
        if (! await Auth.isLoggedIn()) {
          history.replace('/login'); 
        } else {
          setUser(await Auth.getUser())
        }
      })();
    
      return () => {};
    }, []);
  
      return (
          <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Account</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent fullscreen className="ion-padding ion-text-center">
              <IonGrid>
                  <IonRow>
                      <IonCol>
                          <IonItem>
                              <IonText><b>Name:</b> {user?.name}</IonText>
                          </IonItem>
                          <IonItem>
                              <IonText><b>Email:</b> {user?.email}</IonText>
                          </IonItem>
                          <IonItem>
                              <IonText><b>Updated on:</b> {user?.updated_at?.toString()}</IonText>
                          </IonItem>
                      </IonCol>
                  </IonRow>
                  &nbsp;
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={handleLogout}>
                                <IonIcon icon={logOut}></IonIcon>
                                Logout
                            </IonButton>
                        </IonCol>
                    </IonRow>
              </IonGrid>
          </IonContent>
      </IonPage>
      );
  };
  
  export default Account;