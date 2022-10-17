import { FC, SyntheticEvent } from 'react';
import Sample from 'models/sample';
import { IonSpinner, IonChip, IonButton } from '@ionic/react';
import { observer } from 'mobx-react';
import './styles.scss';

interface Props {
  sample: Sample;
  onUpload: (e: SyntheticEvent) => void;
  uploadIsPrimary?: boolean;
}

const UsersSurveys: FC<Props> = ({ onUpload, sample, uploadIsPrimary }) => {
  const { saved } = sample.metadata;
  const { synchronising } = sample.remote;
  const isDisabled = sample.isUploaded();

  if (!saved) {
    return (
      <IonChip slot="end" color="dark" class="survey-status ion-text-wrap">
        Draft
      </IonChip>
    );
  }

  if (synchronising) return <IonSpinner slot="end" class="survey-status" />;

  if (isDisabled) return null;

  return (
    <IonButton
      slot="end"
      class="survey-status-upload"
      onClick={onUpload}
      fill={uploadIsPrimary ? undefined : 'outline'}
    >
      Upload
    </IonButton>
  );
};

export default observer(UsersSurveys);
