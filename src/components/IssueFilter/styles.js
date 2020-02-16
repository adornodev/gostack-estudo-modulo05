import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
  button {
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    margin: 0 0.25rem;
    &:nth-child(${props => props.active + 1}) {
      background: #7159c1;
      color: white;
    }
  }
`;
