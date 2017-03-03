import React from 'react';

const Filter = props => {
  return (
    <a href="#"
       onClick={ () => props.onClick(props.type) }
       className={ props.value === props.type ? "selected" : "" }>
       { props.children }
    </a>
  );
};
Filter.propTypes = {
  onClick: React.PropTypes.func,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string
}

export default Filter
