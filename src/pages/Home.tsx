import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Home.css';
import { Auth } from '../base/Auth';
import ContentList from '../components/Content/ContentList';
import { Content } from '../models/Content';
import { ContentManager } from '../managers/ContentManager';

const Home: React.FC = () => {
  const history = useHistory();
  const [contents, setContents] = useState<Content[]>([]);

  const handleLogout = async () => {
    Auth.logout();
    history.replace('/login');
  }

  const handleDeleteContent = async (content: Content) => {
    await ContentManager.deleteContent(content);

    setContents((currentContents) =>
      currentContents.filter((c) => c.id !== content.id)
    );
  }

  useEffect(() => {
    (async () => {
      if (! await Auth.isLoggedIn()) {
        history.replace('/login'); 
      } else {
        setContents(await ContentManager.getAllContents());
      }
    })();
  
    return () => {};
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contents</IonTitle>
          <IonButton slot="end" onClick={handleLogout}>Log Out</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Contents</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ContentList contents={contents} onDelete={handleDeleteContent}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
