// == Import : npm
import PropTypes from 'prop-types';

// == Import : local
import './tasks.scss';

// == Composant
function Tasks({ tasks, onDoneChange }) {
  /*
  Pour lier un label a son input, en HTML classique on utilise les attributs "for" et "id"
  En JSX, on va utiliser les attributs "htmlFor" et "id"
  https://fr.reactjs.org/docs/dom-elements.html#htmlfor
  */

  // gestionnaire d'évènement de la modification de nos input
  // checkbox
  function handleDoneChange(id) {
    console.log(`ça devrait changer la tache d'id ${id}`);

    onDoneChange(id);
  }

  return (
    <ul className="list">

      {tasks.map((item) => {
        // On part du tableau initial tasks pour en construire un nouveau
        // Ce nouveau tableau va contenir autant d'éléments
        // présents dans le tableau initial.
        // Chaque éléments sera un <li>

        // On construit la classe css du label de l'item courant
        // en fonction de l'état de la tâche (done à true ou false)
        let cssClass = 'list-item';
        if (item.done) {
          cssClass += ' list-item--done';
        }

        // On construit l'attribut id de l'input
        // en se basant sur la propriété id de l'item courant
        // On fait attention à préfixer l'id,
        // on évite ainsi des conflits d'id
        const idItem = `task-${item.id}`;

        return (
          <li key={idItem}>
            <label htmlFor={idItem} className={cssClass}>
              <input
                id={idItem}
                type="checkbox"
                checked={item.done}
                onChange={() => {
                  handleDoneChange(item.id);
                }}
              />
              {item.label}
            </label>
          </li>
        );
      })}

    </ul>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  onDoneChange: PropTypes.func.isRequired,
};

// == Export
export default Tasks;
