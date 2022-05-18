import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { login } from 'services';
import { ILoginData } from 'utils';
import { BasicInput, PasswordInput, ErrorBox } from 'components';

const ColumnForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  margin: 8px !important;
`;

const initialValues = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string>('');

  const onSubmit = async (values: ILoginData) => {
    const response = await login(values);

    if (response.status) {
      navigate('/admin');
    } else {
      setErrorText(response.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={object({
        email: string().required('Please enter email').email('Invalid email'),
        password: string()
          .required('Please enter password')
          .min(7, 'Password is too short'),
      })}
      onSubmit={onSubmit}
    >
      {({ errors, isValid, touched, dirty, handleSubmit }) => (
        <ColumnForm
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <BasicInput
            label="Email"
            name="email"
            isError={Boolean(errors.email) && Boolean(touched.email)}
            isErrorText={Boolean(touched.email) && Boolean(errors.email)}
            errorText={errors.email}
          />

          <PasswordInput
            name="password"
            label="Password"
            isError={Boolean(errors.password) && Boolean(touched.password)}
            isErrorText={Boolean(touched.password) && Boolean(errors.password)}
            errorText={errors.password}
          />

          {errorText != '' && <ErrorBox errorText={errorText} />}

          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!isValid || !dirty}
          >
            Sign up
          </SubmitButton>
        </ColumnForm>
      )}
    </Formik>
  );
};
