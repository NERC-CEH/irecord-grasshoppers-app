import { FC } from 'react';
import {
  IonTabs,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonTabBar,
  IonRouterOutlet,
} from '@ionic/react';
import { Redirect, Route } from 'react-router';
import { menuOutline, bookOutline } from 'ionicons/icons';
import { observer } from 'mobx-react';
import Info from './Info';
import Species from './Species';

const HomeController: FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/home" to="/home/species" />
        <Route path="/home/info" component={Info} exact />
        <Route path="/home/species" component={Species} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="/home/species" href="/home/species">
          <IonIcon icon={bookOutline} />
          <IonLabel>Species</IonLabel>
        </IonTabButton>

        <IonTabButton tab="/home/info" href="/home/info">
          <IonIcon icon={menuOutline} />
          <IonLabel>Info</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default observer(HomeController);
