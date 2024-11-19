// Xử lý đăng ký tài khoản
function registerUser() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    // Gửi dữ liệu đến API backend
    fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Đăng ký thành công!') {
                alert(data.message);
                window.location.href = '../Login/Login.html'; // Chuyển hướng đến trang đăng nhập
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.error('Lỗi:', err);
        });
}

// Gắn sự kiện vào nút đăng ký
document.querySelector('#register-btn').addEventListener('click', registerUser);
