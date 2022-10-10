import { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import { observer } from 'mobx-react';
import { Page, Main } from '@flumens';
import { Trans as T } from 'react-i18next';

const UserSurveyComponent = () => {
  const initSegment = 'pending';
  const [segment, setSegment] = useState(initSegment);

  const onSegmentClick = (e: any) => setSegment(e.detail.value);

  return (
    <Page id="home-user-surveys">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonSegment onIonChange={onSegmentClick} value={segment}>
            <IonSegmentButton value="pending">
              <IonLabel className="ion-text-wrap">
                <T>Pending</T>
              </IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="uploaded">
              <IonLabel className="ion-text-wrap">
                <T>Uploaded</T>
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <Main>In progress ... </Main>
    </Page>
  );
};

export default observer(UserSurveyComponent);
