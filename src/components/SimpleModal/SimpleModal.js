import React, {forwardRef, useState} from 'react';
import './SimpleModal.scss';

const SimpleModal = forwardRef((prop, ref) => {
    const [data, setData] = useState(prop.data)
    return(
        <div className="SimpleModal" {...prop} ref={ref} >
            {

                    <div className="SimpleModal__content">
                        <div className="SimpleModal__column">
                            <h2>{data.vehicleType.title}</h2>
                            <h3>{data.group}</h3>

                            <p>
                                {data.vehicleType.description}
                            </p>
                            <ul className="SimpleModal__list">
                                {
                                    data.vehicleType.benefits.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))
                                }
                            </ul>
                            <p className="Cabs__price SimpleModal__price">
                                {(data.amount / data.duration).toFixed(2)}
                                {data.currency}
                            </p>
                        </div>
                        <div className="SimpleModal__column">
                            <div className="SimpleModal__gallery">
                                <img
                                    className="SimpleModal__gallery--thumb"
                                    src={data.vehicleType.images.web}
                                    alt={data.vehicleType.title}
                                />
                                {data.vehicleType.marketingImages.map((image, index) => (
                                    <img src={image.xxhdpi} key={index} className="SimpleModal__gallery--main"/>
                                ))}
                            </div>
                        </div>

                    </div>

            }
        </div>
    )
})

export default SimpleModal;