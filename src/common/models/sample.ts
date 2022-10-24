import {
  Sample,
  SampleAttrs,
  SampleOptions,
  getDeepErrorMessage,
  device,
  useAlert,
} from '@flumens';
import { isPlatform } from '@ionic/react';
import userModel from 'models/user';
import CONFIG from 'common/config';
import surveyConfig from 'Survey/config';
import { Location } from 'common/helpers/GPS';
import GPSExtension from './sampleGPSExt';
import { modelStore } from './store';
import Occurrence from './occurrence';
import Media from './media';

type Attrs = SampleAttrs & {
  date: string;
  location: Location;
  habitat?: string;
};

class AppSample extends Sample {
  static fromJSON(json: any) {
    return super.fromJSON(json, Occurrence, AppSample, Media);
  }

  store = modelStore;

  attrs: Attrs = this.attrs;

  startGPS: any; // from extension

  stopGPS: any; // from extension

  isGPSRunning: any; // from extension

  constructor(props: SampleOptions) {
    super(props);
    this.remote.url = `${CONFIG.backend.indicia.url}/index.php/services/rest`;
    // eslint-disable-next-line
    this.remote.headers = async () => ({
      Authorization: `Bearer ${await userModel.getAccessToken()}`,
    });

    this.survey = surveyConfig;
    Object.assign(this, GPSExtension());
  }

  destroy(silent?: boolean) {
    this.cleanUp();
    return super.destroy(silent);
  }

  cleanUp() {
    this.stopGPS();

    const stopGPS = (smp: AppSample) => smp.stopGPS();
    this.samples.forEach(stopGPS);
  }

  async upload() {
    if (this.remote.synchronising || this.isUploaded()) return true;

    const invalids = this.validateRemote();
    if (invalids) return false;

    if (!device.isOnline) return false;

    const isActivated = await userModel.checkActivation();
    if (!isActivated) return false;

    this.cleanUp();

    return this.saveRemote();
  }

  _attachTopSampleSubmission(updatedSubmission: any) {
    const isTopSample = !this.parent;
    if (!isTopSample) {
      return;
    }

    const keys = this.keys();

    const platform = isPlatform('android') ? 'Android' : 'iOS';

    const platformId = keys?.device?.values[platform] || null;

    const appAndDeviceFields = {
      [`smpAttr:${keys.device.id}`]: platformId,
      [`smpAttr:${keys.deviceVersion.id}`]: device?.info?.osVersion,
      [`smpAttr:${keys.appVersion.id}`]: CONFIG.version,
    };

    // eslint-disable-next-line no-param-reassign
    updatedSubmission.values = {
      ...updatedSubmission.values,
      ...appAndDeviceFields,
    };
  }

  getSubmission(...args: any) {
    const submission = super.getSubmission(...args);

    const updatedSubmission = {
      ...submission,
      values: { ...submission.values },
    };

    this._attachTopSampleSubmission(updatedSubmission);

    return updatedSubmission;
  }
}

export const useValidateCheck = (sample: Sample) => {
  const alert = useAlert();

  const validate = () => {
    const invalids = sample.validateRemote();
    if (invalids) {
      alert({
        header: 'Survey incomplete',
        message: getDeepErrorMessage(invalids),
        buttons: [
          {
            text: 'Got it',
            role: 'cancel',
          },
        ],
      });
      return false;
    }
    return true;
  };

  return validate;
};

export default AppSample;
