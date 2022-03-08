import SpinnerLoading from "../SpinnerLoading";
import Sneaker from "../Sneaker";

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

import "./Sneakers.scss"

export default function Sneakers(props){

    const{sneakersResponse:{loading, result}, addSneakerInCart} = props;

    let sneakersList;

    if(result){
        sneakersList = result.results
    }

    

    return(
        <Container className="sneakers-container">
            <Row md={3} lg={4}>
                {loading || !sneakersList ? <SpinnerLoading/> : sneakersList.map((sneaker, index)=>{
                    return <Sneaker key={index} sneaker={sneaker} addSneakerInCart={addSneakerInCart}/>})}
            </Row>
        </Container>
        
    )
}