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
import {
  informationCircleOutline,
  menuOutline,
  bookOutline,
  layersOutline,
} from 'ionicons/icons';
import { observer } from 'mobx-react';
import Info from './Info';
import Species from './Species';
import UserSurveys from './UserSurveys';
import Menu from './Menu';

const HomeController: FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/home" to="/home/species" />
        <Route path="/home/info" component={Info} exact />
        <Route path="/home/species" component={Species} exact />
        <Route path="/home/user-surveys" component={UserSurveys} exact />
        <Route path="/home/menu" component={Menu} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="/home/species" href="/home/species">
          <IonIcon icon={bookOutline} />
          <IonLabel>Species</IonLabel>
        </IonTabButton>

        <IonTabButton tab="/home/user-surveys" href="/home/user-surveys">
          <IonIcon icon={layersOutline} />
          <IonLabel>Records</IonLabel>
        </IonTabButton>

        <IonTabButton tab="/home/info" href="/home/info">
          <IonIcon icon={informationCircleOutline} />
          <IonLabel>Info</IonLabel>
        </IonTabButton>

        <IonTabButton tab="/home/menu" href="/home/menu">
          <IonIcon icon={menuOutline} />
          <IonLabel>Menu</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default observer(HomeController);
