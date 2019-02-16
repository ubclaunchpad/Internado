import React, { Component } from 'react';
import { Accordion, Icon, List, Menu } from 'semantic-ui-react';
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
  handleAddCategory: func.isRequired,
  handleAddIndustry: func.isRequired,
};

class FilterMenu extends Component {
  state = {
    isShowCategories: false,
    isShowIndustries: false,
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

  renderAccordionItem = (title, listItems, isActive, onTitleClick, onListItemClick) => (
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
    const { isShowCategories, isShowIndustries } = this.state;
    const { handleAddCategory, handleAddIndustry } = this.props;

    return (
      <Accordion as={Menu} vertical exclusive={false}>
        {this.renderAccordionItem(
          'CATEGORIES',
          CATEGORIES,
          isShowCategories,
          this.toggleCategories,
          handleAddCategory,
        )}
        {this.renderAccordionItem(
          'INDUSTRIES',
          INDUSTRIES,
          isShowIndustries,
          this.toggleIndustries,
          handleAddIndustry,
        )}
      </Accordion>
    );
  }
}

FilterMenu.propTypes = propTypes;

export default FilterMenu;
