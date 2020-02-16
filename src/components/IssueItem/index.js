import PropTypes from 'prop-types';
import React from 'react';

function IssueItem({ data }) {
  return data.map(issue => {
    return (
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
    );
  });
}

IssueItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
};

export default IssueItem;
