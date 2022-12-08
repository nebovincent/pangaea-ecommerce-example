import React from 'react'
import { ChevronLeft } from 'react-feather';

export default function MobileNav(props) {
    return (
        <>
            <div className="mobile-nav">
                {props.is_mobile_nav ? <div className="under-lay"></div> : false}
                <div className={`inner ${props.is_mobile_nav ? 'show' : ''} `}>
                    <button onClick={props.toggleMobileNav} className="closeButton"><div><ChevronLeft size={20} /></div></button>
                    <div className="top">
                        <div className="active">Shop</div>
                        <div>About</div>
                        <div>Support</div>
                    </div>
                    <div className="down" >
                        <div>Face</div>
                        <div>Hair & Body</div>
                        <div>Sets</div>
                        <div>Accessories</div>
                        <div>Shop All</div>
                    </div>
                </div>
            </div>
        </>
    )
}
