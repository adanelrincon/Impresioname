import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from "../../components/header/Header";
import { useParams } from 'react-router-dom';
import CartService from "../../services/CartService";
import { Link } from 'react-router-dom';
import useSocketService from '../../services/SocketService';
import { ToastContainer } from 'react-toastify';

export default function GlassesPage() {
  const [article, setArticle] = useState(null);
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [cartItems, setCartItems] = useState([]);
  useSocketService();
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://localhost/api/article/${id}`);
        setArticle(response.data);
        const cart = CartService.getCart(userInfo.id);
        setCartItems(cart);
      } catch (error) {
        console.error('Error fetching article details:', error);
      }
    };
    fetchArticle();
  }, [id]);

  const addToCart = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const newItem = {
      id: article.id,
      name: article.name,
      price: article.price,
      filename: `https://localhost/images/${article.filename}`,
      stock: article.stock,
    };

    const currentCart = CartService.getCart(userInfo.id);

    // Append the new item to the current cart
    const updatedCart = [...currentCart, newItem];

    // Save the updated cart to local storage
    CartService.setCart(userInfo.id, updatedCart);

    // Update the state with the updated cart
    setCartItems(updatedCart);
    console.log(updatedCart)
  };

  if (!article) {
    return <div>glasses not found</div>;
  }


  const goToTryGlasses = (id) => {
    let path = '';

    if (id >= 1 && id <= 7) {
      path = 'https://localhost:3000/glasses-model-3.html';
    } else if (id >= 8 && id <= 14) {
      path = 'https://localhost:3000/glasses-model-5.html';
    } else if (id >= 15 && id <= 19) {
      path = 'https://localhost:3000/glasses-model-1.html';
    } else if (id >= 20 && id <= 23) {
      path = 'https://localhost:3000/glasses-model-4.html';
    } else if (id >= 24 && id <= 28) {
      path = 'https://localhost:3000/glasses-model-6.html';
    } else if (id >= 29 && id <= 42) {
      path = 'https://localhost:3000/glasses-model-2.html';
    }

    return path
  };


  return (
    <>
      <div>
        <Header />
        <div className="glasses">
          <div className='glasses-container'>
            <div className='glasses-item'>
              <div className='glasses-item-info'>
                <img src={`https://localhost/images/${article.filename}`} className="glasses-item-img" alt='articleImagesGlasses'/>
                <div className='glasses-info'>
                  <h2>{article.price}€</h2>
                  <p>{article.name} - {article.description}</p>
                  <p>{article.stock ? 'in stock' : 'out of stock'}</p>
                </div>
                <Link to={`/shop-men`} className='link'>
                  <button className="button-glasses" id='buttonBasket' onClick={addToCart}>Add to Basket</button>
                </Link>
                <ToastContainer />
                <a href={goToTryGlasses(article.id)}>
                  <button className="button-glasses" id='buttonBasket'>Try Me</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}