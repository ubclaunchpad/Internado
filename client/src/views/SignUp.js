import React, {Component} from 'react';
import '../sass/LoginSignup.scss';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import registerUser from '../backendCalls/auth/registerUser.js';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: new Map([
        ['username', ''],
        ['email', ''],
        ['password', ''],
        ['repeatPassword', '']
      ]),
      result: ''
    };
  }

  handleDataChange = (e, item) => {
    let newData = this.state.formData;
    newData[item] = e.target.value;
    this.setState({formData: newData});
  };

  handleSubmit = async(e) => {
    let data = this.state.formData;
      if (data['password'] !== data['repeatPassword']) {
        this.setState({result: <font color='#ff0000'> Passwords do not match</font>})

      } else {
        let response = await registerUser(data['email'], data['password'], data['username'], undefined);
        let responseHTML = '';
        if (response === 200) {
          responseHTML = 'Account successfully created';
        } else {
          responseHTML = <font color='#ff0000'> {response} </font>;
        }
        this.setState({result: responseHTML});
      }
  };

  render() {
    return (
      <div className='signup-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='black' textAlign='center'>
              Sign up
            </Header>
            <Form size='large'>
              <Segment raise>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username/email'
                  value={this.state.formData['username']}
                  onChange={(e) => this.handleDataChange(e, 'username')}
                />
                <Form.Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='Email'
                  value={this.state.formData['email']}
                  onChange={(e) => this.handleDataChange(e, 'email')}
                />
                <Form.Input
                  fluid
                  icon='key'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={this.state.formData['password']}
                  onChange={(e) => this.handleDataChange(e, 'password')}
                />
                <Form.Input
                  fluid
                  icon='key'
                  iconPosition='left'
                  placeholder='Repeat password'
                  type='password'
                  value={this.state.formData['repeatPassword']}
                  onChange={(e) => this.handleDataChange(e, 'repeatPassword')}
                />
                <Button color='blue' fluid size='large' onClick={this.handleSubmit}>
                  Create your account
                </Button>
              </Segment>
            </Form>
            <p>
              {this.state.result}
            </p>
            <Message>
              Already a member? <a href='/login'>Log in</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SignUpForm;
