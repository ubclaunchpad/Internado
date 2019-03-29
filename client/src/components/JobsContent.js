import React from 'react';
import { Grid } from 'semantic-ui-react';
import { array, func, number } from 'prop-types';
import FilterMenu from './FilterMenu';
import ResultsTable from './ResultsTable';
import SelectedFiltersBar from './SelectedFiltersBar';

const propTypes = {
  filterKeywords: array.isRequired,
  handleAddFilterKeyword: func.isRequired,
  handleRemoveFilterKeyword: func.isRequired,
  minSalary: number.isRequired,
  handleAddMinSalary: func.isRequired,
  handleRemoveMinSalary: func.isRequired,
  handleClearFilters: func.isRequired,
};

const JobsContent = ({
  filterKeywords,
  handleAddFilterKeyword,
  handleRemoveFilterKeyword,
  minSalary,
  handleAddMinSalary,
  handleRemoveMinSalary,
  handleClearFilters,
}) => (
  <Grid padded>
    <SelectedFiltersBar
      filterKeywords={filterKeywords}
      handleRemoveFilterKeyword={handleRemoveFilterKeyword}
      minSalary={minSalary}
      handleRemoveMinSalary={handleRemoveMinSalary}
      handleClearFilters={handleClearFilters}
    />
    <Grid.Row>
      <Grid.Column width={3}>
        <FilterMenu
          handleAddFilterKeyword={handleAddFilterKeyword}
          handleAddMinSalary={handleAddMinSalary}
        />
      </Grid.Column>
      <Grid.Column width={12}>
        <ResultsTable />
      </Grid.Column>
      <Grid.Column width={1}/>
    </Grid.Row>
  </Grid>
);

JobsContent.propTypes = propTypes;

export default JobsContent;
