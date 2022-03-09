import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

import "./Sneaker.scss"

export default function Sneaker(props){
    const { sneaker: {id, name, retailPrice, gender, media}, addSneakerInCart } = props;

    const sneakerID = id;
    const unitPrice = retailPrice;


    return(
        <Col className="sneaker-col">
        <Card>
            <Card.Img src={media.imageUrl} />
            <Card.Body>
                <div className="details-wrapper">
                <Card.Title>{name}</Card.Title>
                <Card.Text>Gender: {gender}</Card.Text>
                { retailPrice >0 ?<Card.Text>Price: ${retailPrice}.00</Card.Text> :
                <Card.Text>Price: $100.00</Card.Text> }
                </div>
                <Button className="button-add-cart" onClick={()=>{addSneakerInCart(sneakerID, unitPrice)}}>Add to cart</Button>
            </Card.Body>
        </Card>
        
        </Col>

    )
}