import React, {PureComponent} from "react";
import {Field, reduxForm} from "redux-form";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import renderCheckBoxField from "../../../../shared/components/form/CheckBox";
import {userActions} from "../../../../redux/actions/userActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function mapDispatchToProps(dispatch) {
    return {login: bindActionCreators(userActions.login, dispatch)};
}

class LogInForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            username: '',
            password: '',
        };

        this.showPassword = this.showPassword.bind(this);
    }

    showPassword(e) {
        e.preventDefault();
        this.setState(prevState => ({showPassword: !prevState.showPassword}));
    }

    setUsername(e) {
        this.setState({username: e.target.value});
    }

    setPassword(e) {
        this.setState({password: e.target.value});
    }

    onLoginClick() {
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        const {showPassword} = this.state;

        return (
            <form className="form" onSubmit={this.onLoginClick}>
                <div className="form__form-group">
                    <span className="form__form-group-label">Username</span>
                    <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                            <AccountOutlineIcon/>
                        </div>
                        <Field
                            onChange={this.setUsername.bind(this)}
                            value={this.state.username}
                            name="username"
                            component="input"
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">Password</span>
                    <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                            <KeyVariantIcon/>
                        </div>
                        <Field
                            onChange={this.setPassword.bind(this)}
                            value={this.state.password}
                            name="password"
                            component="input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            className={`form__form-group-button${
                                showPassword ? " active" : ""
                                }`}
                            onClick={e => this.showPassword(e)}
                        >
                            <EyeIcon/>
                        </button>
                    </div>
                    <div className="account__forgot-password">
                        <a href="/easydev/log_in">Forgot a password?</a>
                    </div>
                </div>
                <div className="form__form-group">
                    <div className="form__form-group-field">
                        <Field
                            name="remember_me"
                            component={renderCheckBoxField}
                            label="Remember me"
                        />
                    </div>
                </div>
                <div className="account__btns">
                    <button
                        type="button"
                        className="btn btn-primary account__btn"
                        onClick={e => this.onLoginClick(e)}
                        label="Login"
                    />
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: "log_in_form" // a unique identifier for this form
})(connect(null, mapDispatchToProps)(LogInForm));
