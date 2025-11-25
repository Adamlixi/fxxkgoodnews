'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import MemeNewsCard from './components/MemeNewsCard';
import LoadingMeme from './components/LoadingMeme';
import memeNews, { MemeNewsItem } from './data/memeNews';

const categories = ['全部', '科技', '金融', '政治', '本质'];

export default function MemeNewsPage() {
  const [news, setNews] = useState<MemeNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('全部');

  useEffect(() => {
    const timer = setTimeout(() => {
      setNews(memeNews);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const filteredNews = selectedCategory === '全部'
    ? news
    : news.filter(item => item.category === selectedCategory);

  const handleLike = (id: number) => {
    setNews(prevNews =>
      prevNews.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  if (loading) {
    return <LoadingMeme />;
  }

  return (
    <div className="min-h-screen px-12 sm:px-20 lg:px-32 py-20 relative">
      {/* 左上角装饰图片 - 鲁迅表情包 */}
      <div className="absolute top-0 left-0 w-[15%] min-w-[120px] max-w-[300px] z-0">
        <div className="relative group">
          <Image
            src="/good-thing.png"
            alt="这是好事儿啊"
            width={250}
            height={250}
            unoptimized
            className="w-full h-auto transform -rotate-12 transition-transform duration-300 group-hover:rotate-0 drop-shadow-xl"
          />
        </div>
      </div>

      {/* 右上角装饰图片 - good图片 */}
      <div className="absolute top-0 right-0 w-[15%] min-w-[120px] max-w-[300px] z-0" style={{ right: 0 }}>
        <div className="relative group">
          <Image
            src="/good.png"
            alt="好"
            width={250}
            height={250}
            unoptimized
            className="w-full h-auto transform rotate-12 transition-transform duration-300 group-hover:rotate-0 drop-shadow-xl"
            style={{ display: 'block' }}
          />
        </div>
      </div>

      <header className="text-center mb-20">
        <h1 className="text-8xl font-black mb-6 rainbow-text animate-bounce tracking-tight">
          🤪 好事网 🤪
        </h1>
        <p className="text-2xl text-white font-bold mb-4 drop-shadow-lg animate-[bounce_2s_infinite]">
          所有心理问题都是性压抑
        </p>
        <div className="text-lg text-yellow-300 font-bold">
          ⚠️ 警告：都是好事 ⚠️
        </div>
      </header>

      <div className="flex flex-wrap justify-center gap-8 mb-8 relative z-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`meme-button ${selectedCategory === category ? 'shake' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-16 max-w-[1600px] mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
      >
        {filteredNews.map(item => (
          <MemeNewsCard
            key={item.id}
            news={item}
            onLike={handleLike}
            href={`/news/${item.id}`}
          />
        ))}
      </div>

      <footer className="text-center mt-12 text-white font-bold">
        <div className="text-2xl mb-4">
          🎉 每天笑一笑，bug少一半！ 🎉
        </div>
        <div className="text-lg opacity-80">
          Made with ❤️ and lots of ☕ by a programmer who should be debugging but is making memes instead
        </div>
      </footer>
    </div>
  );
}
