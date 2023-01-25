import { FC } from 'react';
import { observer } from 'mobx-react';
import {
  Main,
  useAlert,
  InfoMessage,
  MenuAttrToggle,
  PickByType,
} from '@flumens';
import {
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  isPlatform,
} from '@ionic/react';
import { Attrs as AppModelAttrs } from 'models/app';
import getCurrentWeekNumber from 'helpers/weeks';
import {
  warningOutline,
  arrowUndoOutline,
  personRemoveOutline,
  shareSocialOutline,
  trashOutline,
  filterOutline,
  locationOutline,
} from 'ionicons/icons';
import grasshooperIcon from 'common/images/grasshopper.svg';
import clsx from 'clsx';
import './styles.scss';

function useDeleteAllSamplesDialog(deleteAllSamples: any) {
  const alert = useAlert();

  const showDeleteAllSamplesDialog = () =>
    alert({
      header: 'Remove All',
      message: (
        <>
          Are you sure you want to remove all successfully synchronised local
          records?
          <p>
            <i>
              <b>Note:</b> records on the server will not be touched.
            </i>
          </p>
        </>
      ),
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'primary' },
        {
          text: 'Remove',
          role: 'destructive',
          handler: deleteAllSamples,
        },
      ],
    });

  return showDeleteAllSamplesDialog;
}

function resetDialog(resetApp: any, alert: any) {
  alert({
    header: 'Reset',
    skipTranslation: true,
    message: (
      <>
        Are you sure you want to reset the application to its initial state?
        <InfoMessage
          color="danger"
          icon={warningOutline}
          className="destructive-warning"
        >
          This will wipe all the locally stored app data!
        </InfoMessage>
      </>
    ),
    buttons: [
      { text: 'Cancel', role: 'cancel', cssClass: 'primary' },
      {
        text: 'Reset',
        role: 'destructive',
        handler: resetApp,
      },
    ],
  });
}

function useUserDeleteDialog(deleteUser: any) {
  const alert = useAlert();

  const showUserDeleteDialog = () => {
    alert({
      header: 'Account delete',
      skipTranslation: true,
      message: (
        <>
          Are you sure you want to delete your account?
          <InfoMessage
            color="danger"
            icon={warningOutline}
            className="destructive-warning"
          >
            This will remove your account on the iRecord website. You will lose
            access to any records that you have previously submitted using the
            app or website.
          </InfoMessage>
        </>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: deleteUser,
        },
      ],
    });
  };

  return showUserDeleteDialog;
}

type Props = {
  resetApp: () => void;
  deleteUser: () => void;
  isLoggedIn: boolean;
  onToggle: (
    setting: keyof PickByType<AppModelAttrs, boolean>,
    checked: boolean
  ) => void;
  sendAnalytics: boolean;
  deleteAllSamples: () => void;
  currentLocation?: string;
  adminChangeLocation?: any;
  adminChangeWeek?: any;
  useProbabilitiesForGuide?: any;
  onToggleGuideLocation: any;
  onToggleProbabilitiesForGuide: any;
  onToggleSmartSorting: any;
  useSmartSorting: any;
  useLocationForGuide: any;
};

const MenuMain: FC<Props> = ({
  resetApp,
  isLoggedIn,
  deleteUser,
  sendAnalytics,
  onToggle,
  deleteAllSamples,
  currentLocation,
  adminChangeLocation,
  adminChangeWeek,
  useProbabilitiesForGuide,
  onToggleGuideLocation,
  onToggleProbabilitiesForGuide,
  onToggleSmartSorting,
  useSmartSorting,
  useLocationForGuide,
}) => {
  const currentLocationMessage = currentLocation ? (
    <>
      Current location is <b>{currentLocation}</b>.
    </>
  ) : (
    <>No location is currently set.</>
  );

  const getAdminControls = () => {
    const demoOnly = !isPlatform('hybrid');
    if (!demoOnly) return null;

    return (
      <>
        <InfoMessage color="medium">
          You can manually override the probability filter variables.
        </InfoMessage>

        <IonItem>
          <IonLabel position="floating">Current Hectad</IonLabel>
          <IonInput value={currentLocation} onIonChange={adminChangeLocation} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Current Week</IonLabel>
          <IonInput
            value={getCurrentWeekNumber()}
            onIonChange={adminChangeWeek}
          />
        </IonItem>
      </>
    );
  };

  const alert = useAlert();
  const showUserDeleteDialog = useUserDeleteDialog(deleteUser);

  const showDeleteAllSamplesDialog =
    useDeleteAllSamplesDialog(deleteAllSamples);

  const showResetDialog = () => resetDialog(resetApp, alert);

  const onSendAnalyticsToggle = (checked: boolean) =>
    onToggle('sendAnalytics', checked);

  return (
    <Main>
      <IonList lines="full">
        <div className="rounded">
          <MenuAttrToggle
            icon={shareSocialOutline}
            label="Share with app developers"
            value={sendAnalytics}
            onChange={onSendAnalyticsToggle}
          />
          <InfoMessage color="medium">
            Share app crash data so we can make the app more reliable.
          </InfoMessage>
        </div>

        <div className="rounded">
          <MenuAttrToggle
            icon={grasshooperIcon}
            label="Smart species lists"
            value={useProbabilitiesForGuide}
            onChange={onToggleProbabilitiesForGuide}
          />

          <InfoMessage color="medium">
            Use our species lists based on your current time and location.
          </InfoMessage>

          <MenuAttrToggle
            icon={locationOutline}
            label="Use current location"
            value={useLocationForGuide}
            onChange={onToggleGuideLocation}
            disabled={!useProbabilitiesForGuide}
            className={clsx(!useProbabilitiesForGuide && 'item-disabled')}
          />
          <InfoMessage
            color="medium"
            className={clsx(!useProbabilitiesForGuide && 'disabled')}
          >
            Filter the species list based on your current location.{' '}
            {currentLocationMessage}
          </InfoMessage>

          <MenuAttrToggle
            icon={filterOutline}
            label="Use smart sorting"
            value={useSmartSorting}
            onChange={onToggleSmartSorting}
            disabled={!useProbabilitiesForGuide}
            className={clsx(!useProbabilitiesForGuide && 'item-disabled')}
          />

          <InfoMessage
            color="medium"
            className={clsx(!useProbabilitiesForGuide && 'disabled')}
          >
            Sort the species using probability information. Disabling it will
            sort by species type and commonness.
          </InfoMessage>
        </div>

        <div className="rounded">{getAdminControls()}</div>

        <div className="rounded destructive-item">
          <IonItem onClick={showDeleteAllSamplesDialog}>
            <IonIcon icon={trashOutline} size="small" slot="start" />
            <IonLabel>Remove uploaded records</IonLabel>
          </IonItem>
          <InfoMessage color="medium">
            You can remove uploaded records from this device.
          </InfoMessage>

          <IonItem onClick={showResetDialog}>
            <IonIcon icon={arrowUndoOutline} size="small" slot="start" />
            <IonLabel>Reset app</IonLabel>
          </IonItem>
          <InfoMessage color="medium">
            You can reset the app data to its default settings.
          </InfoMessage>

          {isLoggedIn && (
            <>
              <IonItem onClick={showUserDeleteDialog}>
                <IonIcon icon={personRemoveOutline} size="small" slot="start" />
                <IonLabel>Delete account</IonLabel>
              </IonItem>
              <InfoMessage color="medium">
                You can delete your user account from the system.
              </InfoMessage>
            </>
          )}
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MenuMain);
