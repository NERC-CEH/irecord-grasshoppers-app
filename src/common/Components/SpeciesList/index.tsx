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
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import soundIcon from 'common/images/sound.png';
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
  const [active, setActive] = useState<Species['id']>();
  const [state, toggle] = useState(true);

  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
    onRest: () => {
      if (!audio) return;
      toggle(!state);
    },
  });

  const hideSpeciesModal = () => setSpeciesProfile(undefined);

  const playSound = (e: SyntheticEvent, sp: Species) => {
    e.preventDefault();
    e.stopPropagation();

    const audioSrc = audio?.src.split('/').pop();
    const speciesSrc = sp?.sound.split('/').pop();
    const isSoundSrcSame = audioSrc === speciesSrc;
    if (isSoundSrcSame) {
      audio?.pause();
      setActive(undefined);
      setAudio(undefined);

      return;
    }

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    const sound = new Audio(sp?.sound);

    const onEnd = () => {
      setActive(undefined);
      setAudio(undefined);
    };
    sound.onended = onEnd;

    sound.play();
    setActive(sp.id);
    setAudio(sound);
  };

  const speciesTile = (sp: Species) => {
    const { thumbnail: thumbnailSrc, commonName, id, backgroundThumbnail } = sp;

    const isActive = active === id;

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

      const playSoundWrap = (e: SyntheticEvent) => {
        playSound(e, sp);
        toggle(!state);
      };

      return (
        <div
          className={clsx('info-box', isActive && 'active')}
          onClick={playSoundWrap}
        >
          {!isActive ? (
            <IonIcon icon={volumeHighOutline} />
          ) : (
            <animated.img
              style={{
                scale: x.to({
                  range: [
                    0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1, 0.75, 0.65, 0.55,
                    0.45, 0.35, 0.25, 0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1,
                  ],
                  output: [
                    1, 0.7, 1, 0.7, 1, 0.7, 1, 0.7, 1, 0.7, 1, 0.7, 1, 0.7, 1,
                    0.7, 1, 0.7, 1, 0.7,
                  ],
                }),
              }}
              src={soundIcon}
            />
          )}
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
