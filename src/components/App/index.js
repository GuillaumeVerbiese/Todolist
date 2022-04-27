// == Import : npm
import React from 'react';

// == Import : local
import tasksList from 'src/data/tasks';
import Form from '../Form';
import Counter from '../Counter';
import Tasks from '../Tasks';
import './app.scss';

// == Composant
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleTaskDone = this.toggleTaskDone.bind(this);
    this.state = {
      tasks: tasksList,
      inputTaskLabel: '',
    };
  }

  handleInputChange(newValue) {
    // Pour modifier une valeur dans le state, on est obligé d'utiliser la fonction setState
    // Cette fonction va faire 2 choses :
    // - Mettre à jour le state
    // - Recalculer le composant en se basant sur le nouveau state
    this.setState({
      inputTaskLabel: newValue,
    });
  }

  // Fonction dont le rôle est de rajouter une tâche dans le tableau du state
  handleFormSubmit() {
    const { inputTaskLabel, tasks } = this.state;

    // Il va falloir calculer l'id de la nouvelle tâche
    // - Créer un nouveau tableau contenant les ids de toutes nos tâches
    const idsTask = tasks.map((item) => item.id);
    // - Trouver l'id le plus haut
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/max
    // On utilise le spread opérator afin de dévérser chaque valeurs comme argument
    // à la méthode Math.max()
    const idMax = Math.max(...idsTask);
    // - L'incrémenter pour avoir le nouvel id
    const newId = idMax + 1;

    // Construire la nouvelle tâche
    const newTask = {
      id: newId,
      done: false,
      label: inputTaskLabel,
    };

    // Rajouter la tâche au state
    // - Créer une copie du tableau
    const tasksCopy = [...tasks];

    // - Modifie cette copie en lui rajoutant la nouvelle tâche
    tasksCopy.push(newTask);
    // tasks.push(newTask);

    // - On envoie au nouveau state, la copie du tableau qui contient la nouvelle tâche
    this.setState({
      tasks: tasksCopy,
      inputTaskLabel: '',
    });
    // => Comme ça, React mettra a jour correctement l'UI lors de sa phase de reconscilliation
  }

  // on récupère en paramètre l'id de la tache à modifier
  toggleTaskDone(taskId) {
    console.log(`on m'a appelé ? je vais changer la prop done de la tache ${taskId}`);

    // on extrait la liste courante des taches du state
    const { tasks } = this.state;

    // on crée une copie de la liste des tâches sur laquelle on va modifier
    // seulement la tache d'id taskId

    const newTasks = tasks.map(
      (task) => {
        // pour toutes les taches que je ne veux pas modifier, on renvoie
        // la tache telle quelle
        if (task.id !== taskId) {
          return task;
        }
        // en revanche, si c'est la tache qui nous intéresse
        // on en fait une copie et on inverse la valeur de la propriété done
        return {
          ...task,
          done: !task.done,
        };
      },
    );

    // on va placer la liste de tache modifiée dans le state
    this.setState({ tasks: newTasks });
  }

  render() {
    // On recup la liste des tâches depuis notre state cette fois ci
    const { tasks, inputTaskLabel } = this.state;

    // On calcul le nb de tâches non réalisées
    // On se base sur la liste de tâches qu'on a recup depuis le state
    const notDoneTasks = tasks.filter((item) => item.done === false);
    const nbTasksNotDone = notDoneTasks.length;

    // on a déjà filtrer les taches bot done
    // on fait de même pour les tâches done
    const doneTasks = tasks.filter((item) => item.done === true);

    // on prépare la liste qui sera confiée au composant Tasks pour affichage
    // en mettant bout à bout les éléments des 2 tableaux.
    const orderedTasks = [...notDoneTasks, ...doneTasks];

    return (
      <div className="app">
        <Form
          inputTaskLabel={inputTaskLabel}
          setValue={this.handleInputChange}
          addTask={this.handleFormSubmit}
        />
        <Counter nbTasks={nbTasksNotDone} />
        <Tasks tasks={orderedTasks} onDoneChange={this.toggleTaskDone} />
      </div>
    );
  }
}

// == Export
export default App;
