# 新闻API使用说明

## 概述

本项目集成了百度热榜API，可以自动获取实时新闻并保存到本地`News.json`文件中，前端页面会自动从该文件加载新闻数据。

## API端点

### 1. 获取并保存新闻数据

**端点**: `/api/news/fetch`

**方法**: `GET`

**功能**: 
- 调用百度热榜API获取实时热搜数据
- 将数据转换为网站所需的格式
- 保存到 `data/News.json` 文件中

**使用方式**:
```bash
# 在浏览器中访问
http://localhost:3000/api/news/fetch

# 或使用curl
curl http://localhost:3000/api/news/fetch
```

**返回示例**:
```json
{
  "success": true,
  "message": "新闻数据获取并保存成功",
  "count": 20,
  "data": [...]
}
```

### 2. 加载新闻数据

**端点**: `/api/news/load`

**方法**: `GET`

**功能**: 
- 从 `data/News.json` 文件中读取新闻数据
- 供前端页面使用

**使用方式**:
```bash
# 在浏览器中访问
http://localhost:3000/api/news/load

# 或使用curl
curl http://localhost:3000/api/news/load
```

**返回示例**:
```json
{
  "success": true,
  "message": "新闻数据加载成功",
  "count": 20,
  "data": [...]
}
```

## 使用流程

1. **首次使用**:
   - 启动开发服务器: `npm run dev`
   - 访问 `http://localhost:3000/api/news/fetch` 获取并保存新闻数据
   - 刷新首页 `http://localhost:3000`，页面会自动从 `News.json` 加载数据

2. **更新新闻**:
   - 定期访问 `/api/news/fetch` 更新新闻数据
   - 可以设置定时任务（cron）自动更新

3. **前端自动加载**:
   - 首页会自动调用 `/api/news/load` 加载数据
   - 如果 `News.json` 不存在或为空，会使用默认的模拟数据

## 数据格式转换

API会自动将百度热榜的数据格式转换为网站所需的 `MemeNewsItem` 格式：

- `title`: 新闻标题
- `subtitle`: 新闻描述
- `snippet`: 新闻摘要
- `category`: 自动分类（科技、金融、政治、本质）
- `likes`: 根据热搜指数计算
- `imageUrl`: 新闻图片
- `isBreaking`: 根据tag判断（"沸"或"热"为紧急新闻）
- `highlightComment`: 自动生成的精选评论

## 注意事项

1. **API密钥**: API密钥已配置在 `/app/api/news/fetch/route.ts` 中
2. **数据存储**: 新闻数据保存在项目根目录的 `data/News.json` 文件中
3. **数据更新**: 建议每小时或每天更新一次，避免频繁调用API
4. **错误处理**: 如果API调用失败，前端会自动使用默认的模拟数据

## 定时更新（可选）

可以使用以下方式设置定时更新：

### 使用cron（Linux/Mac）
```bash
# 每小时更新一次
0 * * * * curl http://localhost:3000/api/news/fetch
```

### 使用Node.js脚本
创建一个 `scripts/update-news.js` 文件，然后使用 `node-cron` 或 `setInterval` 定时调用API。

