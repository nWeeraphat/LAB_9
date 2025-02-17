document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => {
            const postList = document.getElementById("posts-list");
            posts.forEach(post => {
                const div = document.createElement("div");
                div.classList.add("post-item");

                div.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <button class="view-comments-btn" data-post-id="${post.id}">ดูความคิดเห็น</button>
                    <div class="comments-section" id="comments-${post.id}" style="display: none;"></div>
                `;

                postList.appendChild(div);
            });

            // เพิ่ม Event Listener ให้ปุ่ม "ดูความคิดเห็น"
            document.querySelectorAll(".view-comments-btn").forEach(button => {
                button.addEventListener("click", () => {
                    const postId = button.getAttribute("data-post-id");
                    const commentSection = document.getElementById(`comments-${postId}`);

                    if (commentSection.style.display === "none") {
                        // ดึงความคิดเห็นจาก API และแสดง
                        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                            .then(response => response.json())
                            .then(comments => {
                                commentSection.innerHTML = ""; // ล้างค่าก่อนเพิ่ม
                                comments.forEach(comment => {
                                    const commentDiv = document.createElement("div");
                                    commentDiv.classList.add("comment-item");
                                    commentDiv.innerHTML = `
                                        <p><strong>${comment.name}</strong> (${comment.email})</p>
                                        <p>${comment.body}</p>
                                    `;
                                    commentSection.appendChild(commentDiv);
                                });
                                commentSection.style.display = "block"; // แสดงความคิดเห็น
                                button.textContent = "ซ่อนความคิดเห็น";
                            })
                            .catch(error => console.error("Error fetching comments:", error));
                    } else {
                        // ซ่อนความคิดเห็น
                        commentSection.style.display = "none";
                        button.textContent = "ดูความคิดเห็น";
                    }
                });
            });
        })
        .catch(error => console.error("Error fetching posts:", error));
});