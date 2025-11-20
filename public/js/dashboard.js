/* ============================================================
   SNACKMASTER DASHBOARD — JavaScript Logic
   This file handles:
   - Navigation
   - User display
   - Machines list
   - Machine details
   - Refill system
   - CSV inventory processor
   - LocalStorage simulation (until backend added)
   ============================================================ */

// ------------------------------
// 1. DEFAULT USER (TEMPORARY)
// ------------------------------
let currentUser = {
    id: "user001",
    name: "Snackmaster User",
    role: "Operator"
};

// ------------------------------
// 2. SAMPLE MACHINES (3 Machines)
// ------------------------------
let machines = [
    {
        id: "M-001",
        name: "Admin Block Vending",
        location: "Hyderabad - Block A",
        lastRefill: "2025-01-15",
        products: [
            { id: "P-101", name: "Coke Can", stock: 10 },
            { id: "P-102", name: "Chips", stock: 5 },
            { id: "P-103", name: "Chocolate Bar", stock: 2 }
        ],
        refillHistory: []
    },
    {
        id: "M-002",
        name: "Library Vending Machine",
        location: "Hyderabad - Library",
        lastRefill: "2025-01-17",
        products: [
            { id: "P-101", name: "Coke Can", stock: 12 },
            { id: "P-104", name: "Water Bottle", stock: 20 },
            { id: "P-105", name: "Energy Bar", stock: 3 }
        ],
        refillHistory: []
    },
    {
        id: "M-003",
        name: "Canteen Snacks Hub",
        location: "Hyderabad - Canteen",
        lastRefill: "2025-01-12",
        products: [
            { id: "P-102", name: "Chips", stock: 7 },
            { id: "P-106", name: "Cold Coffee", stock: 4 },
            { id: "P-107", name: "Muffins", stock: 1 }
        ],
        refillHistory: []
    }
];

// Store machines in localStorage (temporary backend)
if (!localStorage.getItem("machines")) {
    localStorage.setItem("machines", JSON.stringify(machines));
}
machines = JSON.parse(localStorage.getItem("machines"));


// ------------------------------------------------
// 3. NAVIGATION — PAGE SWITCHING
// ------------------------------------------------
const pages = {
    dashboard: document.getElementById("dashboardPage"),
    details: document.getElementById("detailsPage"),
    refill: document.getElementById("refillPage"),
    csvtool: document.getElementById("csvToolPage")
};

function showPage(pageName) {
    Object.values(pages).forEach(p => p.style.display = "none");
    pages[pageName].style.display = "block";

    document.getElementById("page-title").innerText =
        pageName === "csvtool" ? "CSV Inventory Tool"
        : pageName === "details" ? "Machine Details"
        : pageName === "refill" ? "Refill Machine"
        : "Dashboard";
}

// Sidebar click
document.querySelectorAll(".nav-links li").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".nav-links li").forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        showPage(item.dataset.page);
    });
});


// ------------------------------------------------
// 4. USER DISPLAY
// ------------------------------------------------
function loadUser() {
    document.getElementById("userDisplayName").innerText = currentUser.name;
}
loadUser();

function logout() {
    alert("You have been logged out.");
    window.location.href = "index.html";
}


// ------------------------------------------------
// 5. DASHBOARD — MACHINE LIST
// ------------------------------------------------
function loadMachines() {
    const container = document.getElementById("machineList");
    container.innerHTML = "";

    machines.forEach(machine => {
        const lowStock = machine.products.filter(p => p.stock <= 5).length;
        const statusClass =
            lowStock >= 2 ? "status-warning"
            : lowStock >= 3 ? "status-error"
            : "status-active";

        const card = document.createElement("div");
        card.classList.add("machine-card");
        card.innerHTML = `
            <div class="machine-header">
                <span class="machine-id">${machine.id}</span>
                <span class="machine-status ${statusClass}">
                    ${lowStock >= 3 ? "Low Stock" : "Active"}
                </span>
            </div>

            <div class="machine-info">
                <div><span class="label">Name:</span> <span>${machine.name}</span></div>
                <div><span class="label">Location:</span> <span>${machine.location}</span></div>
                <div><span class="label">Products:</span> <span>${machine.products.length}</span></div>
            </div>

            <div class="machine-actions">
                <button class="btn btn-primary" onclick="openDetails('${machine.id}')">Details</button>
                <button class="btn btn-warning" onclick="openRefill('${machine.id}')">Refill</button>
            </div>
        `;
        container.appendChild(card);
    });
}
loadMachines();


// ------------------------------------------------
// 6. MACHINE DETAILS PAGE
// ------------------------------------------------
function openDetails(machineId) {
    const machine = machines.find(m => m.id === machineId);

    const lowStock = machine.products.filter(p => p.stock <= 5).length;
    const totalProducts = machine.products.length;

    const status =
        lowStock >= 3 ? `<span class="machine-status status-error">Critical</span>`
        : lowStock >= 1 ? `<span class="machine-status status-warning">Low Stock</span>`
        : `<span class="machine-status status-active">Healthy</span>`;

    // highlight low stock rows
    let productsHTML = machine.products.map(p => `
        <tr class="${p.stock <= 5 ? 'low-row' : ''}">
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td><strong>${p.stock}</strong></td>
        </tr>
    `).join("");

    // refill history table
    let refillHTML =
        machine.refillHistory.length === 0
            ? `<tr><td colspan="3">No refill activity yet.</td></tr>`
            : machine.refillHistory
                  .map(r => `
            <tr>
                <td>${r.productId}</td>
                <td>${r.qty}</td>
                <td>${new Date(r.date).toLocaleString()}</td>
            </tr>
        `).join("");

    const container = document.getElementById("detailsContent");

    container.innerHTML = `
        <!-- MACHINE INFO CARD -->
        <div class="info-section">
            <h3><i class="fa fa-building"></i> Machine Information</h3>

            <div class="info-item"><span class="info-label">Machine Name:</span> <span class="info-value">${machine.name}</span></div>
            <div class="info-item"><span class="info-label">Machine ID:</span> <span class="info-value">${machine.id}</span></div>
            <div class="info-item"><span class="info-label">Location:</span> <span class="info-value">${machine.location}</span></div>
            <div class="info-item"><span class="info-label">Last Refill:</span> <span class="info-value">${machine.lastRefill}</span></div>
        </div>

        <!-- STATUS SUMMARY CARD -->
        <div class="info-section">
            <h3><i class="fa fa-chart-pie"></i> Stock Overview</h3>

            <div class="info-item">
                <span class="info-label">Total Products:</span>
                <span class="info-value">${totalProducts}</span>
            </div>

            <div class="info-item">
                <span class="info-label">Low Stock Items:</span>
                <span class="info-value">${lowStock}</span>
            </div>

            <div class="info-item">
                <span class="info-label">Status:</span>
                <span>${status}</span>
            </div>
        </div>

        <!-- PRODUCTS TABLE -->
        <div class="info-section">
            <h3><i class="fa fa-box"></i> Products Stock</h3>

            <table class="table">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Stock</th>
                </tr>
                ${productsHTML}
            </table>
        </div>

        <!-- REFILL HISTORY -->
        <div class="info-section">
            <h3><i class="fa fa-history"></i> Refill History</h3>

            <table class="table">
                <tr>
                    <th>Product ID</th>
                    <th>Added Qty</th>
                    <th>Date</th>
                </tr>
                ${refillHTML}
            </table>
        </div>

        <!-- ACTION BUTTON -->
        <button class="btn btn-primary" onclick="openRefill('${machine.id}')">
            <i class="fa fa-plus"></i> Refill Machine
        </button>
    `;

    showPage("details");
}


function showDashboard() {
    showPage("dashboard");
}


// ------------------------------------------------
// 7. REFILL PAGE
// ------------------------------------------------
let currentRefillMachine = null;

function openRefill(machineId) {
    currentRefillMachine = machineId;
    const machine = machines.find(m => m.id === machineId);

    let rows = machine.products.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td><input type="number" min="0" value="0" class="form-control refill-input" data-pid="${p.id}"></td>
        </tr>
    `).join("");

    document.getElementById("refillContent").innerHTML = `
        <h3>${machine.name}</h3>

        <table class="table mt-3">
            <tr><th>ID</th><th>Name</th><th>Add Stock</th></tr>
            ${rows}
        </table>

        <button class="btn btn-primary" onclick="submitRefill()">Submit Refill</button>
    `;

    showPage("refill");
}

function submitRefill() {
    const machine = machines.find(m => m.id === currentRefillMachine);
    const inputs = document.querySelectorAll(".refill-input");

    inputs.forEach(input => {
        const qty = parseInt(input.value);
        const pid = input.dataset.pid;

        if (qty > 0) {
            const product = machine.products.find(p => p.id === pid);
            product.stock += qty;

            machine.refillHistory.push({
                productId: pid,
                qty,
                date: new Date().toISOString()
            });
        }
    });

    machine.lastRefill = new Date().toISOString().split("T")[0];

    localStorage.setItem("machines", JSON.stringify(machines));

    alert("Refill updated!");
    loadMachines();
    showDashboard();
}


// ------------------------------------------------
// 8. CSV TOOL
// ------------------------------------------------
async function processCSV() {
    const masterFile = document.getElementById("masterCSV").files[0];
    const salesFile = document.getElementById("salesCSV").files[0];

    if (!masterFile || !salesFile) {
        alert("Please upload both files.");
        return;
    }

    const master = await readCSV(masterFile);
    const sales = await readCSV(salesFile);

    const results = calculateInventory(master, sales);
    displayCSVResults(results);
}

function readCSV(file) {
    return new Promise(resolve => {
        Papa.parse(file, {
            header: true,
            complete: result => resolve(result.data)
        });
    });
}

function calculateInventory(master, sales) {
    const result = master.map(item => {
        const sold = sales
            .filter(s => s.product_id === item.product_id)
            .reduce((sum, s) => sum + Number(s.quantity_sold), 0);

        return {
            product_id: item.product_id,
            product_name: item.product_name,
            initial_stock: Number(item.initial_stock),
            sold,
            remaining: Number(item.initial_stock) - sold
        };
    });

    return result;
}

function displayCSVResults(list) {
    let html = `
        <table class="table mt-3">
            <tr>
                <th>ID</th><th>Name</th><th>Initial</th><th>Sold</th><th>Remaining</th>
            </tr>
    `;

    list.forEach(r => {
        html += `
            <tr>
                <td>${r.product_id}</td>
                <td>${r.product_name}</td>
                <td>${r.initial_stock}</td>
                <td>${r.sold}</td>
                <td>${r.remaining}</td>
            </tr>
        `;
    });

    html += "</table>";

    document.getElementById("csvResults").innerHTML = html;
}
