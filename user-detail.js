document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById("user-detail").innerHTML = `
                <h2>${user.name}</h2>
                <p><span>อีเมล</span><br>${user.email}</p>
                <p><span>ชื่อผู้ใช้</span><br>${user.username}</p>
                <p><span>เบอร์โทรศัพท์</span><br>${user.phone}</p>
                <p><span>เว็บไซต์</span><br>${user.website}</p>
                <p><span>ที่อยู่</span><br>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
                <p><span>บริษัท</span><br>${user.company.name}<br>${user.company.catchPhrase}</p>
            `;

            // อัปเดตลิงก์ของปุ่มดูโพสต์ทั้งหมด
            document.getElementById("view-posts").addEventListener("click", () => {
                window.location.href = `user-posts.html?id=${userId}`;
            });
        })
        .catch(error => console.error("Error fetching user details:", error));
});