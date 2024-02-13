import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem, fetchDataFromCart,updateExisting, cartSelector } from "../../Redux/Reducer/cartItemsReducer"
import { useEffect } from "react";
import { ListGroup, Image,Container, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

export function CartItem() {
    const cartData = useSelector(cartSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDataFromCart())
    }, [])

    let handleIncrease = (item) => {
        const updateQuantity = item.quantity + 1
        const updatePrice = item.price+item.price/item.quantity

        dispatch(updateExisting({
            id: item.id,
            quantity: updateQuantity,
            price: updatePrice
        }))
    };

    let handleDecrease = (item)=>{
        const updateQuantity = item.quantity -1
        const updatePrice = item.price - item.price / item.quantity;

        if(updateQuantity=== 0){
            dispatch(deleteCartItem(item.id))
        }
        dispatch(updateExisting({
            id: item.id,
            quantity: updateQuantity,
            price: updatePrice
        }))
    }
    
    return (
        <>
            <ListGroup as="ul" className="mt-4">
                {cartData.map((item) => (
                    <ListGroup.Item action variant="dark" 
                    className="w-75 mt-2 m-auto d-flex justify-content-between align-items-start" 
                    key={item.id}>
                        <Image src={item.imgUrl} alt={item.title} width={150} height={150} rounded />
                        <Container>
                            <h5 className="Item-title">{item.title}</h5>
                            <p className="Item-price">Rs:- {item.price}</p>
                                <div className="star-container">
                                    {Array.from({ length: 5 }, (col, index) => (
                                        <>
                                            <FaStar key={index}
                                                color={index + 0.5 <= item.ratings ? "#ffc107" : "#e4e5e9"} size={20} className="star"
                                            />
                                        </>
                                    ))}
                                </div>
                        </Container>
                        <Container>
                        <p className="item-para">{item.description}</p>
                        <Image src="https://cdn-icons-png.flaticon.com/128/753/753322.png" 
                        alt="sub" width={30}
                        onClick={()=>handleDecrease(item)}
                        />
                        <span>{item.quantity}</span>
                        <Image src="https://cdn-icons-png.flaticon.com/128/753/753317.png" alt="add" 
                        width={30} onClick={()=>handleIncrease(item)} />
                        </Container>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}