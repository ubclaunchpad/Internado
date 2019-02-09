import React from 'react';
import ResultRow from './ResultRow';
import { Accordion, 
         Button, 
         Icon, 
         Item, 
         Label, 
         Container, 
         Grid, 
         Segment } from 'semantic-ui-react';

export default class ResultsTable extends React.Component {

  state = {
    results : []
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    var newResults = this.state.results;
    newResults[index].active = !newResults[index].active;

    this.setState({ results: newResults });
  }
  
  renderItem(result, i){
    return (
      <Grid.Row key={i}>
        <Grid.Column>
          <Segment textAlign="left" padded>
            <Item>
              <Item.Content>
                <Item.Header as='a'><h3>{result.job_title}</h3></Item.Header>
                <Item.Meta>
                  <span className='cinema' position="left">{result.company_name}</span>
                </Item.Meta>
                <Item.Description>
                  <Accordion>
                    <Accordion.Title active={result.active == true} index={i} onClick={this.handleClick}>
                      <Icon name='dropdown'/>Description
                    </Accordion.Title>
                    <Accordion.Content active={result.active == true}>
                      <p>{result.description}</p><br/>
                    </Accordion.Content>
                  </Accordion>
                </Item.Description>
                <Item.Extra>
                  <Label icon='globe' content={result.city + ", " + result.country} />
                  <Label icon='dollar sign' content={result.salary_min ? result.salary_min : "No salary Available"}/>
                  <a href={result.link} target="_blank">
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

  addActiveFields() {
    this.props.results.map(result => (result.active = false));
    this.setState({ results: this.props.results });
  }

  componentWillMount() {
    this.addActiveFields();
  }

  // Takes 2 api calls to fire
  componentWillReceiveProps() {
    this.addActiveFields();
  }

  render() {
    return(
      <Container>
        <Grid centered padded>
          {this.state.results.map((result, i) => { return this.renderItem(result, i) })}
        </Grid>
      </Container>
    );
  }
}