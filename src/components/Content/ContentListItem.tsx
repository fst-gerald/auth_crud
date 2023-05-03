import React, { useState } from "react";
import {
  IonIcon,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert
} from "@ionic/react";
import { trashBinOutline, pencilOutline, eyeOutline } from 'ionicons/icons';
import { Content } from "../../models/Content";
import { useHistory } from 'react-router';

interface Props {
  content: Content;
  onDelete: (content: Content) => void;
}

const ContentListItem: React.FC<Props> = ({ content, onDelete}) => {
  const history = useHistory();

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <IonList>
      <IonCard>
      <IonCardHeader>
        <IonCardTitle>{content.title}</IonCardTitle>
        {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
      </IonCardHeader>
      <IonCardContent>
        {content.details}
      </IonCardContent>
      <div className="container-actions">
        <IonGrid>
        <div className="hr"/>
          <IonRow>
            <IonCol>
              <IonIcon icon={eyeOutline} onClick={() => history.push(`/contents/detail/${content.id}`)}/>
            </IonCol>
            <IonCol>
              <IonIcon icon={pencilOutline} color="primary" onClick={() => history.push(`/contents/edit/${content.id}`)}/>
            </IonCol>
            <IonCol>
              <IonIcon icon={trashBinOutline} color="danger" id="delete-alert" onClick={() => setShowDeleteAlert(true)}/>
              <IonAlert
                isOpen={showDeleteAlert}
                onDidDismiss={() => setShowDeleteAlert(false)}
                cssClass="my-custom-class"
                header={"Warning!"}
                message={"Delete selected content?"}
                buttons={[
                  {
                    text: "Cancel",
                    role: "cancel",
                  },
                  {
                    text: "Okay",
                    handler: () => {
                      onDelete(content)
                    }
                  }
                ]}
              />
            </IonCol>
          </IonRow>
      </IonGrid>
      </div>
    </IonCard>
    </IonList>
  );
};

export default ContentListItem;