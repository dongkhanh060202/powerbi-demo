document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 1
    alert('Đăng nhập thành công!'); // 2
});

document.querySelector('.create-account-btn').addEventListener('click', function() {
    alert('Chuyển đến trang tạo tài khoản!'); // 3
});


// Đăng ký tài khoản
function registerUser() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(err => {
            console.error('Lỗi:', err);
        });
}

// Đăng nhập
function loginUser() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                alert('Đăng nhập thành công!');
                localStorage.setItem('token', data.token); // Lưu token
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.error('Lỗi:', err);
        });
}

// Liên kết các sự kiện với nút
document.querySelector('#register-btn').addEventListener('click', registerUser);
document.querySelector('#login-btn').addEventListener('click', loginUser);
