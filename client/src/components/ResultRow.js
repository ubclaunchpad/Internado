import React, { Component } from 'react';
import {  Accordion, 
          Button, 
          Icon, 
          Item, 
          Label,
          Grid, 
          Segment } from 'semantic-ui-react';

class ResultRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  toggleSelected = () => {
    this.setState({ selected : !this.state.selected });
  }

  render() {
    return (
      <Grid.Row key={this.props.key}>
        <Grid.Column>
          <Segment textAlign="left" padded>
            <Item>
              <Item.Content>
                <Item.Header as='a'><h3>{this.props.result.job_title}</h3></Item.Header>
                <Item.Meta>
                  <span className='cinema' position="left">{this.props.result.company_name}</span>
                </Item.Meta>
                <Item.Description>
                  <Accordion>
                    <Accordion.Title active={this.state.selected} index={this.props.key} onClick={() => this.toggleSelected()}>
                      <Icon name='dropdown'/>Description
                    </Accordion.Title>
                    <Accordion.Content active={this.state.selected}>
                      <p>{this.props.result.description}</p><br/>
                    </Accordion.Content>
                  </Accordion>
                </Item.Description>
                <Item.Extra>
                  <Label icon='globe' content={`${this.props.result.city}, ${this.props.result.country}`} />
                  <Label icon='dollar sign' content={this.props.result.salary_min ? this.props.result.salary_min : "No Salary Available"}/>
                  <a href={this.props.result.link} target="_blank" rel="noopener noreferrer">
                    <Button primary floated='right'>Apply<Icon name='right chevron'/></Button>
                  </a>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default ResultRow;
