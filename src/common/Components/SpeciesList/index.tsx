import { useState, SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import {
  IonGrid,
  IonModal,
  IonIcon,
  IonButton,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonCol,
  IonRow,
  IonLabel,
} from '@ionic/react';
import { Main } from '@flumens';
import { arrowBack, volumeHighOutline } from 'ionicons/icons';
import species, { Species } from 'common/data/species';
import SpeciesProfile from './components/SpeciesProfile';
import './styles.scss';

const SpeciesList = () => {
  const [speciesProfile, setSpeciesProfile] = useState<Species | undefined>(
    undefined
  );

  const hideSpeciesModal = () => setSpeciesProfile(undefined);

  const speciesTile = (sp: Species) => {
    const { thumbnail: thumbnailSrc, commonName, id, backgroundThumbnail } = sp;

    const viewSpecies = (e: SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSpeciesProfile(sp);
    };

    const onClick = viewSpecies;

    const playSound = (e: SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const sound = new Audio(sp.sound);
      sound.play();
    };

    return (
      <IonCol
        key={id}
        className="species-tile"
        size="6"
        sizeMd="4"
        onClick={onClick}
      >
        <div className="container">
          {sp.sound && (
            <div className="info-box" onClick={playSound}>
              <IonIcon icon={volumeHighOutline} />
            </div>
          )}

          <img className="thumbnail" src={thumbnailSrc} />
          {backgroundThumbnail && (
            <img className="thumbnail-background" src={backgroundThumbnail} />
          )}
          <IonLabel className="common-name">{commonName}</IonLabel>
        </div>
      </IonCol>
    );
  };

  const getSpeciesTile = (sp: Species) => speciesTile(sp);
  const speciesTiles = species.map(getSpeciesTile);

  return (
    <Main className="species-list">
      <IonGrid>
        <IonRow>{speciesTiles}</IonRow>
      </IonGrid>

      <IonModal isOpen={!!speciesProfile} backdropDismiss={false} mode="md">
        <IonHeader className="species-modal-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                fill="solid"
                color="light"
                shape="round"
                onClick={hideSpeciesModal}
              >
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <SpeciesProfile species={speciesProfile} />
      </IonModal>
    </Main>
  );
};

export default observer(SpeciesList);
