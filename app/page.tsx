'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import MemeNewsCard from './components/MemeNewsCard';
import LoadingMeme from './components/LoadingMeme';
import memeNews, { MemeNewsItem } from './data/memeNews';

export default function MemeNewsPage() {
  const [news, setNews] = useState<MemeNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从API加载News.json中的数据
    const loadNews = async () => {
      try {
        // 先尝试从/api/news/load读取News.json
        const response = await fetch('/api/news/load', {
          cache: 'no-store'
        });
        
        if (response.ok) {
          const result = await response.json();
          console.log('API返回结果:', result);
          
          if (result.success && result.data && Array.isArray(result.data) && result.data.length > 0) {
            console.log(`成功加载 ${result.data.length} 条新闻`);
            setNews(result.data);
            setLoading(false);
            return;
          } else {
            console.warn('News.json数据为空，使用默认数据');
          }
        } else {
          const errorText = await response.text();
          console.error('API请求失败:', response.status, errorText);
        }
        
        // 如果News.json为空或不存在，使用默认数据
        console.log('使用默认模拟数据');
        setNews(memeNews);
        setLoading(false);
      } catch (error: any) {
        console.error('加载新闻失败:', error);
        console.error('错误详情:', error.message, error.stack);
        // 出错时使用默认数据
        setNews(memeNews);
        setLoading(false);
      }
    };

    loadNews();
  }, []);

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

      <header className="text-center mb-40">
        <h1 className="text-8xl font-black mb-6 rainbow-text animate-bounce tracking-tight">
          🤪 好事网 🤪
        </h1>
        <p className="text-2xl text-white font-bold mb-4 drop-shadow-lg animate-[bounce_2s_infinite]">
          所有心理问题都是性压抑
        </p>
        <div className="text-lg text-yellow-300 font-bold">
          ⚠️ 警告：都是好事 ⚠️
        </div>
        <div className="text-lg text-yellow-300 font-bold">
          
        </div>
        <div className="text-lg text-yellow-300 font-bold">
          
        </div>
        <div className="text-lg text-yellow-300 font-bold">
          
        </div>
        <div className="text-lg text-yellow-300 font-bold">
          
        </div>
      </header>

      <div className="grid gap-16 max-w-[1600px] mx-auto mt-16"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
      >
        {news.map(item => (
          <MemeNewsCard
            key={item.id}
            news={item}
            onLike={handleLike}
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
