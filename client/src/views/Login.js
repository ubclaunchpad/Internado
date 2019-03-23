import React, {Component} from 'react';
import '../sass/LoginSignup.scss';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import userLogin from '../backendCalls/auth/userLogin.js';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: new Map([
        ['email', ''],
        ['password', ''],
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
    let response = await userLogin(data['email'], data['password']);
    let responseHTML = '';
    try {
      // If the login failed, the next line will fail to parse response
      let JSONresponse = JSON.parse(response);
      responseHTML = 'Logged in successfully';
    } catch {
      // If the login failed, response will be a string describing the failure
      responseHTML = <font color='#ff0000'> {response} </font>;
    }
    this.setState({result: responseHTML});
  };

  render() {
    return (
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='black' textAlign='center'>
              Log in
            </Header>
            <Form size='large'>
              <Segment raised>
                <Form.Input fluid icon='user'
                  iconPosition='left'
                  placeholder='email'
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
                <Button color='blue' fluid size='large' onClick={this.handleSubmit}>
                  Login
                </Button>
              </Segment>
            </Form>
            <p>
              {this.state.result}
            </p>
            <Message>
              Don't have an Account? <a href='/signup'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
        </div>
   )
  }
}

export default LoginForm;
