import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useQuery } from "@apollo/client";
import { PRODUCTS } from '../apollo/queries';
export default function GetTotalAmount() {
    const cart = useSelector(state => state.cart)
    const currency = useSelector(state => state.currency)

    const { loading, error, variables, data, refetch } = useQuery(PRODUCTS, {
        variables: {
            currency: "USD"
        },
    })

    useEffect(() => {
        refetch({ currency: currency })
    }, [currency, refetch])

    if (loading) return ''
    if (error) return ''

    const amount = 0

    const filteredCart = cart.map(x => {
        let item = data.products.find(item => item.id === x.id)
        if (item) {
            return amount + (x.quantity * item.price)
        }
        return x
    })?.reduce((a, b) => a + b, 0)
    return <div className="f-check-out">
        <div className="f-check-out-inner">
            <div className="f-checkout-header">
                <p>Subtotal</p>
                <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: variables.currency, }).format(filteredCart)}</p>
            </div>
            <div className="f-btn">
                <div className="subscription-btn">MAKE THIS A SUBSCRIPTION (SAVE 20%)</div>
                <div className="checkout-btn">PROCEED TO CHECKOUT</div>
            </div>
        </div>
    </div>
}
