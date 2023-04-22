import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import { Content } from "../models/Content";
import { useEffect, useState } from "react";
import { Auth } from "../base/Auth";
import { useHistory, useParams } from 'react-router';
import { ContentManager } from "../managers/ContentManager";

type ContentParams = {
    contentId: string;
  };

const ContentDetail: React.FC = () => {
    const history = useHistory();
    const { contentId } = useParams<ContentParams>();
    const [content, setContent] = useState<Content>();

  useEffect(() => {
    (async () => {
      if (! await Auth.isLoggedIn()) {
        history.replace('/login'); 
      } else {
        const selectedContent = await ContentManager.getContent(Number(contentId));
        setContent(selectedContent);
      }
    })();
  
    return () => {};
  }, []);

    return (
        <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Content Detail</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding ion-text-center">
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem lines="none">
                            <IonText><b>Title:</b> {content?.title}</IonText>
                        </IonItem>
                        <IonItem lines="none">
                            <IonText><b>Details:</b> {content?.details}</IonText>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
    );
};

export default ContentDetail;