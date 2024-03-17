import React, { useState } from 'react';
import { RiStarSLine } from 'react-icons/ri';
import { MdOutlineFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ id, name, image, price }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className='container-principal-single-card'>
            <div className={`container-corazon-single-card ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
                <MdOutlineFavorite className={`corazon-single-card ${isClicked ? 'clicked' : ''}`} />
            </div>
            <Link to={`/detalle-producto/${id}`} className='link-detail'>
                <div className='container-img-single-card'>
                    <img className='img-single-card' src={image} alt={name} />
                </div>
            </Link>
            <div className="container-name-single-card">
                {name}
            </div>
            <div className='container-precio-single-card'>
                <p className='text-price-single-card'>$ {Number(price).toLocaleString()}</p>
                <p className='text-dia-single-card'>Por dia</p>
            </div>
            <div className='container-stars-sigle-card'>
                <RiStarSLine /><RiStarSLine /><RiStarSLine /><RiStarSLine /><RiStarSLine />
            </div>
        </div>
    );
};

export default Card;
