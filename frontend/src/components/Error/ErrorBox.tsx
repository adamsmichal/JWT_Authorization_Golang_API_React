import styled from 'styled-components';

interface IProps {
  errorText: string;
}

const Container = styled.div`
  height: 25px;
  background-color: rgba(255, 0, 0, 0.2);
  margin: 8px;
  border: 1px solid red;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ErrorBox = ({ errorText }: IProps) => {
  return (
    <Container>
      <p>{errorText}</p>
    </Container>
  );
};
