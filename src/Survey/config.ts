import * as Yup from 'yup';
import AppOccurrence from 'models/occurrence';
import { chatboxOutline, calendarOutline } from 'ionicons/icons';
import numberIcon from 'common/images/number.svg';
import habitatIcon from 'common/images/habitats.svg';
import ageIcon from 'common/images/age.svg';
import { date as dateHelp } from '@flumens';
import CONFIG from 'common/config';
import Sample from 'models/sample';
import { Species } from 'common/data/species';
import { Location } from 'common/helpers/GPS';

const numberOptions = [
  { isPlaceholder: true, label: 'Or choose from the list below' },
  { value: 1, id: 3808 },
  { value: '2-5', id: 3809 },
  { value: '6-9', id: 3810 },
  { value: '10-19', id: 3811 },
  { value: '20-49', id: 3812 },
  { value: '50+', id: 3813 },
];

const ageValues = [
  {
    id: 4412,
    value: 'Adult',
  },
  {
    id: 4413,
    value: 'Young',
  },
  {
    id: 4414,
    value: 'Adult + young',
  },
];

const habitatValues = [
  {
    id: 4403,
    value: 'Grassland',
  },
  {
    value: 'Heath or moor',
    id: 4404,
  },
  {
    id: 4405,
    value: 'Wetland, bog, marsh',
  },
  {
    id: 4406,
    value: 'Bare or sparsely vegetated ground',
  },
  {
    value: 'Garden',
    id: 4407,
  },
  {
    id: 4408,
    value: 'Hedge or scrub',
  },
  {
    id: 4409,
    value: 'Woodland',
  },
  {
    value: 'Coastal',
    id: 4410,
  },
  {
    value: 'Indoors',
    id: 4411,
  },
];

const fixedLocationSchema = Yup.object().shape({
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
});

const validateLocation = (val: any) => {
  try {
    fixedLocationSchema.validateSync(val);
    return true;
  } catch (e) {
    return false;
  }
};

const verifyLocationSchema = Yup.mixed().test(
  'location',
  'Please add record location.',
  validateLocation
);

const survey = {
  id: 228,
  name: 'default',
  webForm: 'enter-grasshopper-list',

  attrs: {
    location: {
      remote: {
        id: 'entered_sref',
        values(location: Location, submission: any) {
          const { accuracy, source, altitude, altitudeAccuracy } = location;

          // eslint-disable-next-line
          submission.values = { ...submission.values };

          submission.values['smpAttr:760'] = source; // eslint-disable-line
          submission.values['smpAttr:282'] = accuracy; // eslint-disable-line
          submission.values['smpAttr:283'] = altitude; // eslint-disable-line
          submission.values['smpAttr:284'] = altitudeAccuracy; // eslint-disable-line

          const lat = location.latitude;
          const lon = location.longitude;
          if (Number.isNaN(lat) || Number.isNaN(lat)) {
            return null;
          }

          return `${lat.toFixed(7)}, ${lon.toFixed(7)}`;
        },
      },
    },

    date: {
      menuProps: { parse: 'date', icon: calendarOutline },
      pageProps: {
        attrProps: {
          input: 'date',
          inputProps: {
            max: () => new Date(),
            label: 'Date',
            icon: calendarOutline,
            autoFocus: false,
          },
        },
      },
      remote: { values: (date: Date) => dateHelp.print(date, false) },
    },

    habitat: {
      menuProps: {
        icon: habitatIcon,
      },
      pageProps: {
        attrProps: {
          input: 'radio',
          info: 'What sort of habitat did you find this individual in?',
          inputProps: { options: habitatValues },
        },
      },
      remote: { id: 486, values: habitatValues },
    },
  },

  occ: {
    attrs: {
      taxon: {
        remote: {
          id: 'taxa_taxon_list_id',
          values: (taxon: Species) => taxon.warehouseId,
        },
      },

      age: {
        menuProps: {
          icon: ageIcon,
        },
        pageProps: {
          attrProps: {
            input: 'radio',
            info: 'What age is this individual?',
            inputProps: { options: ageValues },
          },
        },
        remote: { id: 356, values: ageValues },
      },

      number: {
        menuProps: {
          icon: numberIcon,
        },
        pageProps: {
          attrProps: [
            {
              set: (value: number, model: AppOccurrence) =>
                Object.assign(model.attrs, {
                  number: value,
                  'number-ranges': null,
                }),
              get: (model: AppOccurrence) => model.attrs.number,
              input: 'slider',
              info: 'How many individuals of this type can you see?',
              inputProps: { min: 1, max: 500 },
            },
            {
              set: (value: string, model: AppOccurrence) =>
                Object.assign(model.attrs, {
                  number: null,
                  'number-ranges': value,
                }),
              get: (model: AppOccurrence) => model.attrs['number-ranges'],
              onChange: () => window.history.back(),
              input: 'radio',
              inputProps: { options: numberOptions },
            },
          ],
        },
        remote: { id: 16 },
      },

      'number-ranges': { remote: { id: 320, values: numberOptions } },

      comment: {
        menuProps: { icon: chatboxOutline },
        pageProps: {
          attrProps: {
            input: 'textarea',
            info: 'Add any extra information about your survey.',
          },
        },
      },
    },

    create(Occurrence: typeof AppOccurrence) {
      return new Occurrence({
        attrs: {
          comment: null,
          taxon: null,
          age: null,
          'number-ranges': null,
          number: null,
        },
      });
    },

    verify(attrs: AppOccurrence['attrs']) {
      try {
        const occurrenceScheme = Yup.object().shape({
          taxon: Yup.object().nullable().required('Species is missing.'),
        });

        occurrenceScheme.validateSync(attrs, { abortEarly: false });
      } catch (attrError) {
        return attrError;
      }

      return null;
    },
  },

  create(AppSample: typeof Sample) {
    const sample = new AppSample({
      metadata: {
        survey: survey.name,
        survey_id: survey.id,
      },

      attrs: {
        appVersion: CONFIG.version,
      },
    });

    const occ = survey?.occ?.create(AppOccurrence);

    sample.occurrences.push(occ);

    sample.startGPS();

    return sample;
  },

  verify(attrs: Sample['attrs']) {
    try {
      const sampleSchema = Yup.object().shape({
        location: verifyLocationSchema,
      });

      sampleSchema.validateSync(attrs, { abortEarly: false });
    } catch (attrError) {
      return attrError;
    }

    return null;
  },
};

export default survey;
