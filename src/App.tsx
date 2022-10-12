import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { observer } from 'mobx-react';
import Home from './Home';
import Info from './Info/router';
import User from './User/router';
import Settings from './Settings/router';

const HomeRedirect = () => {
  return <Redirect to="home" />;
};

const App = () => (
  <React.StrictMode>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route exact path="/" component={HomeRedirect} />
          <Route path="/home" component={Home} />
          {Info}
          {User}
          {Settings}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </React.StrictMode>
);

export default observer(App);
