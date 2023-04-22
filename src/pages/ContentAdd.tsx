import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar
  } from "@ionic/react";
  import { useHistory } from "react-router";
  import { Content } from "../models/Content";
  import { useEffect, useState } from "react";
  import { Auth } from "../base/Auth";
  import { ContentManager } from "../managers/ContentManager";

  const ContentAdd: React.FC = () => {
      const history = useHistory();
      const [content, setContent] = useState<Content>();
      
      const handleCreateContent = async () => {
        await ContentManager.createContent(content!);

        history.push('/home');
      }
      
      useEffect(() => {
          (async () => {
            if (! await Auth.isLoggedIn()) {
              history.replace('/login'); 
            }
          })();
        
          return () => {};
        }, []);
      
      return (
          <IonPage>
              <IonHeader>
                  <IonToolbar>
                      <IonTitle>Content Create</IonTitle>
                  </IonToolbar>
              </IonHeader>
              <IonContent>
                  <IonGrid>
                      <IonRow>
                          <IonCol>
                              <IonItem>
                                  <IonLabel position="floating">Title</IonLabel>
                                      <IonInput
                                          type="text"
                                          onIonChange={(e) => {
                                            const currentContent = {...content};
                                            currentContent.title = e.detail.value!;
                                            setContent(currentContent);
                                          }}
                                          >
                                      </IonInput>
                              </IonItem>
                              &nbsp;
                              <IonItem>
                                  <IonLabel position="floating">Details</IonLabel>
                                      <IonTextarea
                                          autoGrow
                                          onIonChange={(e) => {
                                            const currentContent = {...content};
                                            currentContent.details = e.detail.value!;
                                            setContent(currentContent);
                                          }}
                                          >
                                      </IonTextarea>
                              </IonItem>
                          </IonCol>
                      </IonRow>
                      &nbsp;
                      <IonRow>
                          <IonCol>
                              <IonButton 
                                  expand="block"
                                  onClick={handleCreateContent}>
                                  Save
                              </IonButton>
                          </IonCol>
                      </IonRow>
                  </IonGrid>
              </IonContent>
          </IonPage>
      );
  }
  
  export default ContentAdd;