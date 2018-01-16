import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class GuestInfoForm extends Component {

  constructor () {
    super()
    this.state = {
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({
      email: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setEmail(this.state.email)
  }

  render() {
    return (
      <div>
        <p style={please}>Please enter the following information:</p>
        <Form onSubmit={this.handleSubmit} style={formContainer}>

          <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
          </Form.Field>

          <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
          </Form.Field>

          <Form.Field>
            <label>Email</label>
            <input value={`${this.state.email}`} onChange={this.handleChange} placeholder='email' />
          </Form.Field>

          <Form.Field>
            <label>Address</label>
            <input placeholder='Address' />
          </Form.Field>

        </Form>
      </div>
    )
  }

}

export default GuestInfoForm

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1em'
  },
  please: {
    padding: '1em 1em 0 1em'
  }
}

const { formContainer, please } = styles
