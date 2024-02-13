import { useEffect, useState } from "react"
import { actions, deleteProduct, editProduct, 
    fetchDataFromFirebase, 
    getProductData, 
    productSelector
 } from "../../Redux/Reducer/ShowProductReducer"
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, ListGroup, Image, Button, Nav } from "react-bootstrap";
import { FaStar } from 'react-icons/fa';
import "./ShowProductList.css";
import { addNewDataintoCart, fetchDataFromCart} from "../../Redux/Reducer/cartItemsReducer";
import { ToastContainer, toast } from "react-toastify";


export function ShowProductList() {
    const dispatch = useDispatch();
    const storedData = useSelector(productSelector);
    const [edit, setEdit] = useState({id:null, title: "", price: "", description: "", ratings: "" })
    const [sort, setSort] = useState(false);
    const [sortApplied, setSortApplied] = useState(false)

    useEffect(() => {
        dispatch(fetchDataFromCart())
        dispatch(fetchDataFromFirebase())
    },[dispatch])


    const handleEditClick = (id) => {
        const selectItem = storedData.find((item) => item.id === id)
        setEdit({
            id: selectItem.id,
            title: selectItem.title,
            price: selectItem.price,
            description: selectItem.description,
            ratings: selectItem.ratings
        })
        toast.success("Edit toggled successfully!")
    }

    const handleCanceledit = (id)=>{
        setEdit({id:id})
        toast.success("Edit toggled cancel successfully!")
    }

    const handleEditItem = ()=>{
        dispatch(editProduct(edit))
        setEdit({title: "", price: "", description: "", ratings: ""})
        toast.success("Item Updated successfully!")
    }

    const handleDelete = (id)=>{
        dispatch(deleteProduct(id));
        toast.success("Item Deleted successfully!")
    }

    const handleSort = ()=>{
        dispatch(actions.sortPrice(!sortApplied))
        setSort((prevState)=>!prevState)
        setSortApplied(!sortApplied)
        toast.success("Filter Applied successfully!")
    }

    const handleClearSort = ()=>{
        dispatch(actions.sortPrice(!sortApplied))
        setSort(!sort)
        setSortApplied(!sortApplied)
        toast.success("Filter Removed successfully!")
    }

    const handleAddTocart = async (cartData)=>{
        dispatch(addNewDataintoCart(cartData))
        toast.success("Item Added into cart successfully!")
    }

    if(!storedData || storedData.length===0){
        return(
            <div className="loading">Loading...</div>
        )
    }
    return(
            <>
            <div className="checkbox-container">
                <Form.Label for="sort-price">Sort Price
                </Form.Label>
                {sortApplied && (<span onClick={handleClearSort}> &#10005;</span>)}
                <Form.Check className="checkbox-price" id="sort-price" 
                checked={!sort} onChange={(e)=>handleSort(e.target.checked)} />
            </div>
            <ListGroup as="ul" className="mt-2" style={{ fontFamily: 'monospace' }}>
                {storedData.map((item, i) => (
                    <>
                        <ListGroup.Item action variant="dark"
                            className="w-75 mt-2 m-auto d-flex justify-content-between align-items-start" key={i}>
                            <Nav.Link href={`/${item.id}`}>
                            <Image src={item.imgUrl}
                            alt={item.title} width={120} height={120} rounded />
                            </Nav.Link>
                            <Container>
                               {edit.id===item.id?(<input type="text" value={edit.title}
                                onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                                className="edit-title" 
                                />):
                                (<h5 className="Item-title">{item.title}</h5>)}
                                {edit.id===item.id?(<input type="number" 
                                value={edit.price} 
                                onChange={(e) => setEdit({ ...edit, price: e.target.value })}
                                className="edit-price" 
                                />):
                                (<p className="Item-price">Rs:- {item.price}</p>)}

                                {edit.id===item.id?(<input type="number" value={edit.ratings} 
                                onChange={(e) => setEdit({ ...edit, ratings: e.target.value })} 
                                className="edit-rating"
                                />):
                                (<div className="star-container">
                                    {Array.from({ length: 5 }, (col, index) => (
                                        <>
                                            <FaStar key={index}
                                                color={index + 0.5 <= item.ratings ? "#ffc107" : "#e4e5e9"} size={20} className="star"
                                            />
                                        </>
                                    ))}
                                </div>)}
                            </Container>
                            <Container className="mt-2">
                                {edit.id===item.id?(
                                    <>
                                <textarea rows={3} cols={50} value={edit.description}
                                    onChange={(e) => setEdit({ ...edit, description: e.target.value })}></textarea>
                                    <Button type="submit" onClick={handleEditItem}>Update</Button>
                                    &nbsp;
                                    &nbsp;
                                    <Button onClick={()=>handleCanceledit(null)}>Cancel</Button>
                                    </>
                                    ):
                                (<>
                                <p className="item-para">{item.description}</p>
                                <div className="button-container">
                                <Image src="https://cdn-icons-png.flaticon.com/128/420/420140.png"
                                    alt="edit-icon" width={30}
                                    onClick={() => handleEditClick(item.id)}
                                />
                                &nbsp;
                                &nbsp;
                                <Image src="https://cdn-icons-png.flaticon.com/128/1214/1214926.png" 
                                alt="delete-icon" width={30}
                                onClick={()=>handleDelete(item.id)} 
                                />
                                &nbsp;
                                &nbsp;
                                <Button
                                onClick={()=>handleAddTocart(item)}>Add To Cart</Button>
                                &nbsp;
                                &nbsp;
                                <Button className="bg-success"
                                href={`/${item.id}`}>Check Details</Button>
                                </div>
                                </>)}
                            </Container>
                        </ListGroup.Item>
                    </>
                ))}
            </ListGroup>
            <ToastContainer/>
            </>
            )
}