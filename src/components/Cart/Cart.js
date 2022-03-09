import { useState, useEffect } from "react"

import { countDuplicateItem, removeItem } from "../../utils/arrayFunc"
import { SNEAKERS_STORAGE } from "../../utils/constants"

import Button from "react-bootstrap/Button"

import {ReactComponent as CartIcon} from "../../assets/svg/cart-icon.svg"
import {ReactComponent as CartFullIcon} from "../../assets/svg/cart-full-icon.svg"
import {ReactComponent as Close} from "../../assets/svg/close-icon.svg"
import {ReactComponent as Trash} from "../../assets/svg/trash-icon.svg" 

import "./Cart.scss"

export default function Cart(props){

    const {cartList, addSneakerInCart, getCartList, sneakersResponse} = props;

    const [ singleProducts, setSingleProducts ] = useState([]);

    const [ totalPrice, setTotalPrice ] = useState(0);

    // get total amount
    useEffect(()=>{
        let totalAmount = 0;
        if(cartList.length > 0){
        cartList.forEach((sneaker)=>{
            let id_sneaker = Object.keys(sneaker)[0]
            let quantity = sneaker[id_sneaker].quantity
            let unitPrice = (sneaker[id_sneaker].unitPrice || 100)
            totalAmount += quantity * unitPrice
            setTotalPrice(totalAmount)
        })} else{
            setTotalPrice(0)
        }
    },[cartList])

    // get single ids from cartList
    useEffect(()=>{
        const cartSingleItems = []
        cartList.forEach((sneaker)=>{
            let id_sneaker = Object.keys(sneaker)[0]
            cartSingleItems.push(id_sneaker)})
        setSingleProducts(cartSingleItems)
    },[cartList])

    // cart menu state
    const [isCartOpen, setIsCartOpen ] = useState(false);

    // to open cart
    const openCart = ()=>{
        setIsCartOpen(true);
        // user can't scroll page when cart is open
       document.body.style.overflowY = 'hidden';
    }

    // to close cart
    const closeCart = ()=>{
        setIsCartOpen(false);
        document.body.style.overflowY = 'visible';
    }

    const cartStyle = isCartOpen ? 'cart-content open' : 'cart-content';

    // to empty cart list
    const emptyCart =()=>{
        localStorage.removeItem(SNEAKERS_STORAGE);
        setTotalPrice(0)
        // to refresh cart list state after delete an item
        getCartList();
    }

    // to decrease sneaker in cart
    const decreaseSneaker = (id)=>{
        const latestCartList = removeItem(cartList, id);        
        localStorage.setItem(SNEAKERS_STORAGE,JSON.stringify(latestCartList));
        getCartList();
    }


    return(
    <>
        <Button variant="link" className="button-cart" onClick={openCart}>
            {cartList.length > 0 ?<CartFullIcon/>:<CartIcon/>}
        </Button>
        <div className={cartStyle}>
            <div className="cart-wrapper">
            <CartHeader closeCart={closeCart} emptyCart={emptyCart}/>
            {singleProducts.map((id, index)=>{return(
            <CartContent key={index} id={id} cartList={cartList} addSneakerInCart={addSneakerInCart} decreaseSneaker={decreaseSneaker} sneakersResponse={sneakersResponse}/>
            )})}
            </div>
            {totalPrice > 0? <CartFooter totalPrice={totalPrice} /> : null}
            
        </div>
    </>
    )
}

// cart header component
function CartHeader(props){
    const {closeCart, emptyCart} = props;
    return(
        <div className="cart-content__header">
            
                <Button variant="link" onClick={closeCart}>
                    <Close/>
                </Button>
            
            
                <Button variant="link" onClick={emptyCart}>
                    Empty cart
                    <Trash/>
                </Button>
            

        </div>
    )
}

// cart content component
function CartContent(props){
    const {id, cartList, addSneakerInCart, decreaseSneaker, sneakersResponse:{loading, result}} = props;

    let sneakersList;

    if(result){
        sneakersList = result.results;
    }

    if(!loading && sneakersList){
        return sneakersList.map((sneaker, index)=>{
            if(id === sneaker.id){
                const quantity = countDuplicateItem(cartList, id);
                return (
                <RenderSneakerInCart key={index} addSneakerInCart={addSneakerInCart} decreaseSneaker={decreaseSneaker} quantity={quantity} sneaker={sneaker} />
                )
            }
            return null;
        })
    }
    return null;
}

function RenderSneakerInCart(props){
    const {quantity, addSneakerInCart, decreaseSneaker, sneaker: {id, name, retailPrice, media}} = props;
    return(
        <div className="render-sneaker__container">
            <div>
                <img src={media.imageUrl} alt={name}  />
            </div>
            <div className="render-sneaker__container__details">
                <h6 >{name}</h6>
                <div>Quantity: {quantity}</div>
                {retailPrice > 0 ?<div>total Price: ${quantity * retailPrice}.00</div>:
                <div>total Price: ${quantity * 100}.00</div>}
                
                <Button onClick={()=>{addSneakerInCart(id)}}>+</Button>
                <Button onClick={()=>{decreaseSneaker(id)}}>-</Button>
            </div>
        </div>
    )
}

function CartFooter(props){
    const { totalPrice } = props;

    return(<div className="cart-footer">
        <div>
            <h3>Total price: $ {totalPrice}.00</h3>
        </div>
        <Button>Pay now</Button>
    </div>)
}