import { connect } from 'react-redux';
import { logout, signup, login, clearSessionErrors } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.session.currentUser,
  errors: state.errors.sessionErrors,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  processForm: (user) => dispatch(signup(user)),
  demoLogin: () => dispatch(login({email: 'jamie_lannister@gmail.com', password: 'swagger'})),
  clearSessionErrors: () => dispatch(clearSessionErrors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
