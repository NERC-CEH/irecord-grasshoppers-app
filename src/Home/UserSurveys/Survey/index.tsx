import { FC, useContext, SyntheticEvent } from 'react';
import { useAlert, useToast } from '@flumens';
import { observer } from 'mobx-react';
import {
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  NavContext,
  IonBadge,
  IonIcon,
} from '@ionic/react';
import Sample, { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import species, { Species } from 'common/data/species';
import grasshopperIcon from 'common/images/grasshopper.svg';
import OnlineStatus from './components/OnlineStatus';
import './styles.scss';

function useSurveyDeletePrompt(sample: Sample) {
  const alert = useAlert();

  const promptSurveyDelete = () => {
    let body =
      "This record hasn't been uploaded to the database yet. " +
      'Are you sure you want to remove it from your device?';

    const isSynced = sample.metadata.synced_on;
    if (isSynced) {
      body =
        'Are you sure you want to remove this record from your device?' +
        '</br><i><b>Note:</b> it will remain in the database.</i>';
    }
    alert({
      header: 'Delete',
      message: body,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => sample.destroy(),
        },
      ],
    });
  };

  return promptSurveyDelete;
}

type Props = {
  sample: Sample;
  uploadIsPrimary?: boolean;
  style?: any;
};

const Survey: FC<Props> = ({ sample, style, uploadIsPrimary }) => {
  const { navigate } = useContext(NavContext);
  const toast = useToast();
  const deleteSurvey = useSurveyDeletePrompt(sample);
  const checkSampleStatus = useValidateCheck(sample);
  const checkUserStatus = useUserStatusCheck();

  const survey = sample.getSurvey();

  const { synchronising } = sample.remote;

  const href = !synchronising
    ? `/survey/${survey.name}/${sample.cid}`
    : undefined;

  const deleteSurveyWrap = () => deleteSurvey();

  function getSampleInfo() {
    const [occ] = sample.occurrences;
    if (!occ) {
      return <div />;
    }

    const byId = ({ id: speciesID }: Species) =>
      speciesID === occ.attrs?.taxon?.id;
    const fullSpeciesProfile: any = species.find(byId) || {};

    const { thumbnail } = fullSpeciesProfile;

    let avatar = <IonIcon icon={grasshopperIcon} color="warning" />;
    if (occ.media.length) {
      const image = occ.media[0];
      avatar = <img src={image.getURL()} className="image" />;
    } else if (thumbnail) {
      avatar = <img src={thumbnail} />;
    }
    const taxon = occ.getPrettyName();

    return (
      <>
        <div className="photo">{avatar}</div>

        <div className="details">
          {taxon ? (
            <div className="species">{taxon}</div>
          ) : (
            <IonBadge className="species" color="warning">
              Species missing
            </IonBadge>
          )}
        </div>
      </>
    );
  }

  const onUpload = async (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    const isValid = checkSampleStatus();
    if (!isValid) return;

    sample.upload().catch(toast.error);
    navigate(`/home/user-surveys`, 'root');
  };

  return (
    <div className="survey-list-item" style={style}>
      <IonItemSliding>
        <IonItem routerLink={href} detail>
          {getSampleInfo()}

          <OnlineStatus
            sample={sample}
            onUpload={onUpload}
            uploadIsPrimary={uploadIsPrimary}
          />
        </IonItem>
        <IonItemOptions side="end">
          <IonItemOption color="danger" onClick={deleteSurveyWrap}>
            Delete
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </div>
  );
};

export default observer(Survey);
