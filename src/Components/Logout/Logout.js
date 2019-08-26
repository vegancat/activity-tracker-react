import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const logout = props => {
    props.logout();
    return null;
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(logout);
