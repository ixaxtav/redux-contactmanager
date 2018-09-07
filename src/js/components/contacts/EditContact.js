import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getContact, updateContact} from '../../../actions/contactActions.js';

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
  
  UNSAFE_componentWillReceiveProps(nextProps, nextState){
    const {name, email, phone} = nextProps.contact;
    this.setState({
      name,
      email,
      phone
    });
  }
  
  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.getContact(id);
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


    const { id } = this.props.match.params;

    const updContact = {
      id,
      name,
      email,
      phone
    };
    
    this.props.updateContact(updContact);

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
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => this.onChange(e)}
              error={errors.name}
            />
                    <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => this.onChange(e)}
              error={errors.email}
            />
                    <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => this.onChange(e)}
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
    }),
contact: PropTypes.object,
getContact: PropTypes.func,
updateContact: PropTypes.func
};

const mapStateToProps = state => ({
  contact: state.contact.contact
});

export default connect(mapStateToProps, {getContact , updateContact})(EditContact);
