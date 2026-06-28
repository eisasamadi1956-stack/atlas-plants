// ============================================================
//  ماژول مدیریت دیتابیس (LocalStorage)
// ============================================================

import { CONFIG } from '../config.js';

class Database {
    constructor() {
        this.key = CONFIG.DB_KEY;
        this.plants = [];
        this.load();
    }

    // بارگذاری از LocalStorage
    load() {
        const saved = localStorage.getItem(this.key);
        if (saved) {
            try {
                this.plants = JSON.parse(saved);
            } catch {
                this.plants = [];
            }
        } else {
            this.plants = [];
        }
        return this.plants;
    }

    // ذخیره در LocalStorage
    save() {
        localStorage.setItem(this.key, JSON.stringify(this.plants));
        return this.plants;
    }

    // دریافت همه گیاهان
    getAll() {
        return this.plants;
    }

    // جایگزینی همه گیاهان
    replaceAll(newPlants) {
        this.plants = newPlants;
        this.save();
        return this.plants;
    }

    // دریافت یک گیاه با ID
    getById(id) {
        return this.plants.find(p => p.id === id);
    }

    // افزودن گیاه جدید
    add(plant) {
        plant.id = Date.now();
        this.plants.push(plant);
        this.save();
        return plant;
    }

    // ویرایش گیاه
    update(id, newData) {
        const index = this.plants.findIndex(p => p.id === id);
        if (index !== -1) {
            newData.id = id;
            this.plants[index] = newData;
            this.save();
            return this.plants[index];
        }
        return null;
    }

    // حذف یک گیاه
    delete(id) {
        this.plants = this.plants.filter(p => p.id !== id);
        this.save();
        return this.plants;
    }

    // حذف همه گیاهان
    deleteAll() {
        this.plants = [];
        this.save();
        return this.plants;
    }

    // جستجو در گیاهان
    search(query) {
        const q = query.trim().toLowerCase();
        if (!q) return this.plants;
        return this.plants.filter(p =>
            (p.localName || '').toLowerCase().includes(q) ||
            (p.persianName || '').toLowerCase().includes(q) ||
            (p.scientificName || '').toLowerCase().includes(q) ||
            (p.family || '').toLowerCase().includes(q) ||
            (p.code || '').toLowerCase().includes(q)
        );
    }

    // تعداد کل گیاهان
    count() {
        return this.plants.length;
    }

    // دریافت ماه جاری شمسی
    getCurrentMonth() {
        const now = new Date();
        const month = now.getMonth();
        let persianMonthIndex = month + 2;
        if (persianMonthIndex >= 12) persianMonthIndex -= 12;
        return CONFIG.PERSIAN_MONTHS[persianMonthIndex];
    }

    // دریافت آلارم‌های امروز
    getAlerts() {
        const currentMonth = this.getCurrentMonth();
        const alerts = [];
        this.plants.forEach(p => {
            if (p.sprayMonth === currentMonth) {
                alerts.push({ name: p.localName || 'نامشخص', task: 'سم‌پاشی' });
            }
            if (p.fertilizeMonth === currentMonth) {
                alerts.push({ name: p.localName || 'نامشخص', task: 'کوددهی' });
            }
        });
        return alerts;
    }
}

// ایجاد یک نمونه واحد (Singleton)
const db = new Database();
export default db;