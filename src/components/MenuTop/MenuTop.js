import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"


import Cart from "../Cart"
import { ReactComponent as Logo } from "../../assets/svg/ni-white-logo.svg"

import "./MenuTop.scss"


export default function MenuTop(props){

    const {cartList, addSneakerInCart, getCartList, sneakersResponse} = props;
    
    return(
        <Navbar className="menutop-navbar">
            <Container>
                
                <NavBrand/>
                <div className="menutop-navbar__items-cart">
                <Cart cartList={cartList} addSneakerInCart={addSneakerInCart} getCartList={getCartList} sneakersResponse={sneakersResponse}/>
                </div>
            </Container>
        </Navbar>
    )
}

function NavBrand(){
    return(
    <Navbar.Brand className="menutop-navbrand">
        <h2>Just buy it</h2>
        <Logo className="navbrand-logo"/>
    </Navbar.Brand>
    )
}

