import React from 'react';
import { Grid } from 'semantic-ui-react';
import { array, func, number } from 'prop-types';
import FilterMenu from './FilterMenu';
import ResultsTable from './ResultsTable';
import SelectedFiltersBar from './SelectedFiltersBar';

const propTypes = {
  selectedCategories: array.isRequired,
  selectedIndustries: array.isRequired,
  minSalary: number.isRequired,
  handleAddCategory: func.isRequired,
  handleAddIndustry: func.isRequired,
  handleRemoveCategory: func.isRequired,
  handleRemoveIndustry: func.isRequired,
  handleAddMinSalary: func.isRequired,
  handleRemoveMinSalary: func.isRequired,
  handleClearFilters: func.isRequired,
};

const JobsContent = ({
  selectedCategories,
  selectedIndustries,
  minSalary,
  handleAddCategory,
  handleAddIndustry,
  handleRemoveCategory,
  handleRemoveIndustry,
  handleAddMinSalary,
  handleRemoveMinSalary,
  handleClearFilters,
}) => (
  <Grid padded>
    <SelectedFiltersBar
      selectedCategories={selectedCategories}
      selectedIndustries={selectedIndustries}
      minSalary={minSalary}
      handleRemoveCategory={handleRemoveCategory}
      handleRemoveIndustry={handleRemoveIndustry}
      handleRemoveMinSalary={handleRemoveMinSalary}
      handleClearFilters={handleClearFilters}
    />
    <Grid.Row>
      <Grid.Column width={3}>
        <FilterMenu
          handleAddCategory={handleAddCategory}
          handleAddIndustry={handleAddIndustry}
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
