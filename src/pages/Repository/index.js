import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import IssueFilter from '../../components/IssueFilter';
import IssueItem from '../../components/IssueItem';
import Pagination from '../../components/Pagination';
import api from '../../services/api';
import { IssueList, Loading, Owner } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: '', label: 'Todas', active: true },
      { state: '+state:open', label: 'Abertas', active: false },
      { state: '+state:closed', label: 'Fechadas', active: false },
    ],
    filterIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(
        `/search/issues?q=repo:${repoName}+type:issue${
          filters.find(f => f.active).state
        }`,
        {
          params: {
            per_page: 5,
          },
        }
      ),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(
      `/search/issues?q=repo:${repoName}+type:issue${filters[filterIndex].state}`,
      {
        params: {
          per_page: 5,
          page,
        },
      }
    );

    this.setState({ issues: response.data });
  };

  onFilterClick = async filterIndex => {
    await this.setState({ filterIndex, page: 1 });

    this.loadIssues();
  };

  onNavigate = async next => {
    await this.setState({
      page: next,
    });

    this.loadIssues();
  };

  render() {
    const {
      repository,
      loading,
      issues,
      filters,
      filterIndex,
      page,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        {issues.total_count > 0 ? (
          <>
            <IssueList>
              <IssueFilter
                filter={filterIndex}
                data={filters}
                handleClick={this.onFilterClick}
              />
              <IssueItem data={issues.items} />
            </IssueList>
            <Pagination
              page={page}
              count={Math.ceil(issues.total_count / 5)}
              navigate={this.onNavigate}
            />
          </>
        ) : (
          <IssueList>
            <p>Esse repositório não possui issues.</p>
          </IssueList>
        )}
      </Container>
    );
  }
}
