import React from "react";
import { IonGrid, IonCol, IonRow, IonIcon, IonList, } from "@ionic/react";
import { trashBinOutline, pencilOutline, eyeOutline } from 'ionicons/icons';
import { Content } from "../../models/Content";
import { useHistory } from 'react-router';

interface Props {
  content: Content;
  onDelete: (content: Content) => void;
}

const ContentListItem: React.FC<Props> = ({ content, onDelete}) => {
  const history = useHistory();

  return (
    <IonList>
      <IonGrid>
        <IonRow>
          <IonCol>
            {content.title}
          </IonCol>
          <IonCol>
            {content.details}
          </IonCol>
          <IonCol>
            <IonIcon icon={eyeOutline} onClick={() => history.push(`/contents/detail/${content.id}`)}/>
            &nbsp;
            &nbsp;
            <IonIcon icon={pencilOutline} onClick={() => history.push(`/contents/edit/${content.id}`)}/>
            &nbsp;
            &nbsp;
            <IonIcon icon={trashBinOutline} onClick={() => onDelete(content)}/>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonList>
  );
};

export default ContentListItem;