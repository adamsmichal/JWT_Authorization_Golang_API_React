import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { object, string, ref } from 'yup';
import { register } from 'services';
import { IRegisterData } from 'utils';
import { BasicInput, PasswordInput, ErrorBox } from 'components';

const ColumnForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  margin: 8px !important;
`;

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string>('');

  const onSubmit = async (values: IRegisterData) => {
    const response = await register(values);

    if (response.status) {
      navigate('/');
    } else {
      setErrorText(response.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={object({
        name: string()
          .required('Please enter name')
          .min(3, 'Name is too short'),
        email: string().required('Please enter email').email('Invalid email'),
        password: string()
          .required('Please enter password')
          .min(7, 'Password is too short'),
        passwordConfirm: string()
          .required('Please confirm password')
          .oneOf([ref('password'), null], 'Passwords must match'),
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
            label="Name"
            name="name"
            type="text"
            isError={Boolean(errors.name) && Boolean(touched.name)}
            isErrorText={Boolean(touched.name) && Boolean(errors.name)}
            errorText={errors.name}
          />
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

          <PasswordInput
            name="passwordConfirm"
            label="Confirm password"
            isError={
              Boolean(errors.passwordConfirm) &&
              Boolean(touched.passwordConfirm)
            }
            isErrorText={
              Boolean(touched.passwordConfirm) &&
              Boolean(errors.passwordConfirm)
            }
            errorText={errors.passwordConfirm}
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
