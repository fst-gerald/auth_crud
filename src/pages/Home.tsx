import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonViewDidEnter
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Home.css';
import { Auth } from '../base/Auth';
import ContentList from '../components/Content/ContentList';
import { Content } from '../models/Content';
import { ContentManager } from '../managers/ContentManager';
import { add } from 'ionicons/icons';
import { Helper } from '../base/Helper';

const Home: React.FC = () => {
  const history = useHistory();
  const [contents, setContents] = useState<Content[]>([]);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(async () => {
      loadContents();
      event.detail.complete();
    }, 1000);
  }

  const loadContents = async () => {
    setContents(await ContentManager.getAllContents());
  }

  const handleDeleteContent = async (content: Content) => {
    await ContentManager.deleteContent(content);

    setContents((currentContents) =>
      currentContents.filter((c) => c.id !== content.id)
    );
  }

  useIonViewDidEnter(() => {
    Helper.showTabBar();
    loadContents();
  });

  useEffect(() => {
    (async () => {
      if (! await Auth.isLoggedIn()) {
        history.replace('/login'); 
      } else {
       loadContents() 
      }
    })();
  
    return () => {};
  }, [history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contents</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Contents</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <ContentList contents={contents} onDelete={handleDeleteContent}/>
      </IonContent>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => history.push(`/contents/add`)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
    </IonPage>
  );
};

export default Home;
