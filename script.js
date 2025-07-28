let items = [];

function addItem() {
    const desc = document.getElementById('itemDesc').value.trim();
    const qty = parseInt(document.getElementById('itemQty').value);
    const price = parseFloat(document.getElementById('itemPrice').value);
    const discount = parseFloat(document.getElementById('itemDiscount').value) || 0;
    const cgst = parseFloat(document.getElementById('itemCGST').value) || 0;
    const sgst = parseFloat(document.getElementById('itemSGST').value) || 0;

    if (!desc || isNaN(qty) || qty < 1 || isNaN(price) || price < 0) {
        alert('Please enter valid item details.');
        return;
    }

    items.push({ desc, qty, price, discount, cgst, sgst });

    // Clear fields
    document.getElementById('itemDesc').value = '';
    document.getElementById('itemQty').value = 1;
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemDiscount').value = '';
    document.getElementById('itemCGST').value = '';
    document.getElementById('itemSGST').value = '';
    document.getElementById('itemDesc').focus();

    renderItems();
}

function removeItem(index) {
    items.splice(index, 1);
    renderItems();
}

function renderItems() {
    const tbody = document.querySelector('#itemsTable tbody');
    tbody.innerHTML = '';

    let grossTotal = 0;       // Before discount
    let totalDiscount = 0;
    let totalCGST = 0;
    let totalSGST = 0;

    items.forEach((item, i) => {
        const originalTotal = item.qty * item.price;
        const discountAmount = originalTotal * (item.discount / 100);
        const baseTotal = originalTotal - discountAmount;
        const cgstAmount = baseTotal * (item.cgst / 100);
        const sgstAmount = baseTotal * (item.sgst / 100);
        const itemTotal = baseTotal + cgstAmount + sgstAmount;

        grossTotal += originalTotal;
        totalDiscount += discountAmount;
        totalCGST += cgstAmount;
        totalSGST += sgstAmount;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${item.desc}</td>
            <td>${item.qty}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.discount}%</td>
            <td>${item.cgst}%</td>
            <td>${item.sgst}%</td>
            <td>₹${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${i})">X</button></td>
        `;
        tbody.appendChild(tr);
    });

    const grandTotal = grossTotal - totalDiscount + totalCGST + totalSGST;

    document.getElementById('subtotal').textContent = grossTotal.toFixed(2);
    document.getElementById('discountTotal').textContent = totalDiscount.toFixed(2);
    document.getElementById('cgstTotal').textContent = totalCGST.toFixed(2);
    document.getElementById('sgstTotal').textContent = totalSGST.toFixed(2);
    document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
}

function generateInvoice() {
    const invoiceNo = document.getElementById('invoiceNo').value.trim();
    const invoiceDate = document.getElementById('invoiceDate').value;
    const clientName = document.getElementById('clientName').value.trim();

    if (!invoiceNo || !invoiceDate || !clientName || items.length === 0) {
        alert('Please fill all invoice details and add at least one item.');
        return;
    }

    const sellerDetails = `
        <div style="font-size:14px;">
            <strong>Kumawat Enterprises</strong><br>
            SHOP NO-4 PRATAP NAGAR-302033<br>
            kumawatenterprises@gmail.com<br>
            GSTIN: 27DPAUC1177K1OZ
        </div>`;

    function generateCopy(copyType) {
        let grossTotal = 0, totalDiscount = 0, totalCGST = 0, totalSGST = 0;

        let html = `
            <div style="padding:20px; border: 1px dashed #000; margin-bottom: 30px;">
                 <h3 style="display:none; text-align:center;">${copyType}</h3>
                <div style="display:flex; justify-content:space-between; margin-bottom: 10px;">
                    <div style="font-size:14px;">
                        <strong>Invoice #${invoiceNo}</strong><br>
                        Date: ${invoiceDate}<br>
                        Client: ${clientName}
                    </div>
                    ${sellerDetails}
                </div>

                <table style="width:100%;margin-top:10px;border-collapse:collapse;" border="1">
                    <tr>
                        <th>S.No.</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Unit Price (₹)</th>
                        <th>Discount %</th>
                        <th>CGST %</th>
                        <th>SGST %</th>
                        <th>Total (₹)</th>
                    </tr>
        `;

        items.forEach((item, i) => {
            const originalTotal = item.qty * item.price;
            const discountAmount = originalTotal * (item.discount / 100);
            const baseTotal = originalTotal - discountAmount;
            const cgstAmount = baseTotal * (item.cgst / 100);
            const sgstAmount = baseTotal * (item.sgst / 100);
            const itemTotal = baseTotal + cgstAmount + sgstAmount;

            grossTotal += originalTotal;
            totalDiscount += discountAmount;
            totalCGST += cgstAmount;
            totalSGST += sgstAmount;

            html += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${item.desc}</td>
                    <td>${item.qty}</td>
                    <td>₹${item.price.toFixed(2)}</td>
                    <td>${item.discount}%</td>
                    <td>${item.cgst}%</td>
                    <td>${item.sgst}%</td>
                    <td>₹${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        });

        const grandTotal = grossTotal - totalDiscount + totalCGST + totalSGST;

        html += `
                </table>
                <div style="text-align:right;margin-top:10px;font-size:14px;">
                    Subtotal: ₹${grossTotal.toFixed(2)}<br>
                    Total Discount: ₹${totalDiscount.toFixed(2)}<br>
                    Total CGST: ₹${totalCGST.toFixed(2)}<br>
                    Total SGST: ₹${totalSGST.toFixed(2)}<br>
                    <strong>Grand Total: ₹${grandTotal.toFixed(2)}</strong>
                </div>
            </div>
        `;

        return html;
    }

    const output = document.getElementById('invoiceOutput');
    
   output.innerHTML = `
    <div>
        ${generateCopy("Seller Copy")}
        ${generateCopy("Customer Copy")}
    </div>
`;


    output.style.display = 'block';
    document.getElementById('printBtn').disabled = false;
}



function printInvoice() {
    const output = document.getElementById('invoiceOutput').innerHTML;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write('<html><head><title>Invoice</title></head><body>');
    win.document.write(output);
    win.document.write('</body></html>');
    win.print();
    win.close();
}

function resetInvoice() {
    document.getElementById('invoiceNo').value = '';
    document.getElementById('invoiceDate').value = '';
    document.getElementById('clientName').value = '';
    document.getElementById('itemDesc').value = '';
    document.getElementById('itemQty').value = 1;
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemDiscount').value = '';
    document.getElementById('itemCGST').value = '';
    document.getElementById('itemSGST').value = '';
    items = [];
    renderItems();
    document.getElementById('invoiceOutput').style.display = 'none';
    document.getElementById('printBtn').disabled = true;
}

// Keyboard Navigation
function setupKeyboardNavigation() {
    const fields = [
        'invoiceNo',
        'invoiceDate',
        'clientName',
        'itemDesc',
        'itemQty',
        'itemPrice',
        'itemDiscount',
        'itemCGST',
        'itemSGST'
    ];

    for (let i = 0; i < fields.length; i++) {
        const current = document.getElementById(fields[i]);
        const nextId = fields[i + 1];

        current.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (nextId) {
                    document.getElementById(nextId).focus();
                } else {
                    document.getElementById('addBtn').click();
                }
            }
        });
    }
}

window.onload = function () {
    setupKeyboardNavigation();
    document.getElementById('invoiceNo').focus();
};

// Initial render
renderItems();


// DARK MODE CODE

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

// Load theme from localStorage
window.onload = function () {
    setupKeyboardNavigation();
    document.getElementById('invoiceNo').focus();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
};

// DARK MODE CODE ENDS

