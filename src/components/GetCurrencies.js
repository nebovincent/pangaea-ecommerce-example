import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setCurrency } from '../redux/action';
import { useQuery } from "@apollo/client";
import { CURRENCY } from '../apollo/queries';

export default function GetCurrencies() {
    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)
        const dispatchCurrency = (value) => {
            dispatch(setCurrency(value))
            localStorage.setItem("currency", value)
        }
        const { loading, error, data } = useQuery(CURRENCY)
        if (loading) return <option>Loading...</option>
        if (error) return <option>Error ...</option>

        const tttt = data.currency.map((item, index) => {
            return <option key={index}>{item}</option>
        })

        return <select onChange={(e) => {
            dispatchCurrency(e.target.value)
        }
        } value={currency}>
            {tttt}
        </select>
}
