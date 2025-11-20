const API_URL = "http://localhost:5000/api";

// LOGIN
async function login() {
  const user_id = document.getElementById("user_id").value;
  const password = document.getElementById("password").value;

  if (!user_id || !password) {
    document.getElementById("msg").innerText = "All fields are required";
    return;
  }

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById("msg").innerText = data.message;
    return;
  }

  alert("Login successful!");
  window.location.href = "dashboard.html";
}

// REGISTER
async function registerUser() {
  const user_id = document.getElementById("user_id").value;
  const password = document.getElementById("password").value;

  if (!user_id || !password) {
    document.getElementById("msg").innerText = "All fields are required";
    return;
  }

  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById("msg").innerText = data.message;
    return;
  }

  alert("Account created successfully!");
  window.location.href = "index.html";
}
