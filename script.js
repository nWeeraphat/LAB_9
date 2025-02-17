document.addEventListener("DOMContentLoaded", async () => {
    const userList = document.getElementById("user-list");

    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await res.json();

        userList.innerHTML = users.map(user => `
            <div class="user-item">
                <a href="user-detail.html?id=${user.id}">${user.name}</a>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error fetching users:", error);
        userList.innerHTML = "<p>ไม่สามารถโหลดข้อมูลได้</p>";
    }
});
