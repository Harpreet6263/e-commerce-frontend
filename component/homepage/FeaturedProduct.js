"use client";
import { useState, useRef } from "react";
import styles from "./FeaturuedCoruselStyle.module.css";
import Image from "next/image";

const teamMembers = [
  { name: "Emily Kim", role: "Founder", img: "https://images.pexels.com/photos/32347581/pexels-photo-32347581/free-photo-of-elegant-woman-in-traditional-embroidered-sari.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { name: "Michael Steward", role: "Creative Director", img: "https://images.pexels.com/photos/32347581/pexels-photo-32347581/free-photo-of-elegant-woman-in-traditional-embroidered-sari.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { name: "Emma Rodriguez", role: "Lead Developer", img: "https://images.pexels.com/photos/32347581/pexels-photo-32347581/free-photo-of-elegant-woman-in-traditional-embroidered-sari.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { name: "Julia Gimmel", role: "UX Designer", img: "https://images.pexels.com/photos/32347581/pexels-photo-32347581/free-photo-of-elegant-woman-in-traditional-embroidered-sari.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { name: "Lisa Anderson", role: "Marketing Manager", img: "https://images.pexels.com/photos/32347581/pexels-photo-32347581/free-photo-of-elegant-woman-in-traditional-embroidered-sari.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { name: "James Wilson", role: "Product Manager", img: "https://images.pexels.com/photos/32347581/pexels-photo-32347581/free-photo-of-elegant-woman-in-traditional-embroidered-sari.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

export default function FeaturedProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const updateCarousel = (newIndex) => {
    const total = teamMembers.length;
    setCurrentIndex((newIndex + total) % total);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const start = touchStartX.current;
    const end = touchEndX.current;
    if (start == null || end == null) return;

    const distance = start - end;
    const threshold = 50;

    if (distance > threshold) {
      updateCarousel(currentIndex + 1); // swipe left
    } else if (distance < -threshold) {
      updateCarousel(currentIndex - 1); // swipe right
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Featured Products</h1>
      <div className={styles.carouselContainer}>
        <div
          className={styles.carouselTrack}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {teamMembers.map((member, index) => {
            const offset = (index - currentIndex + teamMembers.length) % teamMembers.length;
            let cardClass = styles.hidden;
            if (offset === 0) cardClass = styles.center;
            else if (offset === 1) cardClass = styles.right1;
            else if (offset === 2) cardClass = styles.right2;
            else if (offset === teamMembers.length - 1) cardClass = styles.left1;
            else if (offset === teamMembers.length - 2) cardClass = styles.left2;

            return (
              <div
                key={index}
                className={`${styles.card} ${cardClass}`}
                onClick={() => updateCarousel(index)}
              >
                <Image src={member.img} alt={member.name} width={400} height={500} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.memberInfo}>
        <h2 className={styles.memberName}>{teamMembers[currentIndex].name}</h2>
        <p className={styles.memberRole}>{teamMembers[currentIndex].role}</p>
      </div>

      <div className={styles.dots}>
        {teamMembers.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
            onClick={() => updateCarousel(index)}
          />
        ))}
      </div>
    </div>
  );
}
