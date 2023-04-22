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
import { Content } from "../models/Content";
import { useEffect, useState } from "react";
import { Auth } from "../base/Auth";
import { useHistory, useParams } from 'react-router';
import { ContentManager } from "../managers/ContentManager";
import { pencil} from "ionicons/icons";

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
  }, [history, contentId]);

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
                <IonRow>
                <IonCol>
                    <IonButton expand="block" onClick={() => history.push(`/contents/edit/${content?.id}`)}>
                      <IonIcon icon={pencil}></IonIcon>
                        Go to Editing
                    </IonButton>
                </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
    );
};

export default ContentDetail;