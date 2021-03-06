import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { ErrorLabel, InputForm, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: '',
  };

  // loads data from localStorage.
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // saves data in localStorage.
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: '' });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { newRepo, repositories } = this.state;

      if (repositories.find(repo => repo.name === newRepo)) {
        throw new Error('Repository already added');
      }

      const response = await api.get(`repos/${newRepo}`).catch(error => {
        if (error.response && error.response.status === 404) {
          throw new Error('No repository found');
        } else {
          throw new Error('Connection error');
        }
      });

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (error) {
      // removes Error: prefix from message
      const message = error.toString().substring(7);
      this.setState({ error: message, loading: false });
    }
  };

  render() {
    const { newRepo, loading, repositories, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <InputForm
            type="text"
            placeholder="Add repository"
            value={newRepo}
            onChange={this.handleInputChange}
            error={error}
          />
          <SubmitButton loading={loading.toString()}>
            {loading ? (
              <FaSpinner color="#FFF" size="14" />
            ) : (
              <FaPlus color="#FFF" size="14" />
            )}
          </SubmitButton>
        </Form>
        {error && <ErrorLabel>{error}</ErrorLabel>}
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
