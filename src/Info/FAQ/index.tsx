import { IonIcon, IonItemDivider, IonList } from '@ionic/react';
import { Header, Page, Main, Collapse } from '@flumens';
import 'common/images/flumens.svg';
import { settingsOutline, arrowUndoOutline } from 'ionicons/icons';
import './styles.scss';

export default () => (
  <Page id="faq">
    <Header title="Frequently asked questions" />
    <Main>
      <IonList lines="none">
        <IonItemDivider>User</IonItemDivider>
        <div className="rounded">
          <Collapse title="Sign in/out or register">
            <p>
              To login, open the main menu page click Login or Register buttons
              and follow the instructions.
              <br />
              <br />
              To logout, visit the main menu page and click the logout button.
              <br />
              <br />
              <b>Note:</b> after registering a new account you must verify your
              email address by clicking on a verification link sent to your
              email .
            </p>
          </Collapse>
        </div>

        <IonItemDivider>Other</IonItemDivider>
        <div className="rounded">
          <Collapse title="Reset the application">
            <p>
              Go to the application settings page{' '}
              <IonIcon icon={settingsOutline} /> and click on the Reset{' '}
              <IonIcon icon={arrowUndoOutline} /> button.
            </p>
          </Collapse>
        </div>
      </IonList>
    </Main>
  </Page>
);
