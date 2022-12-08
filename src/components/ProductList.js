import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openCartSidebar, addToCart, setCurrency, localStorageToCart } from '../redux/action';
import { useQuery } from "@apollo/client";
import gql from 'graphql-tag'

export default function ProductList() {
    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)
    const cart = useSelector(state => state.cart)

    useEffect(() => {
        let localItem = JSON.parse(localStorage.getItem('cart'))
        if (localItem?.length) {
            dispatch(localStorageToCart(localItem))

        }
    }, [dispatch])

    useEffect(() => {
        if (cart) {
            let stringCart = JSON.stringify(cart);
            localStorage.setItem("cart", stringCart)
        }
    }, [cart])

    useEffect(() => {
        let localCurrency = localStorage.getItem('currency');
        if (localCurrency) {
            dispatch(setCurrency(localCurrency))
        } else {
            dispatch(setCurrency('USD'))
        }
    }, [currency, dispatch])

    const PRODUCTS = gql`
        query getProducts($currency:Currency!) {
        products{
            id
            title
            image_url
            price(currency:$currency)
            }
        }
    `;


    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
        dispatch(openCartSidebar())
    }



    const { loading, error, variables, data, refetch } = useQuery(PRODUCTS, {
        variables: { currency: "USD" },
        returnPartialData: true,
    })

    useEffect(() => {
        refetch({ currency })
    }, [currency, refetch])


    if (loading) return <div className="preloader">
        <div className="preloader-inner">
            <div className="cart-item-preloader"> <div className="cart-img-preloader animate"></div><div className="cart-title-preloader animate"></div><div className="cart-price-preloader animate"></div><div className="cart-add-preloader animate"></div> </div>
            <div className="cart-item-preloader"> <div className="cart-img-preloader animate"></div><div className="cart-title-preloader animate"></div><div className="cart-price-preloader animate"></div><div className="cart-add-preloader animate"></div> </div>
            <div className="cart-item-preloader"> <div className="cart-img-preloader animate"></div><div className="cart-title-preloader animate"></div><div className="cart-price-preloader animate"></div><div className="cart-add-preloader animate"></div> </div>
            <div className="cart-item-preloader"> <div className="cart-img-preloader animate"></div><div className="cart-title-preloader animate"></div><div className="cart-price-preloader animate"></div><div className="cart-add-preloader animate"></div> </div>
        </div>
    </div>




    if (error) return <div className="loading">{console.log(error)}</div>


    const result = data.products.map((item) => (
        <div className="item" key={item.id}> <div className="item-content"><a href='/'><img src={item.image_url} alt="featured products" /><h3 className="title">{item.title}</h3><p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: variables.currency, }).format(item.price)}</p></a></div><div className="add-to-cart" onClick={() => { handleAddToCart({ id: item.id }) }}>Add to Cart</div> </div>
    )
    )

    return (
        <>
            <div className="featured-products">
                <div className="inner">
                    <div className="content">
                        {result}
                    </div>
                </div>
            </div>
        </>)
}
