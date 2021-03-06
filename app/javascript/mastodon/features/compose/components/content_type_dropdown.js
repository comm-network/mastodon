import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import IconButton from '../../../components/icon_button';
import Overlay from 'react-overlays/lib/Overlay';
import Motion from '../../ui/util/optional_motion';
import spring from 'react-motion/lib/spring';
import detectPassiveEvents from 'detect-passive-events';
import classNames from 'classnames';
import Icon from 'mastodon/components/icon';
import Octicon, { getIconByName, Markdown } from '@primer/octicons-react';

const messages = defineMessages({
  content_type: {
    defaultMessage: 'Content type',
    id: 'content-type.change',
  },
  markdown: {
    defaultMessage: 'Markdown',
    id: 'compose.content-type.markdown',
  },
  plain: {
    defaultMessage: 'Plain text',
    id: 'compose.content-type.plain',
  },
  html: {
    defaultMessage: 'HTML',
    id: 'compose.content-type.html',
  },
});

const listenerOptions = detectPassiveEvents.hasSupport ? { passive: true } : false;

class ContentTypeDropdownMenu extends React.PureComponent {

  static propTypes = {
    style: PropTypes.object,
    items: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    placement: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    mounted: false,
  };

  handleDocumentClick = e => {
    if (this.node && !this.node.contains(e.target)) {
      this.props.onClose();
    }
  };

  handleKeyDown = e => {
    const { items } = this.props;
    const value = e.currentTarget.getAttribute('data-index');
    const index = items.findIndex(item => {
      return (item.value === value);
    });
    let element;

    switch (e.key) {
    case 'Escape':
      this.props.onClose();
      break;
    case 'Enter':
      this.handleClick(e);
      break;
    case 'ArrowDown':
      element = this.node.childNodes[index + 1];
      if (element) {
        element.focus();
        this.props.onChange(element.getAttribute('data-index'));
      }
      break;
    case 'ArrowUp':
      element = this.node.childNodes[index - 1];
      if (element) {
        element.focus();
        this.props.onChange(element.getAttribute('data-index'));
      }
      break;
    case 'Tab':
      if (e.shiftKey) {
        element = this.node.childNodes[index - 1] || this.node.lastChild;
      } else {
        element = this.node.childNodes[index + 1] || this.node.firstChild;
      }
      if (element) {
        element.focus();
        this.props.onChange(element.getAttribute('data-index'));
        e.preventDefault();
        e.stopPropagation();
      }
      break;
    case 'Home':
      element = this.node.firstChild;
      if (element) {
        element.focus();
        this.props.onChange(element.getAttribute('data-index'));
      }
      break;
    case 'End':
      element = this.node.lastChild;
      if (element) {
        element.focus();
        this.props.onChange(element.getAttribute('data-index'));
      }
      break;
    }
  };

  handleClick = e => {
    const value = e.currentTarget.getAttribute('data-index');

    e.preventDefault();

    this.props.onClose();
    this.props.onChange(value);
  };

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, listenerOptions);
    if (this.focusedItem) this.focusedItem.focus();
    this.setState({ mounted: true });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, listenerOptions);
  }

  setRef = c => {
    this.node = c;
  };

  setFocusRef = c => {
    this.focusedItem = c;
  };

  render() {
    const { mounted } = this.state;
    const { style, items, placement, value } = this.props;

    return (
      <Motion
        defaultStyle={{ opacity: 0, scaleX: 0.85, scaleY: 0.75 }} style={{
        opacity: spring(1, { damping: 35, stiffness: 400 }),
        scaleX: spring(1, { damping: 35, stiffness: 400 }),
        scaleY: spring(1, { damping: 35, stiffness: 400 }),
      }}
      >
        {({ opacity, scaleX, scaleY }) => (
          // It should not be transformed when mounting because the resulting
          // size will be used to determine the coordinate of the menu by
          // react-overlays
          <div
            className={`content-type-dropdown__dropdown ${placement}`} style={{
            ...style,
            opacity: opacity,
            transform: mounted ? `scale(${scaleX}, ${scaleY})` : null,
            zIndex: 2,
          }} role='listbox' ref={this.setRef}
          >
            {items.map(item => {
              let resIcon;
              if (item.octicon) {
                resIcon = <Octicon icon={item.octicon} aria-hidden='true' />;
              } else {
                resIcon = <Icon brandsIcon={item.brandsIcon} id={item.icon} fixedWidth aria-hidden='true' />;
              }
              return (
                <div
                  role='option' tabIndex='0' key={item.value} data-index={item.value} onKeyDown={this.handleKeyDown}
                  onClick={this.handleClick}
                  className={classNames('content-type-dropdown__option', { active: item.value === value })}
                  aria-selected={item.value === value} ref={item.value === value ? this.setFocusRef : null}
                >
                  <div className='content-type-dropdown__option__icon'>
                    {resIcon}
                  </div>

                  <div className='content-type-dropdown__option__content'>
                    <strong>{item.text}</strong>
                    {item.meta}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Motion>
    );
  }

}

export default @injectIntl
class ContentTypeDropdown extends React.PureComponent {

  static propTypes = {
    isUserTouching: PropTypes.func,
    isModalOpen: PropTypes.bool.isRequired,
    onModalOpen: PropTypes.func,
    onModalClose: PropTypes.func,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
    onChangeContentType: PropTypes.func,
    contentType: PropTypes.string,
    showContentTypeChoice: PropTypes.bool,
  };

  state = {
    open: false,
    placement: 'bottom',
  };

  handleToggle = ({ target }) => {
    if (this.props.isUserTouching()) {
      if (this.state.open) {
        this.props.onModalClose();
      } else {
        this.props.onModalOpen({
          actions: this.options.map(option => ({ ...option, active: option.value === this.props.value })),
          onClick: this.handleModalActionClick,
        });
      }
    } else {
      const { top } = target.getBoundingClientRect();
      if (this.state.open && this.activeElement) {
        this.activeElement.focus();
      }
      this.setState({ placement: top * 2 < innerHeight ? 'bottom' : 'top' });
      this.setState({ open: !this.state.open });
    }
  };

  handleModalActionClick = (e) => {
    e.preventDefault();

    const { value } = this.options[e.currentTarget.getAttribute('data-index')];

    this.props.onModalClose();
    this.props.onChange(value);
  };

  handleKeyDown = e => {
    switch (e.key) {
    case 'Escape':
      this.handleClose();
      break;
    }
  };

  handleMouseDown = () => {
    if (!this.state.open) {
      this.activeElement = document.activeElement;
    }
  };

  handleButtonKeyDown = (e) => {
    switch (e.key) {
    case ' ':
    case 'Enter':
      this.handleMouseDown();
      break;
    }
  };

  handleClose = () => {
    if (this.state.open && this.activeElement) {
      this.activeElement.focus();
    }
    this.setState({ open: false });
  };

  handleChange = value => {
    this.props.onChange(value);
  };

  componentWillMount() {
    const { intl: { formatMessage } } = this.props;
  }

  render() {
    const { intl, value } = this.props;
    const { open, placement } = this.state;

    const contentTypeItems = [
      {
        icon: 'align-left',
        value: 'text/plain',
        octicon: undefined,
        name: 'text',
        text: <FormattedMessage {...messages.plain} />,
      }, {
        icon: 'code',
        value: 'text/html',
        octicon: undefined,
        name: 'html',
        text: <FormattedMessage {...messages.html} />,
      }, {
        icon: '',
        name: 'markdown',
        octicon: Markdown,
        value: 'text/markdown',
        text: <FormattedMessage {...messages.markdown} />,
      },
    ];
    let currentContentType = contentTypeItems.find(item => item.value === value);
    return (
      <div className={classNames('content-type-dropdown', placement, { active: open })} onKeyDown={this.handleKeyDown}>
        <div
          className={classNames('content-type-dropdown__value', { active: (placement === 'bottom' ? 0 : (this.options.length - 1)) })}
        >
          {
            <IconButton
              className='content-type-dropdown__value-icon'
              icon={(currentContentType !== undefined) ? currentContentType.icon : 'align-left'}
              title={intl.formatMessage(messages.content_type)}
              size={18}
              expanded={open}
              octicon={(currentContentType && currentContentType.octicon)}
              active={open}
              inverted
              onClick={this.handleToggle}
              onMouseDown={this.handleMouseDown}
              onKeyDown={this.handleButtonKeyDown}
              style={{ height: null, lineHeight: '27px' }}
            />
          }
        </div>

        <Overlay show={open} placement={placement} target={this}>
          <ContentTypeDropdownMenu
            items={contentTypeItems}
            value={value}
            onClose={this.handleClose}
            onChange={this.handleChange}
            placement={placement}
          />
        </Overlay>
      </div>
    );
  }

}
