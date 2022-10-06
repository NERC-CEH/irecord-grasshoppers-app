import { Page, Main } from '@flumens';
import { observer } from 'mobx-react';
import { IonIcon, IonList, IonItem } from '@ionic/react';
import { heartOutline, informationCircleOutline } from 'ionicons/icons';
import './styles.scss';

const InfoController = () => {
  return (
    <Page id="info">
      <Main className="info">
        <div className="app-title">
          <div>
            <h1>
              iRecord <span>Grasshoppers</span>
            </h1>
            <div className="subtitle">and related insects</div>
          </div>
        </div>
        <IonList lines="full">
          <div className="rounded">
            <IonItem routerLink="/info/about" detail>
              <IonIcon
                icon={informationCircleOutline}
                size="small"
                slot="start"
              />
              About this App
            </IonItem>
            <IonItem routerLink="/info/partners" detail>
              <IonIcon
                icon={informationCircleOutline}
                size="small"
                slot="start"
              />
              Partners
            </IonItem>
            <IonItem routerLink="/info/whereToLook" detail>
              <IonIcon
                icon={informationCircleOutline}
                size="small"
                slot="start"
              />
              Where to Look
            </IonItem>
            <IonItem routerLink="/info/furtherReading" detail>
              <IonIcon
                icon={informationCircleOutline}
                size="small"
                slot="start"
              />
              Further Reading
            </IonItem>
            <IonItem routerLink="/info/faq" detail>
              <IonIcon
                icon={informationCircleOutline}
                size="small"
                slot="start"
              />
              Frequently Asked Questions
            </IonItem>
            <IonItem routerLink="/info/credits" detail>
              <IonIcon icon={heartOutline} size="small" slot="start" />
              Credits
            </IonItem>
          </div>
        </IonList>
      </Main>
    </Page>
  );
};

export default observer(InfoController);
