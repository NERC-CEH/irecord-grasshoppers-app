import { FC, useState, SyntheticEvent } from 'react';
import appModel from 'common/models/app';
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
  IonItemDivider,
} from '@ionic/react';
import { Main, InfoBackgroundMessage } from '@flumens';
import {
  arrowBack,
  volumeHighOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import soundIcon from 'common/images/sound.png';
import species, { Species } from 'common/data/species';
import getProbabilities from 'common/data/species/probabilities';
import getCurrentWeekNumber from 'helpers/weeks';
import SpeciesProfile from './components/SpeciesProfile';
import './styles.scss';

const byName = (sp1: Species, sp2: Species) =>
  sp1.commonName.localeCompare(sp2.commonName);

const existing = (sp: any): sp is Species => !!sp;

function organiseByProbability(allSpecies: Species[], sampleGridRef?: string) {
  const location = sampleGridRef || appModel.attrs?.location?.gridref || {};

  const currentLocation = location;
  const currentWeek = getCurrentWeekNumber();

  const [probsNowAndHere, probsHere, probsNow] = getProbabilities(
    currentWeek,
    currentLocation
  );

  const getSpeciesProfile = (id: string) => {
    const byId = (sp: Species) => sp.id === id;
    return allSpecies.find(byId);
  };

  const speciesHereAndNow: Species[] = probsNowAndHere
    .map(getSpeciesProfile)
    .filter(existing);

  const speciesHere: Species[] = probsHere
    .map(getSpeciesProfile)
    .filter(existing)
    .sort(byName);

  const speciesNow: Species[] = probsNow
    .map(getSpeciesProfile)
    .filter(existing);

  const notInProbableLists = (sp: Species) =>
    !speciesHereAndNow.includes(sp) &&
    !speciesHere.includes(sp) &&
    !speciesNow.includes(sp);

  const remainingSpecies = allSpecies.filter(notInProbableLists).sort(byName);

  return [speciesHereAndNow, speciesHere, speciesNow, remainingSpecies];
}

type Props = {
  onSpeciesClick?: (sp: Species) => void;
  sampleGridRef?: string;
};

const SpeciesList: FC<Props> = ({ onSpeciesClick, sampleGridRef }) => {
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

  const getSpecies = () => {
    const speciesData = [...species];

    const { useProbabilitiesForGuide, useSmartSorting } = appModel.attrs;

    const [speciesHereAndNow, speciesHere, speciesNow, remainingSpecies] =
      organiseByProbability(speciesData, sampleGridRef);

    const hasSpeciesHereAndNow = !!speciesHereAndNow.length;
    const hasSpeciesHere = !!speciesHere.length;
    const hasSpeciesNow = !!speciesNow.length;
    const hasAdditional = !!remainingSpecies.length;

    const alphabetically = (sp1: Species, sp2: Species) =>
      sp1.commonName.localeCompare(sp2.commonName);

    const speciesTiles = (speciesList: Species[]) =>
      useSmartSorting
        ? speciesList.map(speciesTile)
        : speciesList.sort(alphabetically).map(speciesTile);

    if (
      !hasSpeciesHereAndNow &&
      !hasSpeciesHere &&
      !hasSpeciesNow &&
      !hasAdditional
    ) {
      return (
        <InfoBackgroundMessage>
          Sorry, no species were found.
        </InfoBackgroundMessage>
      );
    }

    if (!useProbabilitiesForGuide) {
      return speciesData.sort(alphabetically).map(speciesTile);
    }

    return (
      <>
        {hasSpeciesHereAndNow && (
          <IonItemDivider className="species-now-in-area" sticky mode="md">
            <IonLabel>Now in your area</IonLabel>
          </IonItemDivider>
        )}
        {speciesTiles(speciesHereAndNow)}

        {hasSpeciesNow && (
          <IonItemDivider sticky className="species-now" mode="md">
            <IonLabel>At this time of year</IonLabel>
          </IonItemDivider>
        )}
        {speciesTiles(speciesNow)}

        {hasSpeciesHere && (
          <IonItemDivider sticky className="species-now" mode="md">
            <IonLabel>In your area at other times of year</IonLabel>
          </IonItemDivider>
        )}
        {speciesTiles(speciesHere)}

        {hasAdditional && (
          <IonItemDivider sticky className="species-additional" mode="md">
            {hasSpeciesNow ? (
              <IonLabel>At other times of year</IonLabel>
            ) : (
              <IonLabel>Species not recorded from your area</IonLabel>
            )}
          </IonItemDivider>
        )}
        {speciesTiles(remainingSpecies)}
      </>
    );
  };

  return (
    <Main className="species-list">
      <IonGrid>
        <IonRow>{getSpecies()}</IonRow>
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
