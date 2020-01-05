import { connect } from 'react-redux';
import { changeComposeContentType } from '../../../actions/compose';
import { openModal, closeModal } from '../../../actions/modal';
import { isUserTouching } from '../../../is_mobile';
import ContentTypeDropdown from '../components/content_type_dropdown';

const mapStateToProps = state => ({
  isModalOpen: state.get('modal').modalType === 'ACTIONS',
  value: state.getIn(['compose', 'content_type']),
});

const mapDispatchToProps = dispatch => ({

  onChange (value) {
    dispatch(changeComposeContentType(value));
  },

  isUserTouching,
  onModalOpen: props => dispatch(openModal('ACTIONS', props)),
  onModalClose: () => dispatch(closeModal()),

});

export default connect(mapStateToProps, mapDispatchToProps)(ContentTypeDropdown);

