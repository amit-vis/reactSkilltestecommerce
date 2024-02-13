import { useEffect, useState } from "react";
import { Button, Form, Container} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  addProductDataThunk} from "../../Redux/Reducer/addProductReducer";
import { fetchDataFromFirebase } from "../../Redux/Reducer/ShowProductReducer";


export function AddProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [itemText, setItemText] = useState({
        title: "", 
        description: "",
        price: Number(0),
        ratings: Number(0),
        imgUrl: ""
    })

    useEffect(()=>{
        dispatch(fetchDataFromFirebase())
    },[dispatch])

    const handleSubmitData = async (e)=>{
        e.preventDefault();
        dispatch(addProductDataThunk(itemText))

        navigate('/')
    }
    
    return (
        <>
        <Container className="w-50 mt-4 pt-2 pb-2 bg-secondary text-light" style={{border: "2px solid gray", textAlign:"center"}}>
            <Form onSubmit={handleSubmitData}>
                    <Form.Group className="mb-3" controlId="formGridTitle">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter Product Title"
                        value={itemText.title}
                        onChange={(e)=>setItemText({...itemText, title: e.target.value})} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridDescription">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Product Description"
                        value={itemText.description}
                        onChange={(e)=>setItemText({...itemText, description: e.target.value})} 
                        />
                    </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPrice">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Enter Price"
                    value={itemText.price}
                    onChange={(e)=>setItemText({...itemText, price: e.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridRating">
                    <Form.Label>Product Rating</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Rate the Product"
                    value={itemText.ratings}
                    onChange={(e)=>setItemText({...itemText, ratings: e.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridRating">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Image Url"
                    value={itemText.imgUrl}
                    onChange={(e)=>setItemText({...itemText, imgUrl: e.target.value})} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Container>
        </>
    )
}