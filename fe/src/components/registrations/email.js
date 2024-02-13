import React from "react";
import './formstyles.css';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.initialEmail || "",
      valid: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.initialEmail !== prevProps.initialEmail) {
      this.setState({ email: this.props.initialEmail || "", valid: this.validateEmail(this.props.initialEmail) });
    }
  }

  handleEmailChange = (e) => {
    const email = e.target.value;
    const isValid = this.validateEmail(email);
    this.setState({ email: email, valid: isValid });
    if (this.props.onChange) {
      this.props.onChange(email, isValid);
    }
  };

  validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+$/;
    return regex.test(email) && email.length > 6;
  };

  render() {
    const { valid } = this.state;
    const inputStyle = valid ? "form-input valid" : "form-input invalid";

    return (
      <div>
        <label htmlFor="emailInput" className="form-label">
          Email:
        </label>
        <input
          className={inputStyle}
          type="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          placeholder="Enter your email"
        />
      </div>
    );
  }
}

export default EmailForm;