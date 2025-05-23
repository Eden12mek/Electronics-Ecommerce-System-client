import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const BannerProduct = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

    const slides = [
        {
            title: "Summer Collection 2023",
            subtitle: "Discover our new arrivals",
            cta: "Shop Now",
            bgColor: "bg-gradient-to-r from-rose-400 to-orange-300",
            textColor: "text-white"
        },
        {
            title: "Limited Time Offer",
            subtitle: "Get 30% off on selected items",
            cta: "Explore Deals",
            bgColor: "bg-gradient-to-r from-blue-500 to-teal-400",
            textColor: "text-white"
        },
        {
            title: "Premium Quality",
            subtitle: "Crafted for comfort and style",
            cta: "View Collection",
            bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
            textColor: "text-white"
        },
        {
            title: "Free Shipping",
            subtitle: "On all orders over 50 birr",
            cta: "Start Shopping",
            bgColor: "bg-gradient-to-r from-amber-500 to-yellow-300",
            textColor: "text-gray-900"
        }
    ];

    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <div className="container mx-auto px-4 my-5">
            <div className="relative h-60 md:h-72 w-full rounded-xl overflow-hidden shadow-lg">
                <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className={`absolute inset-0 ${slides[currentSlide].bgColor} flex flex-col items-center justify-center p-8 text-center`}
                    >
                        <motion.h1 
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`text-3xl md:text-5xl font-bold mb-4 ${slides[currentSlide].textColor}`}
                        >
                            {slides[currentSlide].title}
                        </motion.h1>
                        <motion.p 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className={`text-xl md:text-2xl mb-8 ${slides[currentSlide].textColor}`}
                        >
                            {slides[currentSlide].subtitle}
                        </motion.p>
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6, type: "spring" }}
                            className={`px-8 py-3 rounded-full font-semibold ${
                                slides[currentSlide].textColor === "text-white" 
                                    ? "bg-white text-gray-900" 
                                    : "bg-gray-900 text-white"
                            } shadow-lg hover:shadow-xl transition-all duration-300`}
                        >
                            {slides[currentSlide].cta}
                        </motion.button>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md z-10 transition-all"
                >
                    <FaAngleLeft className="text-gray-800 text-xl" />
                </button>
                <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md z-10 transition-all"
                >
                    <FaAngleRight className="text-gray-800 text-xl" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentSlide ? 1 : -1);
                                setCurrentSlide(index);
                            }}
                            className={`w-3 h-3 rounded-full transition-all ${
                                index === currentSlide 
                                    ? "bg-white w-6" 
                                    : "bg-white bg-opacity-50"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;