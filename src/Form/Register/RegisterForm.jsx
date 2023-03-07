import React from "react";

const ShowErrorsEmail = ({ errors }) => {
  return (
    <div>
      {errors.map((errorsEmail, i) => (
        <p key={i} className="errors">
          {errorsEmail}
        </p>
      ))}
    </div>
  );
};

const ShowErrorsPassword = ({ errors }) => {
  return (
    <div>
      {errors.map((errorsPassword, i) => (
        <label key={i} className="errors">
          {errorsPassword}
        </label>
      ))}
    </div>
  );
};

export default class RegisterForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    terms: false,
    errors: false,
    errorsEmail: [],
    errorsPassword: [],
  };

  handleSubmit = (e) => {
    const { username, email, password } = this.state;
    e.preventDefault();
    if (username.length === 0 || email.length === 0 || password.length === 0) {
      this.setState({ errors: true });
    }

    let messageEmail = [];
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      messageEmail = [...messageEmail, "*Email not valid"];
    }

    let messagePassword = [];
    if (password.length < 8) {
      messagePassword = [...messagePassword, "Password min 8 character"];
    }

    if (messageEmail.length > 0 || messagePassword.length > 0) {
      this.setState(
        {
          errorsEmail: messageEmail,
          errorsPassword: messagePassword,
        },
        () =>
          console.log(
            "email:",
            this.state.errorsEmail,
            "password",
            this.state.errorsPassword
          )
      );
    } else {
      alert(`
        REGISTER BERHASIL
        =========================================\n
        Username : ${this.state.username}
        Email : ${this.state.email}
        Password : ${this.state.password}
        Terms : ${this.state.terms ? "YES" : "NO"}
      `);

      this.setState({
        errorsEmail: [],
        errorsPassword: [],
      });
    }
  };

  render() {
    return (
      <div className="box">
        <div className="form-box">
          <h2 className="title">register form</h2>
          <form action="" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              className="login-form-input"
              placeholder="Username"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            {this.state.errors && this.state.username <= 0 ? (
              <label className="errors">*Username Can't be empty</label>
            ) : (
              ""
            )}
            <input
              type="email"
              name="email"
              className="login-form-input"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            {this.state.errors && this.state.email <= 0 ? (
              <label className="errors">*Email Can't be empty</label>
            ) : (
              ""
            )}

            <ShowErrorsEmail errors={this.state.errorsEmail} />
            <input
              type="password"
              name="password"
              className="login-form-input"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            {this.state.errors && this.state.password <= 0 ? (
              <label className="errors">*Password Can't be empty</label>
            ) : (
              ""
            )}
            <ShowErrorsPassword errors={this.state.errorsPassword} />
            {/* {this.state.errorsPassword && this.state.password < 8 ? (
              <label className="errors">*Password min 8 character</label>
            ) : (
              ""
            )} */}
            <div className="terms">
              <p>
                <input
                  type="checkbox"
                  name="terms"
                  checked={this.state.terms}
                  onChange={(e) => this.setState({ terms: e.target.checked })}
                />
                I agree to these <a href="">terms & conditions</a>
              </p>
            </div>
            <button className="login-form-btn" type="submit">
              register
            </button>
            <p className="text">
              Already a member? <a href="">login here</a>
            </p>
          </form>
        </div>
        <div className="circle-two"></div>
        <div className="circle-one"></div>
      </div>
    );
  }
}
