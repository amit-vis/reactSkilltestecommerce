import { Button, Container,Image, Table } from "react-bootstrap";
import './Details.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchDataFromFirebase, productSelector } from "../../Redux/Reducer/ShowProductReducer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addNewDataintoCart } from "../../Redux/Reducer/cartItemsReducer";


export function Details(){
  const Items = useSelector(productSelector);
  const dispatch = useDispatch();
  const {id} = useParams()
  useEffect(()=>{
    dispatch(fetchDataFromFirebase())
  },[dispatch])

  const findData = Items.find((item)=>item.id === id)

  const handleAddTocart = (addItems)=>{
    dispatch(addNewDataintoCart(addItems))
  }
    
  if(!findData || findData.length===0){
    return(
      <div>Loading</div>
    )
  }
    return(
        <>
        <Container className="details-conatiner mt-2 w-50">
            <Image src={findData.imgUrl} alt="details-img" 
            width={400} height={200} className="details-img mt-2" rounded/>
        <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th colSpan="2">Item Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Item Id</td>
          <td>{findData.id}</td>
        </tr>
        <tr>
          <td>Title</td>
          <td>{findData.title}</td>
        </tr>
        <tr>
          <td>description</td>
          <td>{findData.description}</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>Rs {findData.price}</td>
        </tr>
        <tr>
          <td>Rtings</td>
          <td>{findData.ratings}</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Button onClick={()=>handleAddTocart(findData)} className="bg-success">Add To Cart</Button>
          </td>
        </tr>
      </tbody>
    </Table>
        </Container>
        
        </>
    )
}