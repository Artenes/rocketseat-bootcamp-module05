import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import api from '../../services/api';
import { Loading, Owner, IssueList, Navigation, NavButton } from './styles';
import Container from '../../components/Container';

// import { Container } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ repository: PropTypes.string }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`repos/${repoName}`),
      api.get(`repos/${repoName}/issues`, {
        params: {
          state: 'open',
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handlePageChange = async page => {
    const { repository } = this.state;

    if (page < 1) {
      return;
    }

    this.setState({ loading: true });

    const response = await api.get(`repos/${repository.full_name}/issues`, {
      params: {
        state: 'open',
        page,
      },
    });

    this.setState({ page, loading: false, issues: response.data });
  };

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return <Loading>Loading</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowLeft size="10" />
            back
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          {issues.length === 0 && <h3>No issues found</h3>}
        </IssueList>

        <Navigation>
          <NavButton
            disabled={page === 1}
            onClick={() => {
              this.handlePageChange(page - 1);
            }}
          >
            <FaArrowLeft size="14" />
          </NavButton>
          <NavButton
            onClick={() => {
              this.handlePageChange(page + 1);
            }}
          >
            <FaArrowRight size="14" />
          </NavButton>
        </Navigation>
      </Container>
    );
  }
}
