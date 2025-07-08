import React, { useState, useRef, useEffect } from 'react';
import styles from './TimelineBlock.module.scss';
import type { TimelinePeriod } from './timelineTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type TimelineBlockProps = {
  periods: TimelinePeriod[];
  className?: string;
};

const DOT_RADIUS = 220;
const CIRCLE_SIZE = 520;

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ periods, className }) => {
  const [activePeriod, setActivePeriod] = useState(0);
  const yearsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (yearsRef.current) {
      gsap.fromTo(
        yearsRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [activePeriod]);

  const getDotPosition = (idx: number, total: number) => {
    const angle = (2 * Math.PI * idx) / total - Math.PI / 2;
    const x = CIRCLE_SIZE / 2 + DOT_RADIUS * Math.cos(angle) - 20;
    const y = CIRCLE_SIZE / 2 + DOT_RADIUS * Math.sin(angle) - 20;
    return { left: x, top: y };
  };

  return (
    <section className={`${styles.timelineBlock} ${className || ''}`.trim()}>
      <div className={styles.header}>
        <span style={{ borderLeft: '4px solid #f36ba6', marginRight: 16, height: 32 }} />
        Исторические даты
      </div>
      <div className={styles.circle}>
        <svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} className={styles.periodDots}>
          <circle cx={CIRCLE_SIZE/2} cy={CIRCLE_SIZE/2} r={DOT_RADIUS} fill="none" stroke="#e2e4ea" strokeWidth="1.5" />
          <line x1={CIRCLE_SIZE/2} y1={0} x2={CIRCLE_SIZE/2} y2={CIRCLE_SIZE} stroke="#e2e4ea" strokeWidth="1" />
          <line x1={0} y1={CIRCLE_SIZE/2} x2={CIRCLE_SIZE} y2={CIRCLE_SIZE/2} stroke="#e2e4ea" strokeWidth="1" />
        </svg>
        <div className={styles.years} ref={yearsRef}>
          <span className={`${styles.year} ${styles.inactive}`}>{periods[activePeriod].years[0]}</span>
          <span className={`${styles.year} ${styles.active}`}>{periods[activePeriod].years[1]}</span>
        </div>
        {periods.map((period, idx) => {
          const pos = getDotPosition(idx, periods.length);
          return (
            <button
              key={period.label}
              className={`${styles.dot} ${idx === activePeriod ? styles.active : ''}`}
              style={{ left: pos.left, top: pos.top }}
              onClick={() => setActivePeriod(idx)}
              aria-label={period.label}
              type="button"
            >
              <span>{idx + 1}</span>
              <span style={{ position: 'absolute', left: '120%', top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#465175', whiteSpace: 'nowrap', fontWeight: 400 }}>{period.label}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.sliderWrapper}>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={32}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
          key={activePeriod}
        >
          {periods[activePeriod].events.map((event) => (
            <SwiperSlide key={event.year + event.title}>
              <div style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 2px 16px #e2e4ea55',
                padding: 32,
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                <div style={{ color: '#6566f6', fontWeight: 700, fontSize: 18 }}>{event.year}</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{event.title}</div>
                <div style={{ color: '#465175', fontSize: 15 }}>{event.description}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}; 