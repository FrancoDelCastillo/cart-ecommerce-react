import { useEffect, useState } from 'react';

import MenuTop from './components/MenuTop';
import Sneakers from './components/Sneakers';

import useFetch from './hooks/useFetch';
import {SNEAKERS_STORAGE} from './utils/constants'
import {ToastContainer, toast} from "react-toastify"

function App() {

  const sneakersResponse = useFetch("https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=10&page=1&brand=nike", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
      "x-rapidapi-key": "c1a621d017msh838a63b5ab9074fp11670bjsnbef27e16329f"}
  })

  // cart list state
  const [ cartList, setCartList] = useState([]);

  let sneakersAdded = []

  // to add sneaker id into localStorage and refresh cart list state
  const addSneakerInCart = (id, price)=>{

    let sneaker = {};
    sneakersAdded = cartList;

    if(sneakersAdded){
      for(let i = 0; i < sneakersAdded.length; i++){
        if(sneakersAdded[i].hasOwnProperty(id)){
          sneakersAdded[i][id].quantity += 1;
          localStorage.setItem(SNEAKERS_STORAGE, JSON.stringify(sneakersAdded));
          toast.success("Product added to cart successfully")
          getCartList();
          return;}
      }
    }
    
    sneaker[id] = {quantity:1, unitPrice: price};
    sneakersAdded.push(sneaker)
    localStorage.setItem(SNEAKERS_STORAGE, JSON.stringify(sneakersAdded));
    toast.success("Product added to cart successfully")
    getCartList();
  };


  // to store latest data from localStorage into cart list state
  const getCartList = ()=>{
    const dataStored = JSON.parse(localStorage.getItem(SNEAKERS_STORAGE));
    if(dataStored !== null || dataStored === ''){
      setCartList(dataStored)
    }else{
      setCartList([]);
    }    
  }

  useEffect(()=>{
    getCartList();
  },[])
  

  return (
    <div>
      <MenuTop cartList={cartList} addSneakerInCart={addSneakerInCart} getCartList={getCartList} sneakersResponse={sneakersResponse}/>
      <Sneakers sneakersResponse={sneakersResponse} addSneakerInCart={addSneakerInCart} />
      <ToastContainer style={{position:'fixed'}} position='top-left' hideProgressBar={true} autoClose={1000}

/>
    </div>
  );
}

export default App;
