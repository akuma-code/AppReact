import React from 'react'
import './StoreCard.css'

const StoreCard = (props) => {
    return (
        <fieldset
            className="card"
        >
            <div className="card__block">
                <div className="card__img">OK IMG</div>
                <div className="card__desc">
                    <span>Цена: { props.price } руб.</span>
                    <span>Осталось: { props.amount } шт.</span>
                    <span>Р-ры: { props.size } мм</span>
                </div>
            </div>

            <div className="card__prod">PRODUCTION</div>
            <legend>
                OKNO 01
            </legend>
        </fieldset>
    )
}

export default StoreCard