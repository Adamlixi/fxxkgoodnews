import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import memeNews, { MemeNewsItem } from '../../data/memeNews';

interface NewsDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const resolvedParams = await params;
  const story = memeNews.find(item => item.id === Number(resolvedParams.id));

  if (!story) {
    return {
      title: '新闻未找到 - 好事网',
      description: '你追踪的新闻太沙雕，已经逃出详情。'
    };
  }

  return {
    title: `${story.title} · 好事网`,
    description: story.subtitle
  };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const resolvedParams = await params;
  const story = memeNews.find(item => item.id === Number(resolvedParams.id));

  if (!story) {
    notFound();
  }

  const detailStory = story as MemeNewsItem;

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md border-4 border-black rounded-3xl p-8 shadow-[20px_20px_0px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="uppercase text-xs tracking-[0.5em] text-gray-500 mb-1">Meme新闻</p>
            <h1 className="text-4xl font-black text-gray-900 mb-2">{detailStory.title}</h1>
            <p className="text-lg text-purple-500 font-bold">{detailStory.tagline}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">分类：{detailStory.category}</p>
            <p className="text-sm text-gray-500">发布时间：{detailStory.publishedAt}</p>
            <p className="text-sm text-gray-500">来源：{detailStory.source}</p>
          </div>
        </div>

        <div
          className="relative rounded-2xl border-4 border-black overflow-hidden mb-6"
          style={{ height: 360 }}
        >
          <Image
            src={detailStory.imageUrl}
            alt={detailStory.title}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          {detailStory.detailParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="/" className="meme-button">
            返回首页
          </a>
          <div className="text-sm text-gray-500">
            记得把页面分享给朋友，让他们也一起来吐槽
          </div>
        </div>
      </div>
    </div>
  );
}

