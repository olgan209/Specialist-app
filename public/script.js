async function login() {
    const specialist_id = document.getElementById("id").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specialist_id, password })
    });

    const data = await res.json();

    if (data.error) {
        document.getElementById("error").innerText = data.error;
    } else {
        window.location.href = "/success.html";
    }
}
