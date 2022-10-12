import { FC } from 'react';
import { IonButton, IonList } from '@ionic/react';
import { Main, InputWithValidation } from '@flumens';
import { personOutline } from 'ionicons/icons';
import { AnySchema } from 'yup';
import { Formik, Form } from 'formik';
import { Details } from './';

type Props = {
  onSubmit: (details: Details) => void;
  schema: AnySchema;
};

const ResetMain: FC<Props> = ({ onSubmit, schema }) => {
  const resetForm = (props: any) => (
    <Form>
      <IonList lines="full">
        <div className="rounded">
          <InputWithValidation
            name="email"
            placeholder="Email"
            icon={personOutline}
            type="email"
            autocomplete="off"
            {...props}
          />
        </div>
      </IonList>

      <input type="submit" style={{ display: 'none' }} />
      <IonButton
        color={props.isValid ? 'primary' : 'medium'}
        type="submit"
        expand="block"
      >
        Reset
      </IonButton>
    </Form>
  );

  return (
    <Main>
      <h2>Enter your email address to request a password reset.</h2>

      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{ email: '' }}
        validateOnMount
      >
        {resetForm}
      </Formik>
    </Main>
  );
};

export default ResetMain;
