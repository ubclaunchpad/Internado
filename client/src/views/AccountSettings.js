import React from 'react';
import { Button, Label, Container, Card, Form, Segment} from 'semantic-ui-react';

const AccountSettingsCard = () => (
  <Container className="three wide">
    <Card fluid>
      <Card.Content className="four wide">
                <Form size="big">
        <Segment.Group horizontal>
                  <Segment className="three wide column">
                    <Form.Field>
                      <label>Name</label>
                      <Form.Input icon='user' iconPosition='left' placeholder='Name' />
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
                    <Form.Field>
                      <label>Resume</label>
                      <Label
                      as="label"
                      basic
                      htmlFor="upload">
                      <Button
                          icon="upload"
                          label={{
                              basic: true,
                              content: 'Select file(s)'
                          }}
                          labelPosition="left"
                      />
                        <input
                            hidden
                            id="upload"
                            multiple
                            type="file"
                        />
                    </Label>
                    </Form.Field>
                  </Segment>
                  <Segment className="ui five wide column">
                    <Form.Field>
                      <label>Password</label>
                    <Form.Input
                      fluid
                      icon="key"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                    />
                    </Form.Field>
                  </Segment>

                </Segment.Group>

                  <Button floated="right" secondary> Revert </Button>
                  <Button floated="right" primary> Save All </Button>
                </Form>
    </Card.Content>
    </Card>
</Container>
);

export default AccountSettingsCard;
