import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Container, Form, RepositoresList, SubmitButton } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    isLoading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    // Evita que o formulario dê um refresh na página
    e.preventDefault();

    const { newRepo, repositories } = this.state;

    this.setState({ isLoading: true });

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
      avatar_url: response.data.owner.avatar_url,
    };

    const uniqueRepositories = [...repositories, data].filter(
      (elem, index, self) =>
        self.findIndex(t => {
          return t.name === elem.name;
        }) === index
    );

    this.setState({
      repositories: uniqueRepositories,
      newRepo: '',
      isLoading: false,
    });
  };

  render() {
    const { newRepo, isLoading, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt></FaGithubAlt>
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          ></input>
          <SubmitButton isLoading={isLoading}>
            {isLoading ? (
              <FaSpinner color="#FFF" size={14}></FaSpinner>
            ) : (
              <FaPlus color="#FFF" size={14}></FaPlus>
            )}
          </SubmitButton>
        </Form>

        <RepositoresList>
          {repositories.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </RepositoresList>
      </Container>
    );
  }
}
