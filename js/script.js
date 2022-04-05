function createButton(className, text) {
  let button = document.createElement('button');
  button.setAttribute('class', className);

  let textNode = document.createTextNode(text);
  button.appendChild(textNode);

  return button;
}

function setAttributes(element, mapAttributes) {
  for (let attribute of mapAttributes) {
    element.setAttribute(attribute[0], attribute[1]);
  }
}

function addTaskToList(event) {
  // Change type from submit at the object with id = new-task-submit
  event.preventDefault()
  const taskText = document.getElementById('new-task-input').value;
  if (taskText) {
    const countAllTask = document.getElementById('tasks').childElementCount;
    let element = document.createElement('div');
    let taskId = `task-${countAllTask + 1}`;
    element.setAttribute('class', 'task');
    element.setAttribute('id', taskId);
    console.log(element);


    // Create element with class content.
    let contentElement = document.createElement('div');
    let inputElement = document.createElement('input');
    setAttributes(
        inputElement,
        new Map([['type', 'text'], ['class', 'text'], ['value', taskText]]));
    inputElement.readOnly = true;
    contentElement.appendChild(inputElement);
    console.log(contentElement);

    // Create element with class actions.
    let actionsElement = document.createElement('div');
    actionsElement.setAttribute('class', 'actions');
    let editButton = createButton('edit', 'Редактировать');
    let deleteButton = createButton('delete', 'Удалить');
    editButton.addEventListener('click', function(event) {
      inputElement.readOnly = false;
      inputElement.contentEditable = true;
    })
    deleteButton.addEventListener("click", function(event) {
      let itemToDelete = document.getElementById(taskId)
      itemToDelete.parentNode.removeChild(itemToDelete)
    })

    actionsElement.appendChild(editButton);
    actionsElement.appendChild(deleteButton);
    console.log(actionsElement);

    // Add contentElement and actionsElement to element. Then add element to
    // task-list.
    element.appendChild(contentElement);
    element.appendChild(actionsElement);
    document.getElementById('tasks').appendChild(element)
    console.log(element)
  }
  return false;
}

document.getElementById('new-task-submit')
    .addEventListener('click', addTaskToList)
