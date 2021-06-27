import React, {useContext, useEffect, useState} from 'react';
import { CabsContext } from "../../context/cabs-context";
import './Cabs.scss'

const Cabs = () => {
    const { offers } = useContext(CabsContext)
    const premiumCabs = offers.filter(car => car.group === "Premium")
    const cabs = offers.filter(car => car.group !== "Premium")

    return (
        <div className="Cabs">
            <div className="Cabs__premium">
                {
                    premiumCabs.map((car, index) => (
                        <div className="Cabs__card Cabs__card--prem" key={index}>
                            <span className="Cabs__title">{car.vehicleType.title}</span>
                            <div className="Cabs__group">{car.group}</div>
                            <img src={car.vehicleType.images.web} alt={car.vehicleType.title} />
                            <div className="Cabs__description">{car.vehicleType.description} </div>
                            <div className="Cabs__price">{(car.amount / car.duration).toFixed(2)} <span className="Cabs__price--currency">{car.currency}</span> </div>
                        </div>
                    ))
                }
            </div>
            <div className="Cabs__ordinary">
                {
                    cabs.map((car, index) => (
                        <div className="Cabs__card Cabs__card--prem" key={index}>
                            <span className="Cabs__title">{car.vehicleType.title}</span>
                            <div className="Cabs__group">{car.group}</div>
                            <img src={car.vehicleType.images.web} alt={car.vehicleType.title} />
                            <div className="Cabs__description">{car.vehicleType.description} </div>
                            <div className="Cabs__price">{(car.amount / car.duration).toFixed(2)} <span className="Cabs__price--currency">{car.currency}</span> </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Cabs