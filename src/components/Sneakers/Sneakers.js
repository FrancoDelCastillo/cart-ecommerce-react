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
            <Row xs={1} sm={2} md={3} lg={4} xl={5}>
                {loading || !sneakersList ? <SpinnerLoading/> : sneakersList.map((sneaker, index)=>{
                    return <Sneaker key={index} sneaker={sneaker} addSneakerInCart={addSneakerInCart}/>})}
            </Row>
        </Container>
        
    )
}