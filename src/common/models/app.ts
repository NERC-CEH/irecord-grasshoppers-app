import { Model, ModelAttrs } from '@flumens';
import { genericStore } from './store';

export type SurveyDraftKeys = {
  'draftId:default'?: null | string;
};

export type Attrs = ModelAttrs & {
  appSession: number;
  sendAnalytics: boolean;
} & SurveyDraftKeys;

const defaults: Attrs = {
  sendAnalytics: true,
  appSession: 0,

  'draftId:default': null,
};

class AppModel extends Model {
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: genericStore });

export { appModel as default, AppModel };
