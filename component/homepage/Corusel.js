"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { getActiveCorusel } from '@/redux/action/corusel';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Corusel = () => {
    const dispatch = useDispatch();
    const [coruselData, setCoruselData] = useState([]);
    const [apiHit, setApiHit] = useState(false);
    useEffect(() => {
        const loadBootstrap = async () => {
          await import('bootstrap/dist/css/bootstrap.min.css');
          const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min.js');
      
          const el = document.querySelector('#carouselExampleIndicators');
          if (el && bootstrap.Carousel) {
            new bootstrap.Carousel(el, {
              ride: 'carousel',
            });
          }
        };
      
        loadBootstrap();
        getCorusel();
      }, []);


    const getCorusel = async () => {
        setApiHit(false);
        try {
            const res = await dispatch(getActiveCorusel());

            if (res?.payload && res?.payload?.success) {
                const data = res?.payload;
                setCoruselData(data?.data || []);
            }
        } catch (err) {
            console.error("Error fetching corusel:", err);
        } finally {
            setApiHit(true);
        }
    };


    return (
            <div id="carouselExampleIndicators" className="carousel slide w-[95%] sm:w-[80%] md:w-[70%] aspect-4/2 md:aspect-6/2 overflow-hidden" data-ride="carousel">
                {!apiHit ? (
                    <div className="w-full h-full bg-gray-200 rounded animate-pulse" ></div>
                ) : (
                    <div className="carousel-inner h-full">
                        {coruselData.length > 0 && coruselData.map((item, index) => (
                            <div key={item._id || index} className={`carousel-item ${index === 0 ? 'active' : ''} h-full`}>
                                <Image className="d-block h-full w-full" src={item?.image} alt={`Slide ${index + 1}`}
                                    width={500}
                                    height={300}
                                    quality={100}
                                    style={{ objectFit: 'cover' }}
                                    priority={true}
                                />
                            </div>
                        ))}


                    </div>
                )}
                {apiHit && coruselData.length > 1 && (
                    <>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </>)}
            </div>

    )
}

export default Corusel
