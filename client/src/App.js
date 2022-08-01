import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Shipping from './components/Shipping';
import Payment from './components/Payment';
import PlaceOrder from './components/PlaceOrder';
import Order from './components/Order';
import OrderList from './components/OrderList';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit';
import ProductList from './components/ProductList';
import ProductEdit from './components/ProductEdit';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/placeorder' element={<PlaceOrder />} />
            <Route path='/order/:id' element={<Order />} />
            <Route path='/admin/orderlist' element={<OrderList />} />
            <Route path='/admin/userlist' element={<UserList />} />
            <Route path='/admin/productlist' element={<ProductList />} />
            <Route path='/admin/user/:id/edit' element={<UserEdit />} />
            <Route path='/admin/product/:id/edit' element={<ProductEdit />} />

            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/:id' element={<Cart />} />

            {/* 
            
            Alternatively we can do something like this as well: 

              <Route path="/cart">
                <Route index element={<Cart />} />
                <Route path=":id" element={<Cart />} />
              </Route>
            
            */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
