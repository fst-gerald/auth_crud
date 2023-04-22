import {
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
import { useHistory, useParams } from "react-router";
import { Content } from "../models/Content";
import { useEffect, useState } from "react";
import { Auth } from "../base/Auth";
import { ContentManager } from "../managers/ContentManager";

type ContentParams = {
    contentId: string;
  };

const ContentEdit: React.FC = () => {
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
                    <IonTitle>Content Edit</IonTitle>
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
                                        value={content?.title}
                                        >
                                    </IonInput>
                            </IonItem>
                            &nbsp;
                            <IonItem>
                                <IonLabel position="floating">Details</IonLabel>
                                    <IonTextarea
                                        autoGrow
                                        value={content?.details}
                                        >
                                    </IonTextarea>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default ContentEdit;