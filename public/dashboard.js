// Загружаем тикеты из сервера (PostgreSQL)
async function loadTickets() {
    const tbody = document.getElementById("ticket-body");
    tbody.innerHTML = "";

    try {
        const res = await fetch("/api/tickets");
        const tickets = await res.json();

        tickets.forEach(ticket => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${ticket.visitor}</td>
                <td>${ticket.student_id}</td>
                <td>${ticket.category}</td>
                <td>${ticket.status}</td>
                <td>
                    ${ticket.status === "Queue"
                        ? `<button class="accept-btn" onclick="acceptTicket(${ticket.id})">Accept</button>`
                        : ""
                    }
                </td>
            `;

            tbody.appendChild(row);
        });

    } catch (err) {
        console.error("Ошибка загрузки тикетов:", err);
    }
}


// Принимаем тикет → обновляем статус в PostgreSQL
async function acceptTicket(id) {
    try {
        await fetch(`/api/tickets/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "In Progress" })
        });

        loadTickets(); // обновляем таблицу

    } catch (err) {
        console.error("Ошибка обновления статуса:", err);
    }
}


// Загружаем тикеты при старте
loadTickets();
