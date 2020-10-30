import {createStore} from "redux";

const plus = document.getElementById("plus")
const minus = document.getElementById("minus")
const number = document.querySelector("span")

const countModifier =(state= 0, action) =>{
  if (action.type === "plus"){
    return state +1
  }else if(action.type === "minus") {
    return state -1
  }else{
    return state 
  }
}

const countStore = createStore(countModifier)

const onChange = () =>{
  number.innerText = countStore.getState()
}

countStore.subscribe(onChange)


plus.addEventListener("click", ()=> countStore.dispatch({type:"plus"}))
minus.addEventListener("click", () => countStore.dispatch({type:"minus"}))