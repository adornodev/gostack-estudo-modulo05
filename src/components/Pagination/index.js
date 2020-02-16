/* eslint-disable class-methods-use-this */
/* eslint-disable no-continue */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container, NavigationButton } from './styles';

export default class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  createControls(currentPage, pageCount) {
    const controls = [];

    const maxPages = currentPage > 2 ? 5 : 5;

    const controlLeft = currentPage > 2 ? currentPage - 2 : 0;
    const controlRight = currentPage > 2 ? currentPage + 2 : 0;

    for (let page = 1; page <= pageCount; page += 1) {
      if (currentPage > 2 && controls.length === 0) {
        controls.push(1);
        continue;
      }

      if (controls.length >= maxPages) {
        controls.push(pageCount);
        break;
      }

      if (currentPage > 2 && (controlLeft > page || controlRight < page)) {
        if (controlRight < page) break;
        continue;
      }

      controls.push(page);
    }

    return controls;
  }

  render() {
    const { page, count, navigate } = this.props;

    const controls = this.createControls(page, count);

    return (
      <Container>
        <NavigationButton
          disabled={page < 2}
          onClick={() => navigate(page - 1)}
        >
          Anterior
        </NavigationButton>
        {controls.map(pagina => {
          const isActive = pagina === page;

          return (
            <NavigationButton
              key={String(pagina)}
              onClick={() => navigate(pagina)}
              active={isActive}
            >
              {pagina}
            </NavigationButton>
          );
        })}
        <NavigationButton onClick={() => navigate(page + 1)}>
          Próximo
        </NavigationButton>
      </Container>
    );
  }
}
