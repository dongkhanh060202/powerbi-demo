const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'mysecretkey';

// Middleware
app.use(express.json());

// Đọc dữ liệu từ file JSON
function readUsers() {
    const data = fs.readFileSync('./backend/users.json', 'utf-8');
    return JSON.parse(data);
}

// Ghi dữ liệu vào file JSON
function writeUsers(users) {
    fs.writeFileSync('./backend/users.json', JSON.stringify(users, null, 2));
}

// API: Đăng ký người dùng
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu!' });
    }

    const users = readUsers();

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'Email đã tồn tại!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    writeUsers(users);

    res.status(201).json({ message: 'Đăng ký thành công!' });
});

// API: Đăng nhập
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu!' });
    }

    const users = readUsers();
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({ message: 'Sai email hoặc mật khẩu!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Sai email hoặc mật khẩu!' });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Đăng nhập thành công!', token });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
