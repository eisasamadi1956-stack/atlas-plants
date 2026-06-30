// ============================================================
//  برنامه اصلی - نقطه ورود
// ============================================================

import plantManager from './modules/plantManager.js';
import uiRenderer from './modules/uiRenderer.js';
import formHandler from './modules/formHandler.js';
import alertManager from './modules/alertManager.js';
import excelExport from './modules/excelExport.js';
import { CONFIG } from './config.js';

// ============================================================
//  توابع عمومی (قابل دسترس از HTML)
// ============================================================

// ---------- ورود به مدیریت ----------
window.loginAsAdmin = function() {
    const password = prompt('🔑 برای دسترسی مدیریت، رمز عبور را وارد کنید:');
    if (password === CONFIG.ADMIN_PASSWORD) {
        plantManager.setAdmin(true);
        document.getElementById('adminBadge').style.display = 'inline-block';
        document.getElementById('adminForm').style.display = 'block';
        document.getElementById('viewOnlyMessage').style.display = 'none';
        document.getElementById('viewBanner').style.display = 'none';
        document.getElementById('deleteAllBtn').style.display = 'inline-block';
        document.getElementById('logoutBtn').style.display = 'inline-block';
        document.body.classList.remove('view-mode');
        window.renderList();
        alert('✅ شما به حالت مدیریت وارد شدید.');
    } else if (password !== null) {
        alert('❌ رمز عبور اشتباه است!');
    }
};

// ---------- خروج از مدیریت ----------
window.logoutAdmin = function() {
    plantManager.setAdmin(false);
    document.getElementById('adminBadge').style.display = 'none';
    document.getElementById('adminForm').style.display = 'none';
    document.getElementById('viewOnlyMessage').style.display = 'block';
    document.getElementById('viewBanner').style.display = 'block';
    document.getElementById('deleteAllBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
    document.body.classList.add('view-mode');
    window.renderList();
    alert('🔒 شما از حالت مدیریت خارج شدید.');
};

// ---------- ذخیره گیاه ----------
window.savePlant = function() {
    if (!plantManager.isAdmin()) {
        alert('❌ شما دسترسی مدیریت ندارید!');
        return;
    }

    const data = formHandler.getData();
    if (!data.localName.trim()) {
        alert('لطفاً حداقل «نام محلی» گیاه را وارد کنید!');
        return;
    }

    const saved = plantManager.save(data);
    if (saved) {
        const msg = plantManager.isEditing() ? 'ویرایش' : 'ذخیره';
        alert(`✅ گیاه "${saved.localName}" با موفقیت ${msg} شد!`);
        formHandler.clear();
        window.renderAll();
        window.switchTab('listTab');
    }
};

// ---------- ویرایش گیاه ----------
window.editPlant = function(id) {
    if (!plantManager.isAdmin()) {
        alert('❌ شما دسترسی مدیریت ندارید!');
        return;
    }

    const plant = plantManager.startEdit(id);
    if (plant) {
        formHandler.setData(plant);
        formHandler.showEditMode();
        window.switchTab('formTab');
        window.scrollTo(0, 0);
    }
};

// ---------- مشاهده گیاه (فقط نمایش) ----------
window.viewPlant = function(id) {
    const plant = plantManager.getById(id);
    if (plant) {
        uiRenderer.renderCard(plant);
        window.switchTab('previewTab');
        window.scrollTo(0, 0);
    }
};

// ---------- حذف گیاه ----------
window.deletePlant = function(id) {
    if (!plantManager.isAdmin()) {
        alert('❌ شما دسترسی مدیریت ندارید!');
        return;
    }

    const plant = plantManager.getById(id);
    if (!plant) return;
    if (confirm(`⚠️ آیا مطمئن هستید که گیاه "${plant.localName}" را حذف کنید؟`)) {
        plantManager.delete(id);
        window.renderAll();
        alert(`✅ گیاه "${plant.localName}" حذف شد.`);
    }
};

// ---------- حذف همه ----------
window.deleteAllPlants = function() {
    if (!plantManager.isAdmin()) {
        alert('❌ شما دسترسی مدیریت ندارید!');
        return;
    }
    if (plantManager.count() === 0) return;
    if (confirm('⚠️ آیا مطمئن هستید که همه گیاهان را حذف کنید؟')) {
        plantManager.deleteAll();
        window.renderAll();
        alert('همه گیاهان حذف شدند.');
    }
};

// ---------- انصراف از ویرایش ----------
window.cancelEdit = function() {
    formHandler.cancelEdit();
    formHandler.clear();
};

// ---------- نمایش شناسنامه ----------
window.generateCard = function() {
    const data = formHandler.getData();
    if (!data.localName.trim()) {
        alert('لطفاً ابتدا نام گیاه را وارد کنید یا از لیست یک گیاه را انتخاب کنید.');
        return;
    }
    uiRenderer.renderCard(data);
    window.switchTab('previewTab');
};

// ---------- خروجی اکسل ----------
window.exportExcel = function() {
    excelExport.exportToCSV();
};

// ---------- تغییر تب ----------
window.switchTab = function(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    const buttons = document.querySelectorAll('.tabs button');
    const map = { 'formTab': 0, 'listTab': 1, 'previewTab': 2 };
    if (map[tabId] !== undefined) {
        buttons[map[tabId]].classList.add('active');
    }

    if (tabId === 'listTab') window.renderList();
    if (tabId === 'previewTab') {
        const container = document.getElementById('cardContainer');
        if (!container.innerHTML.trim() && plantManager.count() > 0) {
            uiRenderer.renderCard(plantManager.getAll()[0]);
        }
    }
};

// ---------- پاک کردن فرم ----------
window.clearForm = function() {
    formHandler.clear();
};

// ---------- پیش‌نمایش عکس ----------
window.previewImage = function(event) {
    formHandler.previewImage(event.target.files[0]);
};

// ---------- رندر لیست ----------
window.renderList = function() {
    const search = document.getElementById('searchInput').value.trim();
    const filtered = plantManager.search(search);
    uiRenderer.renderList(filtered);
};

// ---------- رندر همه ----------
window.renderAll = function() {
    window.renderList();
    const count = plantManager.count();
    const lastUpdate = plantManager.getLastUpdate();
    uiRenderer.updateStats(count, lastUpdate);
    alertManager.checkAndShow();

    if (count > 0) {
        const container = document.getElementById('cardContainer');
        if (!container.innerHTML.trim()) {
            uiRenderer.renderCard(plantManager.getAll()[0]);
        }
    }
};

// ============================================================
//  بارگذاری اطلاعات از Google Sheets
// ============================================================
async function loadFromGoogleSheets() {
    try {
        const response = await fetch(CONFIG.GOOGLE_SHEETS_URL);
        const csvData = await response.text();

        const lines = csvData.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());

        const newPlants = [];
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const values = lines[i].split(',').map(v => v.trim());
            const plant = {};
            headers.forEach((h, index) => {
                plant[h] = values[index] || '';
            });
            plant.id = i;
            newPlants.push(plant);
        }

        if (newPlants.length > 0) {
            plantManager.replaceAll(newPlants);
            window.renderAll();
            plantManager.saveToLocalStorage();
        }
    } catch (error) {
        console.error('خطا در بارگذاری از Google Sheets:', error);
        if (plantManager.count() === 0) {
            document.getElementById('plantListContainer').innerHTML = `
                <div style="text-align:center;color:#e53935;padding:40px;">
                    <div style="font-size:48px;">⚠️</div>
                    <h3>خطا در ارتباط با سرور</h3>
                    <p>لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.</p>
                    <button onclick="location.reload()" style="margin-top:15px;padding:10px 30px;background:#2e7d32;color:white;border:none;border-radius:8px;cursor:pointer;">🔄 تلاش مجدد</button>
                </div>
            `;
        }
    }
}

// ============================================================
//  اجرای اولیه
// ============================================================

// بارگذاری از LocalStorage
plantManager.loadFromLocalStorage();

// اگر اطلاعاتی وجود داشت، نمایش بده
if (plantManager.count() > 0) {
    window.renderAll();
} else {
    // وگرنه از Google Sheets بارگذاری کن
    loadFromGoogleSheets();
}

// هر ۵ دقیقه از Google Sheets به‌روزرسانی کن
setInterval(loadFromGoogleSheets, CONFIG.ALERT_INTERVAL);

// نمایش پیام در کنسول
console.log('🌿 برنامه اطلس گیاهان با معماری ماژولار راه‌اندازی شد!');
console.log(`📊 تعداد گیاهان: ${plantManager.count()}`);
console.log('🔑 برای ورود به مدیریت، روی دکمه "ورود مدیریت" کلیک کنید');
console.log(`🔑 رمز پیش‌فرض: ${CONFIG.ADMIN_PASSWORD}`);
console.log('📁 برای تغییر لینک Google Sheets و رمز، فایل config.js را ویرایش کنید.');