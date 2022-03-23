import React from 'react'
import './StoreCard.css'

const StoreCard = (props) => {
    const { name, amount, ...options } = props
    return (
        <fieldset
            className="card"
        >
            <div className="card__block">
                <div className="card__img">OK IMG</div>
                <div className="card__desc">
                    <span>Цена: {options.price} руб.</span>
                    <span>Осталось: {amount} шт.</span>
                    <span>Р-ры: {options.size} мм</span>
                </div>
            </div>

            <div className="card__prod">PRODUCTION</div>
            <legend>
                {options.name}
            </legend>
        </fieldset>
    )
}

export default StoreCard