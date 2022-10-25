/* eslint-disable @getify/proper-arrows/name */
import { FC } from 'react';
import clsx from 'clsx';
import { Species } from 'common/data/species';
import { Gallery, useOnHideModal } from '@flumens';
import 'swiper/css';
import 'swiper/css/pagination';
import '@ionic/react/css/ionic-swiper.css';
import '../styles.scss';

type Props = {
  species: Species;
  onClose: () => void;
  showGallery?: number;
  showMap: boolean;
  showSpeciesDescription: boolean;
};

const FullScreenPhotoViewer: FC<Props> = ({
  species,
  onClose,
  showGallery,
  showMap,
  showSpeciesDescription,
}) => {
  let items: any = [];
  let initialSlide = 0;
  let className = 'white-background';
  let pageTitle = '';

  useOnHideModal(onClose);

  const swiperProps = {};

  if (Number.isInteger(showGallery)) {
    const getImageSource = (image: string) => {
      return { src: image };
    };

    items = species.images.map(getImageSource);
    initialSlide = showGallery || 0;
    className = '';
  }

  if (showMap) {
    pageTitle = 'Distribution';
    items.push({ src: species.map });
  }

  if (showSpeciesDescription) {
    pageTitle = species.commonName;
    items.push({ src: species.descriptionImg });
  }

  const isOpen =
    !!items.length &&
    (Number.isInteger(showGallery) || showMap || showSpeciesDescription);

  return (
    <Gallery
      isOpen={isOpen}
      items={items}
      initialSlide={initialSlide}
      onClose={onClose}
      className={clsx('species-profile-gallery', className)}
      title={pageTitle}
      mode="md"
      swiperProps={swiperProps}
    />
  );
};

export default FullScreenPhotoViewer;
