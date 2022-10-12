import { FC, useContext } from 'react';
import { NavContext } from '@ionic/react';
import { Page, Header, useToast, useLoader, PickByType } from '@flumens';
import appModel, { Attrs as AppModelAttrs } from 'models/app';
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
  const resetApp = useResetApp();
  const deleteUser = useDeleteUser();

  const resetApplication = () => resetApp();

  const { sendAnalytics } = appModel.attrs;

  return (
    <Page id="settings">
      <Header title="Settings" />
      <Main
        resetApp={resetApplication}
        isLoggedIn={userModel.isLoggedIn()}
        deleteUser={deleteUser}
        sendAnalytics={sendAnalytics}
        onToggle={onToggle}
      />
    </Page>
  );
};

export default observer(MenuController);
