import { Star, Info, Clock, Sparkles, Crown, Diamond, Watch, Scissors } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface HighlightItem {
  id: string;
  title: string;
  icon: 'reviews' | 'info' | 'products' | 'upcoming';
  action: 'modal' | 'link';
  storyId?: string;
  link?: string;
}

const storyHighlights: HighlightItem[] = [
  { id: 'reviews', title: 'آراء', icon: 'reviews', action: 'modal', storyId: 'reviews' },
  { id: 'info', title: 'أُورزي ١٩٩٨', icon: 'info', action: 'modal', storyId: 'info' },
  { id: 'upcoming', title: 'إصدارات قادمة', icon: 'upcoming', action: 'modal', storyId: 'upcoming' },
];

const productHighlight: HighlightItem = {
  id: 'products',
  title: 'منتجات حالية',
  icon: 'products',
  action: 'link',
  link: '/bracelets.html',
};

const iconMap: Record<HighlightItem['icon'], LucideIcon> = {
  reviews: Star,
  info: Info,
  products: Clock,
  upcoming: Sparkles,
};

const floatingIcons = [
  // Left flank
  { Icon: Crown, top: '15%', left: '6%', size: 18, delay: 0 },
  { Icon: Diamond, top: '38%', left: '3%', size: 14, delay: 1.8 },
  { Icon: Sparkles, top: '62%', left: '8%', size: 12, delay: 3.2 },
  { Icon: Star, top: '82%', left: '5%', size: 16, delay: 4.5 },
  // Right flank
  { Icon: Diamond, top: '12%', right: '5%', size: 16, delay: 0.8 },
  { Icon: Crown, top: '48%', right: '3%', size: 13, delay: 2.5 },
  { Icon: Star, top: '72%', right: '7%', size: 15, delay: 4 },
  // Background gaps
  { Icon: Watch, top: '28%', left: '42%', size: 11, delay: 1.2 },
  { Icon: Scissors, top: '55%', right: '40%', size: 10, delay: 3.8 },
  { Icon: Sparkles, top: '88%', left: '48%', size: 12, delay: 5.2 },
];

interface HighlightsSectionProps {
  onStoryOpen: (storyId: string) => void;
}

export default function HighlightsSection({ onStoryOpen }: HighlightsSectionProps) {
  const handleClick = (h: HighlightItem) => {
    if (h.action === 'link' && h.link) {
      window.location.href = h.link;
    } else if (h.action === 'modal' && h.storyId) {
      onStoryOpen(h.storyId);
    }
  };

  const renderCircle = (h: HighlightItem) => {
    const Icon = iconMap[h.icon];
    return (
      <button
        key={h.id}
        onClick={() => handleClick(h)}
        className="flex flex-col items-center gap-4 group flex-shrink-0"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <div className="p-2">
          <div
            className="relative rounded-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
            style={{
              width: '130px',
              height: '130px',
              padding: '4px',
              background: '#243247',
              border: '2px solid #e7ddcc',
              boxShadow: '0 6px 24px rgba(36, 50, 71, 0.18)',
            }}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: '#243247',
                border: '1px solid rgba(231, 221, 204, 0.25)',
              }}
            >
              <Icon
                size={38}
                className="transition-transform duration-300 group-hover:scale-110"
                style={{ color: '#e7ddcc', opacity: 0.9 }}
              />
            </div>

            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: '0 0 32px rgba(231, 221, 204, 0.3), 0 0 60px rgba(36, 50, 71, 0.12)',
              }}
            />
          </div>
        </div>

        <span
          className="text-sm md:text-base font-semibold transition-all duration-300 group-hover:opacity-100"
          style={{
            fontFamily: "'Amiri', serif",
            color: '#243247',
            opacity: 0.85,
            letterSpacing: '0.03em',
          }}
        >
          {h.title}
        </span>
      </button>
    );
  };

  return (
    <section
      className="relative pt-32 md:pt-48 pb-28 md:pb-40"
      style={{
        background:
          'linear-gradient(180deg, #e7ddcc 0%, #f0ebe0 25%, #f5f0e8 55%, #f0ebe0 85%, #e7ddcc 100%)',
      }}
      dir="rtl"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map(({ Icon, top, left, right, size, delay }, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top,
              left,
              right,
              opacity: 0.04,
              animation: `floatIcon 7s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <Icon size={size} className="text-[#243247]" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div
          className="flex items-start justify-between py-8 gap-6 md:gap-12"
        >
          {/* Right side (RTL): 3 story circles */}
          <div className="flex gap-6 md:gap-12 items-start py-2">
            {storyHighlights.map(renderCircle)}
          </div>

          {/* Left side (RTL): product circle */}
          <div className="flex items-start py-2">
            {renderCircle(productHighlight)}
          </div>
        </div>
      </div>
    </section>
  );
}
