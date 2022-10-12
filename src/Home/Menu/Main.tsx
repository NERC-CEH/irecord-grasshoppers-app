import { FC } from 'react';
import { Main, InfoMessage } from '@flumens';
import { observer } from 'mobx-react';
import { UserModel } from 'models/user';
import {
  IonIcon,
  IonList,
  IonItem,
  IonItemDivider,
  IonButton,
} from '@ionic/react';
import {
  settingsOutline,
  personAddOutline,
  personOutline,
  exitOutline,
} from 'ionicons/icons';

type Props = {
  isLoggedIn: boolean;
  userModel: UserModel;
  logOut: () => void;
  refreshAccount: () => void;
  resendVerificationEmail: () => void;
};

const MenuMain: FC<Props> = ({
  isLoggedIn,
  userModel,
  logOut,
  refreshAccount,
  resendVerificationEmail,
}) => {
  const isNotVerified = userModel.attrs.verified === false; // verified is undefined in old versions
  const userEmail = userModel.attrs.email;

  return (
    <Main className="app-menu">
      <h1>Menu</h1>

      <IonList lines="full">
        <IonItemDivider>User</IonItemDivider>
        <div className="rounded">
          {isLoggedIn && (
            <IonItem detail id="logout-button" onClick={logOut}>
              <IonIcon icon={exitOutline} size="small" slot="start" />
              Logout
              {': '}
              {userModel.attrs.firstName} {userModel.attrs.lastName}
            </IonItem>
          )}

          {isLoggedIn && isNotVerified && (
            <InfoMessage className="verification-warning">
              Looks like your <b>{{ userEmail }}</b> email hasn't been verified
              yet.
              <div>
                <IonButton fill="outline" onClick={refreshAccount}>
                  Refresh
                </IonButton>
                <IonButton fill="clear" onClick={resendVerificationEmail}>
                  Resend Email
                </IonButton>
              </div>
            </InfoMessage>
          )}

          {!isLoggedIn && (
            <IonItem routerLink="/user/login" detail>
              <IonIcon icon={personOutline} size="small" slot="start" />
              Login
            </IonItem>
          )}

          {!isLoggedIn && (
            <IonItem routerLink="/user/register" detail>
              <IonIcon icon={personAddOutline} size="small" slot="start" />
              Register
            </IonItem>
          )}
        </div>

        <IonItemDivider>Settings</IonItemDivider>
        <div className="rounded">
          <IonItem routerLink="/settings/menu" detail>
            <IonIcon icon={settingsOutline} size="small" slot="start" />
            App
          </IonItem>
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MenuMain);
