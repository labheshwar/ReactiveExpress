import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/product/:id' element={<ProductDetail />} />

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
