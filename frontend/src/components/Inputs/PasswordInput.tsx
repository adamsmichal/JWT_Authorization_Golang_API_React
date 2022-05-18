import { useState } from 'react';
import styled from 'styled-components';
import {
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Field } from 'formik';

interface IProps {
  name: string;
  label: string;
  isError: boolean;
  isErrorText: boolean;
  errorText?: string;
}

const FormWrapper = styled(FormControl)`
  width: 25ch;
  height: 80px;
  margin: 8px 8px 0px 8px !important;
`;

export const PasswordInput = ({
  name,
  label,
  isError,
  isErrorText,
  errorText,
}: IProps) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => event.preventDefault();

  return (
    <FormWrapper variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Field
        as={OutlinedInput}
        id={name}
        name={name}
        label={label}
        type={passwordVisible ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {passwordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        error={isError}
      />
      {isErrorText && <FormHelperText error>{errorText}</FormHelperText>}
    </FormWrapper>
  );
};
