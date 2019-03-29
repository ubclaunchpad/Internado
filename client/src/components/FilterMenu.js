import React, { Component } from 'react';
import { Accordion, Button, Icon, Input, Label, List, Menu } from 'semantic-ui-react';
import { func } from 'prop-types';

const CATEGORIES = [
  'Full stack web',
  'Backend web',
  'Frontend web',
  'Android',
  'iOS',
  'Machine Learning',
  'Natural Language Processing',
  'Graphics',
  'Gaming',
];

const INDUSTRIES = ['E-commerce', 'Social Networking'];

const propTypes = {
  handleAddFilterKeyword: func.isRequired,
  handleAddMinSalary: func.isRequired,
};

class FilterMenu extends Component {
  state = {
    isShowCategories: false,
    isShowIndustries: false,
    isShowSalary: false,
  };

  toggleCategories = () => {
    this.setState((prevState) => ({
      isShowCategories: !prevState.isShowCategories,
    }));
  };

  toggleIndustries = () => {
    this.setState((prevState) => ({
      isShowIndustries: !prevState.isShowIndustries,
    }));
  };

  toggleSalary = () => {
    this.setState((prevState) => ({
      isShowSalary: !prevState.isShowSalary,
    }));
  };

  handleAddMinSalary = () => {
    const newSalary = parseInt(this.inputSalary.value, 10);
    if (!Number.isNaN(newSalary) && newSalary > 0) {
      this.props.handleAddMinSalary(newSalary);
    }
  };

  accordionList = (title, listItems, isActive, onTitleClick, onListItemClick) => (
    <Menu.Item>
      <Accordion.Title active={isActive} onClick={onTitleClick}>
        <Icon name="dropdown" />
        {title}
      </Accordion.Title>
      <Accordion.Content active={isActive}>
        <List link>
          {listItems.map((item, index) => (
            <List.Item as="a" key={index} onClick={onListItemClick(item)}>
              {item}
            </List.Item>
          ))}
        </List>
      </Accordion.Content>
    </Menu.Item>
  );

  render() {
    const { isShowCategories, isShowIndustries, isShowSalary } = this.state;
    const { handleAddFilterKeyword } = this.props;

    return (
      <Accordion as={Menu} vertical exclusive={false}>
        {this.accordionList(
          'CATEGORIES',
          CATEGORIES,
          isShowCategories,
          this.toggleCategories,
          handleAddFilterKeyword,
        )}
        {this.accordionList(
          'INDUSTRIES',
          INDUSTRIES,
          isShowIndustries,
          this.toggleIndustries,
          handleAddFilterKeyword,
        )}
        <Menu.Item>
          <Accordion.Title active={isShowSalary} onClick={this.toggleSalary}>
            <Icon name="dropdown" />
            MINIMUM SALARY
          </Accordion.Title>
          <Accordion.Content active={isShowSalary}>
            <Input fluid type="text" labelPosition="left" actionPosition="right">
              <Label basic>$</Label>
              <input
                ref={(input) => {
                  this.inputSalary = input;
                }}
              />
              <Button content="Go" onClick={this.handleAddMinSalary} />
            </Input>
          </Accordion.Content>
        </Menu.Item>
      </Accordion>
    );
  }
}

FilterMenu.propTypes = propTypes;

export default FilterMenu;
