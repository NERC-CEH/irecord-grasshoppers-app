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
              <IonLabel className="ion-text-wrap">Pending</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="uploaded">
              <IonLabel className="ion-text-wrap">Uploaded</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <Main>In progress ... </Main>
    </Page>
  );
};

export default observer(UserSurveyComponent);
