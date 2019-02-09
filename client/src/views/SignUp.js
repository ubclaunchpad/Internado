import React from 'react'
import '../sass/LoginSignup.scss';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const SignUpForm = () => (
  <div className='signup-form'>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='black' textAlign='center'>
          Sign up
        </Header>
        <Form size='large'>
          <Segment raise>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username/email' />
            <Form.Input fluid icon='mail' iconPosition='left' placeholder='Email' />
            <Form.Input
              fluid
              icon='key'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Form.Input
              fluid
              icon='key'
              iconPosition='left'
              placeholder='Repeat password'
              type='password'
            />
            <Button color='blue' fluid size='large'>
              Create your account
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a member? <a href='#'>Log in</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)

export default SignUpForm;