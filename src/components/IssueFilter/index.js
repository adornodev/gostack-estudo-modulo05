import PropTypes from 'prop-types';
import React from 'react';
import { Container } from './styles';

function IssueFilter({ filter, data, handleClick }) {
  return (
    <Container active={filter}>
      {data.map((item, index) => {
        return (
          <button
            type="button"
            key={item.label}
            onClick={() => handleClick(index)}
          >
            {item.label}
          </button>
        );
      })}
    </Container>
  );
}

IssueFilter.propTypes = {
  filter: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default IssueFilter;
