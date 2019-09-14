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
    padding: 10px;
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

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    display: flex;
    width: 100%;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const NavButton = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.disabled,
}))`
  border: 0;
  background: #7159c1;
  color: #fff;
  padding: 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #9150c9;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
