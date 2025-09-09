// قائمة المنتجات مقسمة إلى أقسام
const products = {
    fridge: [
        { name: "زيت هالة", unit: "= تنكة" },
        { name: "جبن سائل شيدر فرشلي", unit: "= علبة" },
        { name: "مخلل كنوز", unit: "= سطل" },
        { name: "مناديل ماكس رول النسر", unit: "= كرتون" },
        { name: "ورق ساندويتش فالكون", unit: "= كرتون" },
        { name: "أكياس نفايات", unit: "= جوال" },
        { name: "عصير ربيع", unit: "= كرتون" },
        { name: "شطة رنا", unit: "= جالون" },
        { name: "كاتشب رنا", unit: "= جالون" },
        { name: "كاتشب شفرات", unit: "= شفرات" },
        { name: "ماء - نوفا", unit: "= كرتون" },
        { name: "صحن عربي", unit: "= كيس" },
        { name: "صحن بطاطس", unit: "= كيس" },
        { name: "قصدير الطاهي", unit: "= رول" },
        { name: "منظف - بخاخ موبي", unit: "= علبة" },
        { name: "قفاز طبي", unit: "= كرتون" },
        { name: "كمامات لون أزرق", unit: "= كرتون" },
        { name: "شوكة طعام", unit: "= كرتون" },
        { name: "صابون جلي صحون", unit: "= جالون" },
        { name: "كلوركس 30 لتر", unit: "= جالون" },
        { name: "سلك غسيل مواعين", unit: "= درزن" },
        { name: "إسفنج غسيل مواعين", unit: "= درزن" },
        { name: "غطاء الرأس", unit: "= كرتون" },
        { name: "أكياس الطيبين الكبيرة", unit: "= كيس" },
        { name: "أكياس الطيبين الصغيرة", unit: "= كيس" },
        { name: "عسل", unit: "= علبة" }
    ],
    sauces: [
        { name: "ثوم عادي", unit: "كيس" },
        { name: "صوص الطيبين", unit: "كيس" }
    ],
    potatoes: [
        { name: "بطاطس", unit: "كرتون" }
    ],
    chicken: [
        { name: "سيخ دجاج 10 كيلو", unit: "سيخ" },
        { name: "سيخ دجاج 15 كيلو", unit: "سيخ" },
        { name: "سيخ دجاج 20 كيلو", unit: "سيخ" },
        { name: "سيخ دجاج 25 كيلو", unit: "سيخ" },
        { name: "سيخ دجاج 30 كيلو", unit: "سيخ" }
    ]
};

// تحميل المنتجات في جداول الطلبات
function loadProductTables() {
    const tables = {
        fridge: document.getElementById("fridgeTable"),
        sauces: document.getElementById("saucesTable"),
        potatoes: document.getElementById("potatoesTable"),
        chicken: document.getElementById("chickenTable")
    };
    Object.keys(products).forEach(category => {
        tables[category].innerHTML = "";
        products[category].forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.unit}</td>
                <td><input type="number" min="0" data-product="${product.name}" data-category="${category}" placeholder="0"></td>
            `;
            tables[category].appendChild(row);
        });
    });
}

// تحميل الطلبات من LocalStorage بناءً على الفرع
function loadOrders() {
    const branch = document.getElementById("branch").value;
    const savedOrders = JSON.parse(localStorage.getItem(`orders_${branch}`)) || {};
    document.querySelectorAll("#orderForm input[type='number']").forEach(input => {
        const productName = input.getAttribute("data-product");
        input.value = savedOrders[productName] || "";
    });
    displayReports();
}
{
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

// إعداد الاتصال بـ MongoDB
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/tayyibeen?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('متصل بقاعدة البيانات'));

app.use(cors());
app.use(express.json());

// نموذج لطلبات
const orderSchema = new mongoose.Schema({
    branch: String,
    orders: Object,
    timestamp: String
});
const Order = mongoose.model('Order', orderSchema);

// API لاسترجاع الطلبات
app.get('/api/orders', async (req, res) => {
    const branch = req.query.branch;
    const orders = await Order.find({ branch });
    res.json(orders);
});

// API لإضافة طلب
app.post('/api/orders', async (req, res) => {
    const { branch, orders } = req.body;
    const timestamp = new Date().toLocaleString("ar-EG");
    const newOrder = new Order({ branch, orders, timestamp });
    await newOrder.save();
    res.json({ message: 'تم إضافة الطلب بنجاح' });
});

// API لمسح طلبات فرع
app.delete('/api/orders', async (req, res) => {
    const branch = req.query.branch;
    await Order.deleteMany({ branch });
    res.json({ message: 'تم مسح الطلبات بنجاح' });
});

app.listen(port, () => {
    console.log(`الخادم يعمل على http://localhost:${port}`);
});

}
// حفظ الطلبات في LocalStorage بناءً على الفرع
function saveOrders() {
    const branch = document.getElementById("branch").value;
    const orders = {};
    document.querySelectorAll("#orderForm input[type='number']").forEach(input => {
        const productName = input.getAttribute("data-product");
        const quantity = input.value;
        if (quantity) {
            orders[productName] = quantity;
        }
    });
    localStorage.setItem(`orders_${branch}`, JSON.stringify(orders));
}

// إرسال الطلب
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const branch = document.getElementById("branch").value;
    saveOrders();
    const orders = JSON.parse(localStorage.getItem(`orders_${branch}`)) || {};
    const timestamp = new Date().toLocaleString("ar-EG");
    const report = { branch, timestamp, orders };
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push(report);
    localStorage.setItem("reports", JSON.stringify(reports));
    alert(`تم إرسال طلب فرع ${branch} بنجاح!`);
    displayReports();
});

// مسح الطلبات
document.getElementById("clearOrders").addEventListener("click", function() {
    const branch = document.getElementById("branch").value;
    if (confirm(`هل أنت متأكد من مسح طلبات فرع ${branch}؟`)) {
        localStorage.removeItem(`orders_${branch}`);
        document.querySelectorAll("#orderForm input[type='number']").forEach(input => {
            input.value = "";
        });
        alert("تم مسح الطلبات بنجاح!");
        displayReports();
    }
});

// عرض التقارير
function displayReports() {
    const branch = document.getElementById("branch").value;
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const reportContent = document.getElementById("reportContent");
    reportContent.innerHTML = "";
    const filteredReports = reports.filter(report => report.branch === branch);
    filteredReports.forEach(report => {
        const reportDiv = document.createElement("div");
        reportDiv.innerHTML = `<h4>طلب فرع ${report.branch} بتاريخ: ${report.timestamp}</h4>`;
        const categories = {
            "طلبية الثلاجة": products.fridge,
            "طلبية الصوصات": products.sauces,
            "طلبية البطاطس": products.potatoes,
            "طلبية الدجاج": products.chicken
        };
        Object.entries(categories).forEach(([categoryName, categoryProducts]) => {
            const table = document.createElement("table");
            table.innerHTML = `
                <thead>
                    <tr>
                        <th colspan="2">${categoryName}</th>
                    </tr>
                    <tr>
                        <th>المنتج</th>
                        <th>الكمية</th>
                    </tr>
                </thead>
                <tbody>
                    ${categoryProducts
                        .filter(product => report.orders[product.name])
                        .map(product => `
                            <tr>
                                <td>${product.name}</td>
                                <td>${report.orders[product.name]}</td>
                            </tr>
                        `).join("")}
                </tbody>
            `;
            reportDiv.appendChild(table);
        });
        reportContent.appendChild(reportDiv);
    });
}

// تحميل المنتجات والطلبات عند تحميل الصفحة
window.onload = function() {
    loadProductTables();
    loadOrders();
};