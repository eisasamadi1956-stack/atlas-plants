// ============================================================
//  ماژول مدیریت آلارم‌ها
// ============================================================

import plantManager from './plantManager.js';
import uiRenderer from './uiRenderer.js';

class AlertManager {
    constructor() {
        this.intervalId = null;
    }

    // بررسی و نمایش آلارم‌ها
    checkAndShow() {
        const alerts = plantManager.getAlerts();
        uiRenderer.renderAlerts(alerts);
        return alerts;
    }

    // شروع بررسی دوره‌ای (هر ۵ دقیقه)
    startPeriodicCheck(interval = 300000) {
        if (this.intervalId) clearInterval(this.intervalId);
        this.checkAndShow();
        this.intervalId = setInterval(() => this.checkAndShow(), interval);
    }

    // توقف بررسی دوره‌ای
    stopPeriodicCheck() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

const alertManager = new AlertManager();
export default alertManager;