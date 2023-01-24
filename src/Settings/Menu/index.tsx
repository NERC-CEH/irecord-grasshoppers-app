import { FC, useContext } from 'react';
import { NavContext } from '@ionic/react';
import { Page, Header, useToast, useLoader, PickByType } from '@flumens';
import appModel, { Attrs as AppModelAttrs } from 'models/app';
import { removeAllSynced } from 'models/savedSamples';
import userModel from 'models/user';
import { observer } from 'mobx-react';
import Main from './Main';

const useResetApp = () => {
  const toast = useToast();

  const reset = async () => {
    console.log('Settings:Menu:Controller: resetting the application!');

    try {
      // await savedSamples.resetDefaults();
      await appModel.resetDefaults();
      await userModel.resetDefaults();
      toast.success('Done');
    } catch (err: any) {
      toast.error(err);
    }
  };

  return reset;
};

async function deleteAllSamples(toast: any) {
  console.log('Settings:Menu:Controller: deleting all samples.');

  try {
    await removeAllSynced();
    toast.success('Done');
  } catch (e: any) {
    toast.error(`${e.message}`);
  }
}

const useDeleteUser = () => {
  const toast = useToast();
  const loader = useLoader();
  const { goBack } = useContext(NavContext);

  const deleteUser = async () => {
    console.log('Settings:Menu:Controller: deleting the user!');

    await loader.show('Please wait...');

    try {
      await userModel.delete();
      goBack();
      toast.success('Done');
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  };

  return deleteUser;
};

function onToggle(
  setting: keyof PickByType<AppModelAttrs, boolean>,
  checked: boolean
) {
  appModel.attrs[setting] = checked; // eslint-disable-line
  appModel.save();
}

const MenuController: FC = () => {
  const toast = useToast();
  const resetApp = useResetApp();
  const deleteUser = useDeleteUser();

  const {
    useSmartSorting,
    useProbabilitiesForGuide,
    useLocationForGuide,
    location,
  } = appModel.attrs;

  const resetApplication = () => resetApp();

  const { sendAnalytics } = appModel.attrs;

  const deleteAllSamplesWrap = () => deleteAllSamples(toast);

  const onToggleGuideLocation = (checked: boolean) => {
    onToggle('useLocationForGuide', checked);

    if (!checked) {
      // eslint-disable-next-line no-param-reassign
      appModel.attrs.location = null;
      appModel.updateCurrentLocation(false); // stops any current runs
    } else {
      appModel.updateCurrentLocation();
    }

    appModel.save();
  };

  const onToggleSmartSorting = (checked: boolean) =>
    onToggle('useSmartSorting', checked);

  const onToggleProbabilitiesForGuide = (checked: boolean) =>
    onToggle('useProbabilitiesForGuide', checked);

  const currentLocation = location && location.gridref;

  const adminChangeLocation = (e: any) => {
    if (!appModel.attrs.location) {
      // eslint-disable-next-line no-param-reassign
      appModel.attrs.location = {};
    }

    // eslint-disable-next-line no-param-reassign
    appModel.attrs.location.gridref = e.target.value;
    appModel.save();
  };
  const adminChangeWeek = (e: any) => {
    const currentWeek = parseInt(e.target.value, 10);
    if (currentWeek > 53) return;
    (window as any).admin.currentWeek = currentWeek;
    console.log('setting week', (window as any).admin.currentWeek);
  };

  return (
    <Page id="settings">
      <Header title="Settings" />
      <Main
        resetApp={resetApplication}
        isLoggedIn={userModel.isLoggedIn()}
        deleteUser={deleteUser}
        sendAnalytics={sendAnalytics}
        onToggle={onToggle}
        deleteAllSamples={deleteAllSamplesWrap}
        useProbabilitiesForGuide={useProbabilitiesForGuide}
        onToggleGuideLocation={onToggleGuideLocation}
        onToggleProbabilitiesForGuide={onToggleProbabilitiesForGuide}
        onToggleSmartSorting={onToggleSmartSorting}
        useSmartSorting={useSmartSorting}
        currentLocation={currentLocation}
        useLocationForGuide={useLocationForGuide}
        // admin controls
        adminChangeLocation={adminChangeLocation}
        adminChangeWeek={adminChangeWeek}
      />
    </Page>
  );
};

export default observer(MenuController);
