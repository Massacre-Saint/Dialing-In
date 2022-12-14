import React from 'react';
import PropTypes from 'prop-types';
import CreateNameModal from '../../modal/CreateNameModal';

export default function CreateNameCard({ recipeObj, onUpdate }) {
  return (
    <CreateNameModal onUpdate={onUpdate} recipeObj={recipeObj} />
  );
}
CreateNameCard.propTypes = {
  recipeObj: PropTypes.shape({
    RecipeName: PropTypes.number,
  }),
  onUpdate: PropTypes.func,
};
CreateNameCard.defaultProps = {
  recipeObj: PropTypes.shape({
    recipeName: 205,
  }),
  onUpdate: () => {},

};
