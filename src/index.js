import { createStore } from "redux";

const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul")

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE TODO"

const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  }
}

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
}

const store = createStore(reducer);

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text))
}

const dispatchDeleteToDo = (event) => {
  const id = parseInt(event.target.parentNode.id)
  store.dispatch(deleteToDo(id))
}

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button")
    btn.innerText = "DEL"
    btn.addEventListener("click", dispatchDeleteToDo)
    li.id = toDo.id
    li.innerText = toDo.text;
    ul.appendChild(li)
    li.appendChild(btn)
  })
}

store.subscribe(paintToDos)

const onSubmit = event => {
  event.preventDefault();
  const toDo = input.value
  input.value = "";
  dispatchAddToDo(toDo);
}

form.addEventListener("submit", onSubmit)