import { useEffect, useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { NavContext } from '@ionic/react';
import Sample from 'models/sample';
import { useAlert } from '@flumens';
import appModel, { SurveyDraftKeys } from 'models/app';
import savedSamples from 'models/savedSamples';
import surveyConfig from './config';

async function showDraftAlert(alert: any) {
  const alertWrap = (resolve: (param: boolean) => void) => {
    alert({
      header: 'Unfinished record',
      message:
        'You have an incomplete record that needs to be saved before starting another one. Would you like to continue it?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Discard',
          role: 'destructive',
          handler: () => {
            resolve(false);
          },
        },
        {
          text: 'Continue',
          handler: () => {
            resolve(true);
          },
        },
      ],
    });
  };
  return new Promise(alertWrap);
}

async function getNewSample(
  survey: typeof surveyConfig,
  draftIdKey: keyof SurveyDraftKeys
) {
  const sample = await survey.create(Sample);
  await sample.save();

  savedSamples.push(sample);
  appModel.attrs[draftIdKey] = sample.cid;
  await appModel.save();

  return sample;
}

async function getDraft(draftIdKey: keyof SurveyDraftKeys, alert: any) {
  const draftID = appModel.attrs[draftIdKey];
  if (draftID) {
    const byId = ({ cid }: Sample) => cid === draftID;
    const draftSample = savedSamples.find(byId);
    if (draftSample) {
      const continueDraftRecord = await showDraftAlert(alert);
      if (continueDraftRecord) {
        return draftSample;
      }

      draftSample.destroy();
    }
  }

  return null;
}

function StartNewSurvey({ survey }: any) {
  const match = useRouteMatch();
  const { navigate } = useContext(NavContext);
  const alert = useAlert();

  const draftIdKey = `draftId:${survey.name}` as keyof SurveyDraftKeys;

  const pickDraftOrCreateSampleWrap = () => {
    // eslint-disable-next-line
    (async () => {
      let sample = await getDraft(draftIdKey, alert);
      if (!sample) {
        sample = await getNewSample(survey, draftIdKey);
      }

      navigate(`${match.url}/${sample.cid}`, 'none', 'replace');
    })();
  };

  useEffect(pickDraftOrCreateSampleWrap, [match.url]);

  return null;
}

// eslint-disable-next-line @getify/proper-arrows/name
StartNewSurvey.with = (survey: typeof surveyConfig) => {
  const StartNewSurveyWrap = () => <StartNewSurvey survey={survey} />;

  return StartNewSurveyWrap;
};

export default StartNewSurvey;
