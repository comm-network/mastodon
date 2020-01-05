import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Icon extends React.PureComponent {

  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    fixedWidth: PropTypes.bool,
    brandsIcon: PropTypes.bool,
  };

  render () {
    const { id, className, fixedWidth, brandsIcon, ...other } = this.props;

    let faRes = 'fa' + ((brandsIcon) ? 'b' : '');
    return (
      <i role='img' className={classNames(faRes, `fa-${id}`, className, { 'fa-fw': fixedWidth })} {...other} />
    );
  }

}
