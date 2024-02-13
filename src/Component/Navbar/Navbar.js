// imported all required data
import { Nav, Container, Navbar } from "react-bootstrap";
import './Navbar.css'
import { useSelector } from "react-redux";
import { cartSelector } from "../../Redux/Reducer/cartItemsReducer";

export function NavbarPage() {
  const count = useSelector(cartSelector);

  return (
    <>
    {/* Navbar section */}
      <Navbar expand="lg" bg="danger" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/">eCommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Product List</Nav.Link>

              <Nav.Link href="/addproduct">Add Product &nbsp;
                <img src="https://cdn-icons-png.flaticon.com/128/8371/8371357.png"
                  alt="Add Icon" width={20} height={20} />
              </Nav.Link>
            </Nav>

            <Nav.Link className="cart-container" href="/cartitem">
              <img className="cart-img"
                src="https://cdn-icons-png.flaticon.com/128/726/726496.png"
                alt="cart Icon" width={50} height={50} />
              <span className="cart-count">{count.length}</span>
            </Nav.Link>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}