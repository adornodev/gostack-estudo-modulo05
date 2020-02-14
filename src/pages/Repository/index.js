import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import api from '../../services/api';
import { Loading, Owner } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repoDetails: {},
    repoIssues: [],
    isLoading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [rrepoDetails, rrepoIssues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      isLoading: false,
      repoDetails: rrepoDetails.data,
      repoIssues: rrepoIssues.data,
    });
  }

  render() {
    const { isLoading, repoDetails, repoIssues } = this.state;

    if (isLoading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar</Link>
          <img
            src={repoDetails.owner.avatar_url}
            alt={repoDetails.owner.login}
          ></img>
          <h1>{repoDetails.name}</h1>
          <p>{repoDetails.description}</p>
        </Owner>
      </Container>
    );
  }
}
