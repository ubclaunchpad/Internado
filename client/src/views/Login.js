import React from 'react';
import '../sass/LoginSignup.scss';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const LoginForm = () => (
  <div className='login-form'>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='black' textAlign='center'>
          Log in
        </Header>
        <Form size='large'>
          <Segment raised>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username/email' />
            <Form.Input
              fluid
              icon='key'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Button color='blue' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Don't have an Account? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
    </div>
)

export default LoginForm;