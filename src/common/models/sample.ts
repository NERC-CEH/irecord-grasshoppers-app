import {
  Sample,
  SampleAttrs,
  SampleOptions,
  getDeepErrorMessage,
  device,
  useAlert,
} from '@flumens';
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
