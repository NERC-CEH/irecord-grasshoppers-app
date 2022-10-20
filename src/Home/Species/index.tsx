import { Page } from '@flumens';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import SpeciesList from 'common/Components/SpeciesList';
import './styles.scss';

function Guide() {
  return (
    <Page id="guide">
      <IonHeader id="species-search-header">
        <IonToolbar>
          <IonTitle size="large" className="app-name">
            iRecord <b>Grasshoppers</b>
            <div className="subtitle">and related insects</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <SpeciesList />
    </Page>
  );
}

export default Guide;
