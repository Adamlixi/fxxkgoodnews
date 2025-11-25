import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    // 读取News.json文件
    const filePath = join(process.cwd(), 'data', 'News.json');
    const fileContent = await readFile(filePath, 'utf-8');
    const newsData = JSON.parse(fileContent);

    return NextResponse.json({
      success: true,
      message: '新闻数据加载成功',
      count: newsData.length,
      data: newsData
    });
  } catch (error: any) {
    // 如果文件不存在，返回空数据
    if (error.code === 'ENOENT') {
      return NextResponse.json({
        success: false,
        message: 'News.json文件不存在，请先调用/api/news/fetch获取数据',
        data: []
      });
    }

    console.error('读取新闻文件失败:', error);
    return NextResponse.json(
      {
        success: false,
        message: '读取新闻文件失败',
        error: error.message,
        data: []
      },
      { status: 500 }
    );
  }
}

