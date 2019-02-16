import React from 'react';
import { Grid } from 'semantic-ui-react';
import { array, func } from 'prop-types';
import FilterMenu from './FilterMenu';
import ResultsTable from './ResultsTable';
import SelectedFiltersBar from './SelectedFiltersBar';

const propTypes = {
  selectedCategories: array.isRequired,
  selectedIndustries: array.isRequired,
  handleAddCategory: func.isRequired,
  handleAddIndustry: func.isRequired,
  handleRemoveCategory: func.isRequired,
  handleRemoveIndustry: func.isRequired,
};

const JobsContent = ({
  selectedCategories,
  selectedIndustries,
  handleAddCategory,
  handleAddIndustry,
  handleRemoveCategory,
  handleRemoveIndustry,
}) => (
  <Grid padded>
    <SelectedFiltersBar
      selectedCategories={selectedCategories}
      selectedIndustries={selectedIndustries}
      handleRemoveCategory={handleRemoveCategory}
      handleRemoveIndustry={handleRemoveIndustry}
    />
    <Grid.Row>
      <Grid.Column width={3}>
        <FilterMenu handleAddCategory={handleAddCategory} handleAddIndustry={handleAddIndustry} />
      </Grid.Column>
      <Grid.Column width={13}>
        <ResultsTable />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

JobsContent.propTypes = propTypes;

export default JobsContent;
