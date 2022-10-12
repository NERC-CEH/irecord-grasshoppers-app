import { FC } from 'react';
import { observer } from 'mobx-react';
import {
  Main,
  useAlert,
  InfoMessage,
  MenuAttrToggle,
  PickByType,
} from '@flumens';
import { IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { Attrs as AppModelAttrs } from 'models/app';
import {
  warningOutline,
  arrowUndoOutline,
  personRemoveOutline,
  shareSocialOutline,
} from 'ionicons/icons';
import './styles.scss';

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
      { text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
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
};

const MenuMain: FC<Props> = ({
  resetApp,
  isLoggedIn,
  deleteUser,
  sendAnalytics,
  onToggle,
}) => {
  const alert = useAlert();
  const showUserDeleteDialog = useUserDeleteDialog(deleteUser);

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

        <div className="rounded destructive-item">
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
