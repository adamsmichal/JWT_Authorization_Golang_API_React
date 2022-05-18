import {
  InputLabel,
  OutlinedInput,
  FormControl,
  FormHelperText,
} from '@mui/material';
import styled from 'styled-components';
import { Field } from 'formik';

interface IProps {
  label: string;
  name: string;
  type?: string;
  isError: boolean;
  isErrorText: boolean;
  errorText?: string;
}

const FormWrapper = styled(FormControl)`
  width: 25ch;
  height: 80px;
  margin: 8px 8px 0px 8px !important;
`;

export const BasicInput = ({
  label,
  name,
  type = name,
  isError,
  isErrorText,
  errorText,
}: IProps) => {
  return (
    <FormWrapper variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Field
        as={OutlinedInput}
        id={name}
        label={label}
        type={type}
        name={name}
        error={isError}
      />
      {isErrorText && <FormHelperText error>{errorText}</FormHelperText>}
    </FormWrapper>
  );
};
