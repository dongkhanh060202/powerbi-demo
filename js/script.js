// Tải nội dung header và footer
document.addEventListener("DOMContentLoaded", function() {
    // Chèn header.html vào thẻ <header> trong trang HTML
    fetch("../includes/header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
        });

    // Chèn footer.html vào thẻ <footer> trong trang HTML
    fetch("../includes/footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        });
});
