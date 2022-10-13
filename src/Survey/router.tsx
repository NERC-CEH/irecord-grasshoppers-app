import { RouteWithModels, AttrPage, ModelLocation } from '@flumens';
import savedSamples from 'models/savedSamples';
import StartNewSurvey from 'Survey/StartNewSurvey';
import CONFIG from 'common/config';
import Species from 'Survey/Species';
import Home from './Home';
import survey from './config';

const { AttrPageFromRoute } = AttrPage;

const ModelLocationWrap = (props: any) => (
  <ModelLocation
    model={props.sample}
    mapProviderOptions={CONFIG.map}
    useGridRef
    useGridMap
    onLocationNameChange={ModelLocation.utils.onLocationNameChange}
    namePlaceholder="Add a site name for your sighting"
    onGPSClick={ModelLocation.utils.onGPSClick}
    backButtonProps={{ text: 'Back' }}
  />
);

const baseURL = `/survey/default`;

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId`, Home],
  [`${baseURL}/:smpId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/occ/:occId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/location`, ModelLocationWrap],
  [`${baseURL}/:smpId/species`, Species],
];

export default RouteWithModels.fromArray(savedSamples, routes);
