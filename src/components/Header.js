import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartSideBar} from '../redux/action';
import { ShoppingCart } from 'react-feather';

export default function Header(props) {
    const [is_sticky, set_is_sticky] = useState(false)
    const ref = useRef(null)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const handleScroll = () => {
        if (window.scrollY >= ref.current?.offsetHeight) {
            set_is_sticky(true);
        } else {
            set_is_sticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    const handSideBarButton = () => {
        dispatch(toggleCartSideBar())
    }
    return (
        <div>
            <div className={`header ${is_sticky ? 'sticky' : ''}`} ref={ref}>
                <div className="header-inner">
                    <div className="menu-button">
                        <button onClick={props.toggleMobileNav} >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <div className="left-header">
                        <a href="/">Logo</a>
                        <a href="/">Shop</a>
                        <a href="/">About</a>
                        <a href="/">Support</a>
                        <a href="/">Blog</a>
                    </div>
                    <div className="right-header">
                        <a href="/">Account</a>
                        <div className="shoppingCart" onClick={() => handSideBarButton()}>
                            <ShoppingCart size={20} strokeWidth={1} />
                            <p>{cart.length}</p>
                        </div>
                        <div className="languageOption">
                            <select>
                                <option>EN</option>
                                <option>AR</option>
                                <option>FR</option>
                                <option>GR</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
