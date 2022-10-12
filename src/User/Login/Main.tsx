import { FC, useState } from 'react';
import { IonIcon, IonButton, IonList } from '@ionic/react';
import { Link } from 'react-router-dom';

import {
  keyOutline,
  personOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons';
import { AnySchema } from 'yup';
import { Formik, Form } from 'formik';
import { Main, InputWithValidation } from '@flumens';
import { Details } from './';

type Props = {
  schema: AnySchema;
  onSubmit: (details: Details) => void;
};

const LoginMain: FC<Props> = ({ schema, onSubmit }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const loginForm = (props: any) => (
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

        <Link to="/user/reset" className="password-forgot-button">
          Forgot password?
        </Link>
      </IonList>

      <input type="submit" style={{ display: 'none' }} />
      <IonButton
        color={props.isValid ? 'primary' : 'medium'}
        type="submit"
        expand="block"
      >
        Sign In
      </IonButton>

      <div className="signup-button">
        I don't have an account. <Link to="/user/register">Sign Up</Link>
      </div>
    </Form>
  );

  return (
    <Main>
      <h1>Welcome back</h1>
      <h2>Sign in to your account to start</h2>

      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{ email: '', password: '' }}
        validateOnMount
      >
        {loginForm}
      </Formik>
    </Main>
  );
};

export default LoginMain;
