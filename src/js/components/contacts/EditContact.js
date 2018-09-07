import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import PropTypes from 'prop-types';

class EditContact extends Component {
  
  constructor(){
    super();
  this.state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };
    
  }

  onSubmit(e){
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check For Errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const updContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    //// UPDATE CONTACT ////

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  }

    onChange(e){this.setState({[e.target.name]: e.target.value});}

  render() {
    const { name, email, phone, errors } = this.state;

    return (
        <div className="card mb-3">
            <div className="card-header">Edit Contact</div>
            <div className="card-body">
                <form onSubmit={this.onSubmit}>
                    <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
                    <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
                    <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
                    <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
                </form>
            </div>
        </div>
    );
  }
}
EditContact.propTypes = {
    history: PropTypes,
    match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string
    })
})
};

export default EditContact;
