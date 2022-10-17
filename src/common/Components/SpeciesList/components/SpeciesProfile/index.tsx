import { FC, useState } from 'react';
import {
  IonCardHeader,
  IonIcon,
  IonImg,
  IonButton,
  IonCardContent,
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { Trans as T } from 'react-i18next';
import { expandOutline, volumeHighOutline } from 'ionicons/icons';
import { Species } from 'common/data/species';
import { Main, useOnBackButton } from '@flumens';
import ImageWithBackground from 'common/Components/ImageWithBackground';
import FullScreenPhotoViewer from '../FullScreenPhotoViewer';
import './styles.scss';

type Props = {
  species?: Species;
  onClose: () => void;
};

const SpeciesProfile: FC<Props> = ({ species, onClose }) => {
  const [showGallery, setShowGallery] = useState<number>();
  const [showMap, setShowMap] = useState(false);

  useOnBackButton(onClose);

  const showPhotoInFullScreen = (index: number) => setShowGallery(index);

  const showMapInFullScreen = () => setShowMap(true);

  const getSlides = () => {
    const { images } = species || {};

    const slideOpts = {
      initialSlide: 0,
      speed: 400,
    };

    const getSlide = (image: string, index: number) => {
      const showPhotoInFullScreenWrap = () => showPhotoInFullScreen(index);
      return (
        <SwiperSlide
          key={image}
          onClick={showPhotoInFullScreenWrap}
          className="species-profile-photo"
        >
          <ImageWithBackground src={image} />
        </SwiperSlide>
      );
    };

    const slideImage = images?.map(getSlide) || [];

    return (
      <Swiper modules={[Pagination]} pagination {...slideOpts}>
        {slideImage}
      </Swiper>
    );
  };

  if (!species) return null;

  const getMap = () => {
    if (!species.map) {
      return <p>Sorry, this species doesn't have a map.</p>;
    }

    return (
      <div className="fullscreen-tappable map" onClick={showMapInFullScreen}>
        <img src={species.map} />
        <div className="fullscreen-btn">
          <IonIcon src={expandOutline} slot="end" color="warning" />
        </div>
      </div>
    );
  };

  const onGalleryClose = () => {
    setShowGallery(undefined);
    setShowMap(false);
  };

  const playSound = () => {
    const sound = new Audio(species.sound);
    sound.play();
  };

  return (
    <>
      <FullScreenPhotoViewer
        species={species}
        onClose={onGalleryClose}
        showGallery={showGallery}
        showMap={showMap}
      />

      <Main id="species-profile">
        {getSlides()}
        <IonCardHeader>
          <div className="title">
            <h1>{species.commonName}</h1>
            <h4>
              <i>{species.scientificName}</i>
            </h4>
          </div>
        </IonCardHeader>
        <IonCardContent>
          {species.ukStatus && (
            <>
              <h3>UK Status</h3>
              <p>{species.ukStatus}</p>
            </>
          )}

          {species.description && (
            <>
              <h3>Description</h3>
              <p>
                <T>{species.description}</T>
              </p>
            </>
          )}

          {species.size && (
            <>
              <h3>Size</h3>
              <p>{species.size}</p>
            </>
          )}

          {species.whenToSee && (
            <>
              <h3>When to see</h3>
              <p>
                <T>{species.whenToSee}</T>
              </p>
            </>
          )}

          {species.whatItEats && (
            <>
              <h3>What it eats</h3>
              <p>{species.whatItEats}</p>
            </>
          )}

          {species.sounds && (
            <>
              <h3>Sounds</h3>
              <p>{species.sounds}</p>
            </>
          )}

          {species.sound && (
            <>
              <h3>Sound</h3>
              <IonButton onClick={playSound}>
                <IonIcon icon={volumeHighOutline} />
              </IonButton>
            </>
          )}

          {species.sonogram && (
            <>
              <h3>Sonogram</h3>
              <IonImg src={species.sonogram} />
            </>
          )}

          {species.whereToSee && (
            <>
              <h3>Where to see </h3>
              <p>
                <T>{species.whereToSee}</T>
              </p>
            </>
          )}

          {species.map && (
            <>
              <h3>Distribution</h3>
              {getMap()}
            </>
          )}

          {species.similarSpecies && (
            <>
              <h3>Similar species</h3>
              <p>{species.similarSpecies}</p>
            </>
          )}
        </IonCardContent>
      </Main>
    </>
  );
};

export default SpeciesProfile;
