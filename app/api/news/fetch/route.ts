import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// 百度热榜API接口
const BAIDU_API_URL = 'https://api.yyy001.com/api/bdhot';

// 从环境变量读取API密钥
const API_KEY = process.env.BAIDU_API_KEY;

if (!API_KEY) {
  console.error('BAIDU_API_KEY 环境变量未设置');
}

// 将百度热榜数据转换为MemeNewsItem格式
function transformBaiduNewsToMemeNews(baiduNews: any[], index: number): any {
  const categories = ['科技', '金融', '政治', '本质'];
  const emojis = ['😵‍💫', '😺', '🤖', '🐛', '🔒', '💡', '🎯', '🔥'];
  const authors = [
    '社区评论 · 小小程序员',
    '猫系开发组 · Mew',
    'AI 智囊团 · 小吃货',
    '生活的哲学家 · 小程',
    '安全组 · 老张',
    '吃瓜群众 · 路人甲',
    '技术大牛 · 老李',
    '沙雕网友 · 小王'
  ];
  
  // 根据tag判断是否为紧急新闻
  const isBreaking = baiduNews.tag === '沸' || baiduNews.tag === '热';
  
  // 随机选择分类和评论
  const category = categories[index % categories.length];
  const emoji = emojis[index % emojis.length];
  const author = authors[index % authors.length];
  
  // 生成评论内容（基于标题）
  const commentTexts = [
    `这个${baiduNews.title}，我也要学！`,
    `${baiduNews.title}？生产环境都开始自检了。`,
    `这个功能我也想点一晚炸鸡套餐。`,
    `${baiduNews.title}也要陪伴才不会寂寞。`,
    `我宁愿加十个VPN也不让这个公开。`,
    `这个${baiduNews.title}，真是好事儿啊！`,
    `${baiduNews.title}，技术大牛都惊呆了！`,
    `沙雕网友表示：${baiduNews.title}`
  ];
  
  return {
    id: index + 1,
    title: baiduNews.title || '无标题',
    subtitle: baiduNews.desc || '暂无描述',
    snippet: baiduNews.desc || '暂无描述',
    detailParagraphs: [
      baiduNews.desc || '暂无详细内容',
      `热搜指数：${baiduNews.hot_index || 0}`,
      `标签：${baiduNews.tag || '普通'}`
    ],
    category: category,
    likes: Math.floor((baiduNews.hot_index || 1000) / 1000), // 根据热搜指数生成点赞数
    imageUrl: baiduNews.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    isBreaking: isBreaking,
    publishedAt: new Date().toLocaleString('zh-CN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    source: '百度热榜',
    tagline: `${baiduNews.tag || '普通'} · 热搜指数 ${baiduNews.hot_index || 0}`,
    highlightComment: {
      author: author,
      text: commentTexts[index % commentTexts.length],
      emoji: emoji
    }
  };
}

export async function GET() {
  try {
    // 检查API密钥是否存在
    if (!API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: 'API密钥未配置，请在.env.local文件中设置BAIDU_API_KEY',
        },
        { status: 500 }
      );
    }

    // 调用百度热榜API
    const response = await fetch(
      `${BAIDU_API_URL}?apikey=${API_KEY}&tab=realtime`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const apiData = await response.json();
    
    if (apiData.code !== 200 || !Array.isArray(apiData.data)) {
      throw new Error(`API返回数据格式错误: ${apiData.msg || '未知错误'}`);
    }

    // 转换数据格式
    const transformedNews = apiData.data
      .slice(0, 20) // 只取前20条
      .map((item: any, index: number) => transformBaiduNewsToMemeNews(item, index));

    // 确保data目录存在
    const dataDir = join(process.cwd(), 'data');
    try {
      await mkdir(dataDir, { recursive: true });
    } catch (error: any) {
      // 目录可能已存在，忽略错误
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }

    // 保存到News.json文件
    const filePath = join(dataDir, 'News.json');
    await writeFile(filePath, JSON.stringify(transformedNews, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: '新闻数据获取并保存成功',
      count: transformedNews.length,
      data: transformedNews
    });
  } catch (error: any) {
    console.error('获取新闻失败:', error);
    return NextResponse.json(
      {
        success: false,
        message: '获取新闻失败',
        error: error.message
      },
      { status: 500 }
    );
  }
}

