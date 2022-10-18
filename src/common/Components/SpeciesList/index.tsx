import { FC, useState, SyntheticEvent } from 'react';
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
import {
  arrowBack,
  volumeHighOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import species, { Species } from 'common/data/species';
import SpeciesProfile from './components/SpeciesProfile';
import './styles.scss';

type Props = {
  onSpeciesClick?: (sp: Species) => void;
};

const SpeciesList: FC<Props> = ({ onSpeciesClick }) => {
  const isSurvey = !!onSpeciesClick;

  const [speciesProfile, setSpeciesProfile] = useState<Species>();

  const [audio, setAudio] = useState<HTMLAudioElement>();

  const hideSpeciesModal = () => setSpeciesProfile(undefined);

  const playSound = (e: SyntheticEvent, sp?: Species) => {
    e.preventDefault();
    e.stopPropagation();

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    const sound = new Audio(sp?.sound);
    sound.play();
    setAudio(sound);
  };

  const speciesTile = (sp: Species) => {
    const { thumbnail: thumbnailSrc, commonName, id, backgroundThumbnail } = sp;

    const viewSpecies = (e: SyntheticEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSpeciesProfile(sp);
    };

    const selectSpecies = () => isSurvey && onSpeciesClick(sp);

    const onClick = isSurvey ? selectSpecies : viewSpecies;

    const infoBox = () => {
      if (isSurvey) {
        return (
          <div className="info-box" onClick={viewSpecies}>
            <IonIcon icon={informationCircleOutline} />
          </div>
        );
      }

      if (!sp.sound) return null;

      const playSoundWrap = (e: SyntheticEvent) => playSound(e, sp);
      return (
        <div className="info-box" onClick={playSoundWrap}>
          <IonIcon icon={volumeHighOutline} />
        </div>
      );
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
          {infoBox()}

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

        <SpeciesProfile
          species={speciesProfile}
          onClose={hideSpeciesModal}
          playSound={playSound}
        />
      </IonModal>
    </Main>
  );
};

export default observer(SpeciesList);
