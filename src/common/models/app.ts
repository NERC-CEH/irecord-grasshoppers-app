import { Model, ModelAttrs } from '@flumens';
import { genericStore } from './store';

export interface Attrs extends ModelAttrs {
  appSession: number;
  sendAnalytics: boolean;
}

const defaults: Attrs = {
  sendAnalytics: true,
  appSession: 0,
};

class AppModel extends Model {
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: genericStore });

export { appModel as default, AppModel };
