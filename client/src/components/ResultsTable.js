import React from 'react';
import store from '../store.js';
import { Accordion, 
         Button, 
         Icon, 
         Item, 
         Label, 
         Container, 
         Grid, 
         Segment } from 'semantic-ui-react';

export default class ResultsTable extends React.Component {
  
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    //var newResults = store.searchResults;
    //newResults[index].active = !newResults[index].active;
    store.searchResults[index].active = !store.searchResults[index].active;
    console.log(store.searchResults[index].active);
  }
  
  renderItem(result, i) {
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
                    <Accordion.Title active={result.active === true} index={i} onClick={this.handleClick}>
                      <Icon name='dropdown'/>Description
                    </Accordion.Title>
                    <Accordion.Content active={result.active === true}>
                      <p>{result.description}</p><br/>
                    </Accordion.Content>
                  </Accordion>
                </Item.Description>
                <Item.Extra>
                  <Label icon='globe' content={`${result.city}, ${result.country}`} />
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

  render() {
    return(
      <Container>
        <Grid centered padded>
          {store.searchResults.map((result, i) => { return this.renderItem(result, i) })}
        </Grid>
      </Container>
    );
  }
}