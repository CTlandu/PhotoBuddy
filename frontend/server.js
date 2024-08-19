const express = require('express');
const path = require('path');

const app = express();

// 提供静态文件
app.use(express.static(path.join(__dirname, 'dist')));

// 处理所有其他请求，返回 index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Frontend server is running on port ${PORT}`);
});
