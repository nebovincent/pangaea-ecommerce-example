import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useQuery } from "@apollo/client";
import { PRODUCTS } from '../apollo/queries';
import { removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } from '../redux/action';

export default function CartItem() {
    const cart = useSelector(state => state.cart)
    const currency = useSelector(state => state.currency)
    const dispatch = useDispatch()

    const removeItem = (id) => {
        dispatch(removeItemFromCart(id))
    }
    const increaseQuantity = (id) => {
        dispatch(increaseItemQuantity(id))
    }

    const decreaseQuantity = (id) => {
        dispatch(decreaseItemQuantity(id))
    }

    const { loading, error, data, variables, refetch } = useQuery(PRODUCTS, {
        variables: { currency: 'USD' },
        fetchPolicy: 'cache-first',
    })

    useEffect(() => {
        refetch({ currency, returnPartialData: true, },
        )
    }, [refetch, currency])

    if (loading) return <option>Loading...</option>
    if (error) return <option>{console.log(error)}</option>

    const filteredCart = cart.map(x => {
        let item = data.products.find(item => item.id === x.id)
        if (item) {
            return Object.assign({}, x, item)
        }
        return x
    })

    if (!filteredCart.length) {
        return <div className="no-cart-item">There are no items in your cart.</div>
    }
    return filteredCart.map((item) => {
        return <div className="cart-item" key={item.id}>
            <div className="description-holder">
                <button onClick={() => removeItem(item.id)}>X</button>
                <h6>{item.title}</h6>
                <p className="description">One time purchase of Two Months supply</p>
                <div className="quantity">
                    <div className="quantity-setting">
                        <span onClick={() => decreaseQuantity(item.id)}>-</span>
                        <span>{item.quantity}</span>
                        <span onClick={() => increaseQuantity(item.id)}>+</span>
                    </div>
                    <div className="price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: variables.currency, }).format(item.price * item.quantity)}</div>
                </div>
            </div>
            <div className="img-holder"><img src={item.image_url} alt="sample" /></div>
        </div>
    })
}
