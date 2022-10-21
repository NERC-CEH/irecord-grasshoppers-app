import { FC } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import Sample from 'models/sample';
import { useRouteMatch } from 'react-router';
import { IonAvatar, IonItem, IonList, IonLabel, IonButton } from '@ionic/react';
import { calendarOutline, locationOutline } from 'ionicons/icons';
import grasshopperIcon from 'common/images/grasshopper.svg';
import {
  Main,
  MenuAttrItem,
  InfoMessage,
  MenuAttrItemFromModel,
  DateTimeInput,
} from '@flumens';
import CONFIG from 'common/config';
import PhotoPicker from 'Survey/PhotoPicker';
import GridRefValue from 'Survey/GridRefValue';
import species, { Species } from 'common/data/species';

type Props = {
  sample: Sample;
  isDisabled: boolean;
};

const MainComponent: FC<Props> = ({ sample, isDisabled }) => {
  const { url } = useRouteMatch();

  const [occ] = sample.occurrences;

  const onChangeDate = (value: string) => {
    // eslint-disable-next-line
    sample.attrs.date = value;
    sample.save();
  };

  const dateValue = new Date(sample.attrs.date).toISOString();

  const numberValue = occ.attrs.number || occ.attrs['number-ranges'];

  const getSpeciesButton = () => {
    const { taxon } = occ.attrs;
    if (!taxon) {
      return (
        <MenuAttrItem
          routerLink={`${url}/species`}
          icon={grasshopperIcon}
          label="Species"
          required
        />
      );
    }

    const byId = ({ id: speciesID }: Species) => speciesID === taxon.id;
    const fullSpeciesProfile = species.find(byId);

    const { commonName, scientificName, thumbnail } = fullSpeciesProfile || {};

    return (
      <IonItem
        className="menu-attr-item species-item"
        routerLink={!isDisabled ? `${url}/species` : undefined}
        detail={!isDisabled}
      >
        <IonAvatar>
          <img src={thumbnail} />
        </IonAvatar>
        <IonLabel position="stacked" mode="ios" slot="end">
          <IonLabel>
            <b>{commonName}</b>
          </IonLabel>
          <IonLabel>
            <i>{scientificName}</i>
          </IonLabel>
        </IonLabel>
      </IonItem>
    );
  };

  const getLocationButton = () => {
    const location = sample.attrs.location || {};
    const hasLocation = location.latitude;
    const empty = !hasLocation;

    const value = (
      <IonLabel position="stacked" mode="ios">
        <IonLabel color={clsx(empty && 'warning')}>
          <GridRefValue sample={sample} requiredMessage="No location" />
        </IonLabel>
        <IonLabel>{location.name || 'No site name'}</IonLabel>
      </IonLabel>
    );

    return (
      <>
        <MenuAttrItem
          routerLink={`${url}/location`}
          value={value}
          icon={locationOutline}
          label="Location"
          skipValueTranslation
          required
          className={clsx({ empty })}
          disabled={isDisabled}
        />
      </>
    );
  };

  return (
    <Main className={clsx(isDisabled && 'disable-top-padding')}>
      <IonList lines="full">
        {isDisabled && (
          <InfoMessage className="survey-info-message">
            This record has been uploaded and can only be edited on our website.
            <IonButton
              expand="block"
              className="uploaded-message-website-link"
              href={`${CONFIG.backend.url}/record-details?occurrence_id=${occ.id}`}
              fill="outline"
            >
              iRecord website
            </IonButton>
          </InfoMessage>
        )}

        <div className="rounded">
          <PhotoPicker model={occ} />
        </div>

        <div className="rounded">
          {getSpeciesButton()}

          {getLocationButton()}

          <DateTimeInput
            value={dateValue}
            onChange={onChangeDate}
            presentation="date"
            label="Date"
            autoFocus={false}
            icon={calendarOutline}
            disabled={isDisabled}
            max={new Date().toISOString()}
          />
          <MenuAttrItemFromModel model={sample} attr="habitat" />
          <MenuAttrItemFromModel
            model={occ}
            attr="number"
            routerLink={`${url}/occ/${occ.cid}/number`}
            value={numberValue}
          />
          <MenuAttrItemFromModel
            model={occ}
            attr="age"
            routerLink={`${url}/occ/${occ.cid}/age`}
          />

          <MenuAttrItemFromModel
            model={occ}
            routerLink={`${url}/occ/${occ.cid}/comment`}
            attr="comment"
          />
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MainComponent);
