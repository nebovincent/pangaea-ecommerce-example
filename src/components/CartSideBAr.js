import React, { useEffect } from 'react'
import Cart from './Cart'
import { useSelector } from 'react-redux';

export default function CartSideBAr() {
    const is_cart_open = useSelector(state => state.toggle_cart_sidebar)


    useEffect(() => {
        let bodyEl = document.querySelector("body")
        if (is_cart_open) {
            bodyEl.style.overflow = 'hidden';
        } else {
            bodyEl.style.overflow = 'unset';
        }
    }, [is_cart_open])
    return (
        <>
            <div className="cart-holder">
                {is_cart_open ? <div className="under-lay"></div> : false}
                <div className={`inner ${is_cart_open ? 'show' : ''} `}>
                    <Cart />
                </div>
            </div>
        </>
    )
}
