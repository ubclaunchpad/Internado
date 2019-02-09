import React from 'react';
import { Container, Card, Form, Grid, Segment} from 'semantic-ui-react';

const AccountSettingsCard = () => (
  <Container fluid>
    <Card fluid className="centered">
      <Card.Content >
                <Form size="huge">

        <Segment.Group horizontal>
                  <Segment className="three wide column">
                    <Form.Field>
                      <label>Name</label>
                      <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' />
                    </Form.Field>
                    <Form.Field>
                      <label>Email</label>
                      <Form.Input fluid icon='mail' iconPosition='left' placeholder='example@email.com' />
                    </Form.Field>
                    <Form.Field>
                      <label>Theme</label>
                      <div className="ui toggle checkbox">
                        <input type="checkbox" name="Theme"/>
                        <label>Dark/stormy theme</label>
                      </div>
                    </Form.Field>
                  </Segment>

                  <Segment className="five wide column">
                    <p>Saved Searches?</p> 
                  </Segment>

                  </Segment.Group>
                </Form>
    </Card.Content>

    </Card>
  </Container>
);

export default AccountSettingsCard;
