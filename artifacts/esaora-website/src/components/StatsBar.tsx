import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

interface CounterStatProps {
  target: number;
  label: string;
  suffix?: string;
  prefix?: string;
  active: boolean;
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    startTimeRef.current = start;

    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, active]);

  return count;
}

function CounterStat({ target, label, suffix = '', prefix = '', active }: CounterStatProps) {
  const count = useCountUp(target, 2000, active);
  return (
    <div className="text-center flex-1 min-w-[120px]">
      <div className="text-4xl sm:text-5xl font-bold text-white font-sora mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm text-white/70 uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

export function StatsBar() {
  const { t } = useLanguage();
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#0E7B74] py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-0 md:divide-x md:divide-white/20">
        <CounterStat target={4} label={t.stats.countries} active={active} />
        <CounterStat target={7} label={t.stats.objectives} suffix="+" active={active} />
        <CounterStat target={5} label={t.stats.alliance} active={active} />
        <CounterStat target={4} label={t.stats.pillars} active={active} />
      </div>
    </section>
  );
}
