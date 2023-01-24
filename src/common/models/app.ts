import { Model, ModelAttrs, locationToGrid } from '@flumens';
import GPS from 'helpers/GPS';
import { genericStore } from './store';

export type SurveyDraftKeys = {
  'draftId:default'?: null | string;
};

export type Attrs = ModelAttrs & {
  appSession: number;
  sendAnalytics: boolean;
  useSmartSorting: boolean;
  useProbabilitiesForGuide: any;
  useLocationForGuide: any;
  location: any;
} & SurveyDraftKeys;

const defaults: Attrs = {
  sendAnalytics: true,
  appSession: 0,

  // probabilities
  useSmartSorting: true,
  useProbabilitiesForGuide: true,
  useLocationForGuide: true,
  location: {},

  'draftId:default': null,
};

class AppModel extends Model {
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);

  _gettingLocation: any;

  // eslint-disable-next-line @getify/proper-arrows/name
  updateCurrentLocation = async (stop?: boolean) => {
    if (stop) {
      if (!this._gettingLocation) {
        return;
      }

      GPS.stop(this._gettingLocation);
      return;
    }

    if (!this.attrs.useLocationForGuide) {
      return;
    }

    console.log('AppModel: asking for location.');

    const onGPSSuccess = (err: null | Error, newLocation?: any) => {
      if (err) {
        GPS.stop(this._gettingLocation);
        return;
      }

      if (!this.attrs.useLocationForGuide) {
        console.log(
          'AppModel: setting new location skipped - disabled setting.'
        );
        return;
      }

      console.log('AppModel: setting new location.');

      // eslint-disable-next-line
      newLocation.accuracy = 1000000; // make it hectad
      newLocation.gridref = locationToGrid(newLocation); // eslint-disable-line
      this.attrs.location = newLocation;
      this.save();

      GPS.stop(this._gettingLocation);
    };

    this._gettingLocation = await GPS.start({ callback: onGPSSuccess });
  };

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: genericStore });

export { appModel as default, AppModel };
