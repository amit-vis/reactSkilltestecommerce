// imported all required data
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem, fetchDataFromCart, updateExisting, cartSelector } from "../../Redux/Reducer/cartItemsReducer"
import { useEffect } from "react";
import { ListGroup, Image, Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import './CartItems.css';
import { toast, ToastContainer } from "react-toastify";


export function CartItem() {
    const cartData = useSelector(cartSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDataFromCart())
    }, [dispatch])

    // handle increase count part
    let handleIncrease = (item) => {
        const updateQuantity = parseInt(item.quantity) + 1
        const updatePrice = parseInt(item.price) + parseInt(item.price) / parseInt(item.quantity)

        dispatch(updateExisting({
            id: item.id,
            quantity: updateQuantity,
            price: updatePrice
        }))
        toast.info("Item quntity updated!")
    };

    // handle decrease count part
    let handleDecrease = (item) => {
        const updateQuantity = parseInt(item.quantity) - 1
        const updatePrice = parseInt(item.price) - parseInt(item.price) / parseInt(item.quantity);

        if (updateQuantity === 0) {
            dispatch(deleteCartItem(item.id));
            toast.info("Item Romoved successfully!")
        }
        dispatch(updateExisting({
            id: item.id,
            quantity: updateQuantity,
            price: updatePrice
        }))
        toast.info("Item quntity updated!")
    }

    // handle loading functionality
    if (!cartData || cartData.length === 0) {
        return (
            <b>Data is Loading...</b>
        )
    }

    return (
        <>
        {/* html code for CartItems */}
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
                            <div className="quantity-container">
                                <Image src="https://cdn-icons-png.flaticon.com/128/753/753322.png"
                                    alt="sub" width={30}
                                    onClick={() => handleDecrease(item)}
                                />
                                &nbsp;
                                <span>{item.quantity}</span>
                                &nbsp;
                                <Image src="https://cdn-icons-png.flaticon.com/128/753/753317.png" alt="add"
                                    width={30} onClick={() => handleIncrease(item)} />
                            </div>
                        </Container>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <ToastContainer />
        </>
    )
}