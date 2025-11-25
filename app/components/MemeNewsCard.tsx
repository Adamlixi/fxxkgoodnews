'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, type KeyboardEvent, type MouseEvent } from 'react';
import type { MemeNewsItem } from '../data/memeNews';

interface MemeNewsCardProps {
  news: MemeNewsItem;
  onLike: (id: number) => void;
  href: string;
}

export default function MemeNewsCard({ news, onLike, href }: MemeNewsCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const handleLike = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onLike(news.id);
    setIsLiked(true);
  };

  const handleShare = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    alert('还没上线分享功能，但我们可以假装把它分享到宇宙。');
  };

  const handleFavorite = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    alert('已收藏这条新闻，祝你快乐肥皂泡。');
  };

  const goToDetail = () => {
    router.push(href);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToDetail();
    }
  };

  return (
    <article
      className="relative meme-card p-5 hover:shake overflow-hidden cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={goToDetail}
      onKeyDown={handleKeyDown}
      aria-label={`打开${news.title}的新闻详情`}
    >
      <div className="space-y-3">
          <div
            className="relative overflow-hidden rounded-2xl border-4 border-black"
            style={{ height: 200 }}
          >
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority={news.id === 1}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">{news.title}</h3>
          <p className="text-sm text-gray-700 font-semibold">{news.subtitle}</p>
          <p className="text-xs text-gray-500 leading-relaxed">{news.snippet}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            #{news.category}
          </span>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold transition-all ${
                isLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-red-100'
              }`}
            >
              <span>❤️</span>
              <span>{news.likes}</span>
            </button>

            <button
              onClick={handleShare}
              className="text-blue-500 hover:text-blue-700 text-xl focus:outline-none"
            >
              📤
            </button>

            <button
              onClick={handleFavorite}
              className="text-yellow-500 hover:text-yellow-700 text-xl focus:outline-none"
            >
              ⭐
            </button>
          </div>
        </div>
        {news.highlightComment && (
          <div className="mt-3 rounded-2xl border-2 border-black/70 bg-white/80 p-3 text-[0.85rem] text-gray-800 shadow-inner">
            <div className="text-xl font-black text-[#ff0000] uppercase tracking-widest mb-2">
              这是好事儿啊 {news.highlightComment.emoji}
            </div>
            <p className="font-semibold text-base">{news.highlightComment.text}</p>
            <p className="text-xs text-gray-500 mt-1 font-bold text-right">— {news.highlightComment.author}</p>
          </div>
        )}
      </div>
    </article>
  );
}
