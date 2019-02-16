import React from 'react';
import { Button, Dropdown, Grid, Header, Icon } from 'semantic-ui-react';
import { array, func, number } from 'prop-types';

const SORT_BY_OPTIONS = [
  {
    text: 'Deadline',
    value: 'Deadline',
  },
];

const PER_PAGE_OPTIONS = [
  {
    text: '25',
    value: 25,
  },
  {
    text: '50',
    value: 50,
  },
  {
    text: '100',
    value: 100,
  },
];

const propTypes = {
  selectedCategories: array.isRequired,
  selectedIndustries: array.isRequired,
  minSalary: number.isRequired,
  handleRemoveCategory: func.isRequired,
  handleRemoveIndustry: func.isRequired,
  handleRemoveMinSalary: func.isRequired,
  handleClearFilters: func.isRequired,
};

const SelectedFiltersBar = ({
  selectedCategories,
  selectedIndustries,
  minSalary,
  handleRemoveCategory,
  handleRemoveIndustry,
  handleRemoveMinSalary,
  handleClearFilters,
}) => (
  <Grid.Row>
    <Grid.Column width={3} />
    <Grid.Column width={2}>
      <Header size="large">Search results</Header>
    </Grid.Column>
    <Grid.Column width={7}>
      {[...selectedCategories].map((category, index) => (
        <Button icon key={index} onClick={handleRemoveCategory(category)}>
          {category} <Icon name="close" />
        </Button>
      ))}
      {[...selectedIndustries].map((industry, index) => (
        <Button icon key={index} onClick={handleRemoveIndustry(industry)}>
          {industry} <Icon name="close" />
        </Button>
      ))}
      {minSalary > 0 && (
        <Button icon onClick={handleRemoveMinSalary}>
          {minSalary} <Icon name="close" />
        </Button>
      )}
      {(minSalary > 0 || selectedCategories.length > 0 || selectedIndustries.length > 0) && (
        <Button primary icon onClick={handleClearFilters}>
          Clear <Icon name="close" />
        </Button>
      )}
    </Grid.Column>
    <Grid.Column width={2}>
      Sort by
      <Dropdown fluid selection options={SORT_BY_OPTIONS} defaultValue={SORT_BY_OPTIONS[0].value} />
    </Grid.Column>
    <Grid.Column width={1}>
      Per page
      <Dropdown
        fluid
        selection
        options={PER_PAGE_OPTIONS}
        defaultValue={PER_PAGE_OPTIONS[0].value}
      />
    </Grid.Column>
    <Grid.Column width={1} />
  </Grid.Row>
);

SelectedFiltersBar.propTypes = propTypes;

export default SelectedFiltersBar;
