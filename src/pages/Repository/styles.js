import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  a {
    color: #fff;
    background: #7159c1;
    font-size: 16px;
    text-decoration: none;
    position: absolute;
    left: 0px;
    padding: 5px;
    border-radius: 5px;

    svg {
      margin-right: 5px;
    }
  }

  img {
    max-width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;
