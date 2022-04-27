// == Import : npm
import PropTypes from 'prop-types';
import React from 'react';

// == Import : local
import './counter.scss';

// == Composant
class Counter extends React.PureComponent {
  render() {
    const { nbTasks } = this.props;
    console.log('counter : render');
    return (
      <p className="counter">{nbTasks} tâches en cours</p>
    );
  }
}

Counter.propTypes = {
  nbTasks: PropTypes.number.isRequired,
};

// == Export
export default Counter;
