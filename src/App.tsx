import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { observer } from 'mobx-react';
import Home from './Home';

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
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </React.StrictMode>
);

export default observer(App);
