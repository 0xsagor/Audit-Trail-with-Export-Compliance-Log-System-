let logs = JSON.parse(localStorage.getItem("auditTrail")) || [];

function addEvent(action) {
  logs.unshift({
    id: Date.now(),
    action,
    time: new Date().toISOString()
  });

  localStorage.setItem("auditTrail", JSON.stringify(logs));
  render();
}

function exportLogs() {
  const data = JSON.stringify(logs, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "audit-trail.json";
  a.click();

  URL.revokeObjectURL(url);
}

function render() {
  const list = document.getElementById("logs");
  list.innerHTML = "";

  logs.forEach(log => {
    const li = document.createElement("li");
    li.innerText = `[${log.time}] ${log.action}`;
    list.appendChild(li);
  });
}

render();
