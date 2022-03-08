import "./SpinnerLoading.scss"
import Spinner from "react-bootstrap/Spinner"

export default function SpinnerLoading(){
    return(
        <div className="spinner-loading">
        <Spinner animation="border" role="status">
            
        </Spinner>
        <span>Loading...</span>    
        </div>
    )
}