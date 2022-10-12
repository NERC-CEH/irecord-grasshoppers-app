import { FC, useState } from 'react';
import { IonIcon, IonButton, IonList, IonRouterLink } from '@ionic/react';
import {
  personOutline,
  mailOutline,
  keyOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
import { AnySchema } from 'yup';
import { Formik, Form } from 'formik';
import { Main, InputWithValidation } from '@flumens';
import config from 'common/config';
import { Details } from './';

type Props = {
  schema: AnySchema;
  onSubmit: (details: Details) => void;
};

const RegisterMain: FC<Props> = ({ onSubmit, schema }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const registrationForm = (props: any) => (
    <Form>
      <IonList lines="full">
        <div className="rounded">
          <InputWithValidation
            name="firstName"
            placeholder="First name"
            icon={personOutline}
            type="text"
            autocomplete="off"
            {...props}
          />
          <InputWithValidation
            name="secondName"
            placeholder="Last name"
            icon={personOutline}
            type="text"
            autocomplete="off"
            {...props}
          />
          <InputWithValidation
            name="email"
            placeholder="Email"
            icon={mailOutline}
            type="email"
            autocomplete="off"
            {...props}
          />
          <InputWithValidation
            name="password"
            placeholder="Password"
            icon={keyOutline}
            type={showPassword ? 'text' : 'password'}
            autocomplete="off"
            {...props}
          >
            <IonButton slot="end" onClick={togglePassword} fill="clear">
              <IonIcon
                icon={showPassword ? eyeOutline : eyeOffOutline}
                className="faint"
                size="small"
              />
            </IonButton>
          </InputWithValidation>
        </div>

        <div className="terms-info-text">
          By clicking Sign Up, you agree to our{' '}
          <IonRouterLink href={`${config.backend.url}/privacy-notice`}>
            Privacy Policy
          </IonRouterLink>{' '}
          and{' '}
          <IonRouterLink href={`${config.backend.url}/terms_of_use`}>
            Terms and Conditions
          </IonRouterLink>
        </div>
      </IonList>

      <input type="submit" style={{ display: 'none' }} />
      <IonButton
        color={props.isValid ? 'primary' : 'medium'}
        type="submit"
        expand="block"
      >
        Sign Up
      </IonButton>
    </Form>
  );

  return (
    <Main>
      <h1>Create a free account</h1>

      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
          firstName: '',
          secondName: '',
          email: '',
          password: '',
        }}
        validateOnMount
      >
        {registrationForm}
      </Formik>
    </Main>
  );
};

export default RegisterMain;
