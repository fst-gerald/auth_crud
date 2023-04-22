import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
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
import { save } from "ionicons/icons";

type ContentParams = {
    contentId: string;
  };

const ContentEdit: React.FC = () => {
    const history = useHistory();
    const { contentId } = useParams<ContentParams>();
    const [content, setContent] = useState<Content>();

    const handleUpdateContent = async () => {
        await ContentManager.updateContent(content!);

        history.push('/home');
    }
    
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
                                        value={content?.details}
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
                                onClick={handleUpdateContent}>
                                <IonIcon icon={save}></IonIcon>
                                Save Changes
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default ContentEdit;