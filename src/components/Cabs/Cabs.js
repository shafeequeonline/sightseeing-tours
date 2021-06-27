import React, {useContext, useEffect, useState} from 'react';
import { CabsContext } from "../../context/cabs-context";
import './Cabs.scss'

const Cabs = () => {
    const { offers } = useContext(CabsContext)
    const premiumCabs = offers.filter(car => car.group === "Premium")
    const cabs = offers.filter(car => car.group !== "Premium")

    console.log(offers, premiumCabs, cabs)

    return (
        <div className="Cabs">
            <div className="Cabs__premium">
                {
                    premiumCabs.map(car => (
                        <div className="Cabs__card">
                            Description: {car.vehicleType.description} <br/>
                            Title: {car.vehicleType.title}<br/>
                            Class: {car.vehicleType.group}<br/>
                            Amount: {car.amount} {car.currency}<br/>
                            <img src={car.vehicleType.images.web} alt={car.vehicleType.title} />
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    ))
                }
            </div>
            <div className="Cabs__ordinary">
                {
                    cabs.map(car => (
                        <div className="Cabs__card">
                            Description: {car.vehicleType.description} <br/>
                            Title: {car.vehicleType.title}<br/>
                            Class: {car.vehicleType.class}<br/>
                            Amount: {car.amount} {car.currency}<br/>
                            <img src={car.vehicleType.images.web} alt={car.vehicleType.title} />
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Cabs