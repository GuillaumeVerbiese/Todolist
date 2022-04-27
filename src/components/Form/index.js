// == Import : npm
import PropTypes from 'prop-types';

// == Import : local
import './form.scss';

// == Composant
function Form({ inputTaskLabel, setValue, addTask }) {
  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        console.log('onSubmit is fired');
        addTask();
      }}
    >
      <input
        type="text"
        className="form-item"
        placeholder="Ajouter une tâche"
        value={inputTaskLabel}
        onChange={(event) => {
          console.log(`entrée utilisateur : ${event.target.value}`);
          setValue(event.target.value);
        }}
      />
    </form>
  );
}

Form.propTypes = {
  inputTaskLabel: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};

// == Export
export default Form;
