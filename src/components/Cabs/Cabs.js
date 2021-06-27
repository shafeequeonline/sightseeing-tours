import React, {useContext, useEffect, useState} from 'react';
import { CabsContext } from "../../context/cabs-context";
import Modal from '@material-ui/core/Modal';

import './Cabs.scss'
import SimpleModal from "../SimpleModal/SimpleModal";

const Cabs = () => {
    const [open, setOpen] = useState(false);
    const [singleCab, setSingleCab] = useState([]);

    const { offers } = useContext(CabsContext)
    const premiumCabs = offers.filter(car => car.group === "Premium")
    const cabs = offers.filter(car => car.group !== "Premium")

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getCabInfo = (cabInfo) => {
        setSingleCab(cabInfo)
        handleOpen()
    }

    return (
        <div className="Cabs">
            <div className="Cabs__premium">
                {
                    premiumCabs.map((premCab, index) => (
                        <div className="Cabs__card Cabs__card--prem" key={index} onClick={() => getCabInfo(premCab)}>
                            <span className="Cabs__title">{premCab.vehicleType.title}</span>
                            <div className="Cabs__group">{premCab.group}</div>
                            <img src={premCab.vehicleType.images.web} alt={premCab.vehicleType.title} />
                            <div className="Cabs__description">{premCab.vehicleType.description} </div>
                            <div className="Cabs__price">{(premCab.amount / premCab.duration).toFixed(2)} <span className="Cabs__price--currency">{premCab.currency}</span> </div>
                        </div>
                    ))
                }

                <Modal
                    open={open}
                    onClose={handleClose}
                    className="Cabs__modal"
                >
                    <SimpleModal data={singleCab} />
                </Modal>
            </div>
            <div className="Cabs__ordinary">
                {
                    cabs.map((cab, index) => (
                        <div className="Cabs__card Cabs__card--prem" key={index} onClick={() => getCabInfo(cab)}>
                            <span className="Cabs__title">{cab.vehicleType.title}</span>
                            <div className="Cabs__group">{cab.group}</div>
                            <img src={cab.vehicleType.images.web} alt={cab.vehicleType.title} />
                            <div className="Cabs__description">{cab.vehicleType.description} </div>
                            <div className="Cabs__price">{(cab.amount / cab.duration).toFixed(2)} <span className="Cabs__price--currency">{cab.currency}</span> </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Cabs