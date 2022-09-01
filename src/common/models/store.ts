import { isPlatform } from '@ionic/react';
import { Store } from '@flumens';

const isDemo = !isPlatform('hybrid');

// eslint-disable-next-line
export const genericStore = new Store({
  storeName: 'generic',
  debugging: process.env.NODE_ENV === 'development',
});

if (isDemo) {
  Object.assign(window, { genericStore });
}
