import { ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  children: ReactNode;
}

const Container = styled.div`
  height: 100vh;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenterLayout = ({ children }: IProps) => {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};
