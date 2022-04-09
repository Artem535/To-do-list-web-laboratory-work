/**
 * Creates button with specify className and text.
 * @param {String} className Button class.
 * @param {String} text Button text.
 * @returns Button.
 */
function createButton(className, text) {
  let button = document.createElement('button');
  button.setAttribute('class', className);

  let textNode = document.createTextNode(text);
  button.appendChild(textNode);

  return button;
}

/**
 * Changes text in button.
 * @param {HTMLDivElement} button Wich button need change text.
 * @param {String} newText New text for button.
 */
function changeTextButton(button, newText) {
  button.textContent = newText;
}

/**
 * Creates edit button and adds event listener to this button.
 * @param {HTMLDivElement} inputElement Wich element need edit, when button
 *     push.
 * @returns Button.
 */
function createEditButton(inputElement) {
  // Create button and add EventListener.
  let editButton = createButton('edit', 'Редактировать');
  editButton.addEventListener('click', function(event) {
    let editState = (inputElement.contentEditable == 'false') ? false : true;
    let readOnlyState = inputElement.readOnly;
    let nextTextButton = (editState) ? 'Редактировать' : 'Сохранить';

    inputElement.readOnly = !readOnlyState;
    inputElement.contentEditable = !editState;
    inputElement.focus();
    let taskId = inputElement.parentElement.parentElement.id;
    updateTextTaskLS(taskId, inputElement.value)
    changeTextButton(editButton, nextTextButton);
  })

  return editButton;
}

/**
 * Creates delete button and adds event listener to this button.
 * @param {HTMLDivElement} itemToDelete Wich element need delete, when button
 *     push.
 * @returns Buttons
 */
function createDeleteButton(itemToDelete) {
  let deleteButton = createButton('delete', 'Удалить');
  deleteButton.addEventListener('click', function(event) {
    removeTaskFromLS(itemToDelete.id);
    itemToDelete.parentNode.removeChild(itemToDelete);
  })
  return deleteButton;
}

/**
 * Function set attributes from mapAttributes to element.
 * @param {HTMLDivElement} element Which element should the attributes be
 *     applied to.
 * @param {Map<String, String>} mapAttributes Map attributes. Key is name
 *     attribute, value is value Attribute.
 */
function setAttributes(element, mapAttributes) {
  for (let attribute of mapAttributes) {
    element.setAttribute(attribute[0], attribute[1]);
  }
}

/**
 * Function find max id in taskId and return it.
 * @returns Max id.
 */
function findMaxTaskId() {
  let tasksElements = document.getElementById('tasks').childNodes;
  let maxTaskId = 0
  for (let i = 0; i < tasksElements.length; i++) {
    let id = String(tasksElements[i].id).split('-')[1];
    id = Number(id);
    if (id > maxTaskId) maxTaskId = id;
  }
  return maxTaskId;
}

/**
 * Adds task to local storage.
 * If task exists, text this task will be rewrite.
 * @param {String} taskId
 * @param {String} taskText
 */
function addTaskToLS(taskId, taskText) {
  localStorage.setItem(taskId, taskText);
}

/**
 * Removes task from local storage.
 * @param {String} taskId
 */
function removeTaskFromLS(taskId) {
  let task = localStorage.getItem(taskId)
  if (task != null)
    localStorage.removeItem(taskId);
}

/**
 *
 * @param {String} taskId
 * @param {String} text
 */
function updateTextTaskLS(taskId, text) {
  let task = localStorage.getItem(taskId);
  if (task != null) 
    localStorage[taskId] = text;
}

/**
 * Reads tasks from local storage and adds it to task-list.
 */
function updateTaskFromLS(event) {
  for (let i = 0; i < localStorage.length; i++) {
    // Get data from local storage.
    let taskId = localStorage.key(i);
    let taskText = localStorage.getItem(taskId);
    // Add task to task list.
    addTaskToList(taskId, taskText);
  }
}

/**
 * Adds task with specify id and text to task list.
 * @param {String} taskId
 * @param {String} taskText
 */
function addTaskToList(taskId, taskText) {
  if (taskId != null && taskText != null) {
    let element = document.createElement('div');
    element.setAttribute('class', 'task');
    element.setAttribute('id', taskId);
    console.log(element);

    // Create element with class content.
    let contentElement = document.createElement('div');
    let inputElement = document.createElement('input');
    setAttributes(inputElement, new Map([
                    ['type', 'text'], ['class', 'text'], ['value', taskText],
                    ['contentEditable', 'false'], ['readOnly', 'true']
                  ]));
    contentElement.appendChild(inputElement);
    console.log(contentElement);

    // Create element with class actions.
    let actionsElement = document.createElement('div');
    actionsElement.setAttribute('class', 'actions');
    actionsElement.appendChild(createEditButton(inputElement));
    actionsElement.appendChild(createDeleteButton(element));
    console.log(actionsElement);

    // Add contentElement and actionsElement to element. Then add element to
    // task-list.
    element.appendChild(contentElement);
    element.appendChild(actionsElement);
    document.getElementById('tasks').appendChild(element);
    console.log(element);
  }
}

/**
 * Creates new task with text from `new-task-input` and adds it to task list.
 * @param {*} event
 * @returns
 */
function addTaskToListEvent(event) {
  // Change type from submit at the object with id = new-task-submit
  event.preventDefault()
  const taskText = document.getElementById('new-task-input').value;
  if (taskText) {
    let taskId = `task-${findMaxTaskId() + 1}`;
    addTaskToList(taskId, taskText)
    addTaskToLS(taskId, taskText);
  }
  return false;
}


document.getElementById('new-task-submit')
    .addEventListener('click', addTaskToListEvent);
document.addEventListener('DOMContentLoaded', updateTaskFromLS);
