// ============================================================
//  ماژول مدیریت گیاهان
// ============================================================

import db from './database.js';
import { CONFIG } from '../config.js';

class PlantManager {
    constructor() {
        this.db = db;
        this.editingId = null;
        this.isAdminMode = false;
    }

    // ---------- وضعیت مدیریت ----------
    setAdmin(status) {
        this.isAdminMode = status;
    }

    isAdmin() {
        return this.isAdminMode;
    }

    // ---------- بارگذاری و ذخیره ----------
    loadFromLocalStorage() {
        return this.db.load();
    }

    saveToLocalStorage() {
        return this.db.save();
    }

    // ---------- دریافت اطلاعات ----------
    getAll() {
        return this.db.getAll();
    }

    getById(id) {
        return this.db.getById(id);
    }

    count() {
        return this.db.count();
    }

    getLastUpdate() {
        return new Date().toLocaleString('fa-IR');
    }

    search(query) {
        return this.db.search(query);
    }

    getAlerts() {
        return this.db.getAlerts();
    }

    getCurrentMonth() {
        return this.db.getCurrentMonth();
    }

    // ---------- جایگزینی همه ----------
    replaceAll(newPlants) {
        this.db.replaceAll(newPlants);
    }

    // ---------- ذخیره (افزودن یا ویرایش) ----------
    save(plantData) {
        if (this.editingId) {
            const updated = this.db.update(this.editingId, plantData);
            this.editingId = null;
            return updated;
        } else {
            return this.db.add(plantData);
        }
    }

    // ---------- ویرایش ----------
    startEdit(id) {
        this.editingId = id;
        return this.db.getById(id);
    }

    cancelEdit() {
        this.editingId = null;
    }

    isEditing() {
        return this.editingId !== null;
    }

    // ---------- حذف ----------
    delete(id) {
        this.db.delete(id);
        if (this.editingId === id) this.editingId = null;
    }

    deleteAll() {
        this.db.deleteAll();
        this.editingId = null;
    }

    // ---------- ایجاد نمونه پیش‌فرض ----------
    createDefault() {
        return { ...CONFIG.DEFAULT_PLANT, id: Date.now() };
    }
}

const plantManager = new PlantManager();
export default plantManager;