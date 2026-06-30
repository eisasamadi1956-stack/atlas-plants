// ============================================================
//  ماژول رندر رابط کاربری
// ============================================================

import plantManager from './plantManager.js';

class UIRenderer {
    constructor() {
        this.cardContainer = document.getElementById('cardContainer');
        this.listContainer = document.getElementById('plantListContainer');
        this.alertBox = document.getElementById('alertBox');
        this.alertList = document.getElementById('alertList');
        this.totalCount = document.getElementById('totalCount');
        this.countBadge = document.getElementById('countBadge');
        this.lastUpdate = document.getElementById('lastUpdate');
    }

    // ---------- رندر شناسنامه ----------
    renderCard(data) {
        const imgHtml = data.imageData ? `<img src="${data.imageData}" class="plant-image">` : '';

        let scheduleHtml = '';
        if (data.sprayMonth) {
            scheduleHtml += `<div class="schedule-item">🧪 سم‌پاشی: <span class="month-badge">${data.sprayMonth}</span></div>`;
        }
        if (data.fertilizeMonth) {
            scheduleHtml += `<div class="schedule-item">🌱 کوددهی: <span class="month-badge">${data.fertilizeMonth}</span></div>`;
        }

        this.cardContainer.innerHTML = `
            <div class="plant-card">
                <h2>
                    ${imgHtml}
                    <span>🌿 ${data.localName} (${data.persianName || ''})</span>
                </h2>
                <div style="display:flex; flex-wrap:wrap; gap:6px 18px; background:#f1f8e9; padding:10px; border-radius:12px; margin-bottom:16px;">
                    <span><strong>کد:</strong> ${data.code || '---'}</span>
                    <span><strong>خانواده:</strong> ${data.family || '---'}</span>
                    <span><strong>نام علمی:</strong> ${data.scientificName || '---'}</span>
                    <span><strong>نوع:</strong> ${data.plantType || '---'}</span>
                    <span><strong>منشأ:</strong> ${data.origin || '---'}</span>
                </div>

                <h3 style="color:#1e4d2b; border-right:4px solid #2e7d32; padding-right:10px;">۱. مشخصات مورفولوژیک</h3>
                <div class="grid-2">
                    ${this._renderItem('ارتفاع', data.height)}
                    ${this._renderItem('عرض تاج', data.width)}
                    ${this._renderItem('فرم تاج', data.crownForm)}
                    ${this._renderItem('سرعت رشد', data.growthRate)}
                    ${this._renderItem('نوع برگ', data.leafType)}
                    ${this._renderItem('رنگ برگ', data.leafColor)}
                    ${this._renderItem('رنگ پاییزه', data.fallColor)}
                    ${this._renderItem('نوع گل', data.flowerType)}
                    ${this._renderItem('رنگ گل', data.flowerColor)}
                    ${this._renderItem('فصل گلدهی', data.flowerSeason)}
                    ${this._renderItem('میوه‌دهی', data.fruitTime)}
                    ${this._renderItem('ریشه', data.rootSystem)}
                    ${this._renderItem('وضعیت برگ', data.leafStatus)}
                </div>

                <h3 style="color:#1e4d2b; border-right:4px solid #2e7d32; padding-right:10px; margin-top:20px;">۲. مشخصات اکولوژیک</h3>
                <div class="grid-2">
                    ${this._renderItem('نیاز نوری', data.light)}
                    ${this._renderItem('نیاز آبی', data.waterNeed)}
                    ${this._renderItem('تحمل گرما', data.heatTolerance)}
                    ${this._renderItem('تحمل خشکی', data.droughtTolerance)}
                    ${this._renderItem('تحمل یخبندان', data.frostTolerance)}
                    ${this._renderItem('تحمل سرما', data.coldTolerance)}
                    ${this._renderItem('تحمل شوری خاک', data.saltTolerance)}
                    ${this._renderItem('حداقل دما', data.minTemp)}
                    ${this._renderItem('تحمل باد', data.windTolerance)}
                    ${this._renderItem('تحمل شوری آب', data.waterSalt)}
                    ${this._renderItem('تحمل گردوغبار', data.dustTolerance)}
                    ${this._renderItem('تحمل آلودگی هوا', data.airPollution)}
                </div>

                <h3 style="color:#1e4d2b; border-right:4px solid #2e7d32; padding-right:10px; margin-top:20px;">۳. کاشت و نگهداری</h3>
                <div class="grid-2">
                    ${this._renderItem('فاصله کاشت', data.spacing)}
                    ${this._renderItem('فصل کاشت', data.plantingSeason)}
                    ${this._renderItem('قطر چاله', data.holeDiameter)}
                    ${this._renderItem('عمق چاله', data.holeDepth)}
                    ${this._renderItem('خاک مناسب', data.soilType)}
                    ${this._renderItem('pH', data.phRange)}
                    ${this._renderItem('زهکشی', data.drainage)}
                    ${this._renderItem('مالچ', data.mulch)}
                    ${this._renderItem('قیم', data.stake)}
                    ${this._renderItem('آبیاری سال اول', data.waterFirstYear)}
                    ${this._renderItem('آبیاری استقرار', data.waterEstablished)}
                    ${this._renderItem('هرس', data.pruningNeed + ' - ' + data.pruningType)}
                    ${this._renderItem('آفات', data.pests)}
                    ${this._renderItem('بیماری‌ها', data.diseases)}
                    ${this._renderItem('کود', data.fertilizer)}
                </div>

                ${scheduleHtml ? `
                    <h3 style="color:#1e4d2b; border-right:4px solid #2e7d32; padding-right:10px; margin-top:20px;">🗓️ زمانبندی عملیات</h3>
                    ${scheduleHtml}
                ` : ''}

                <h3 style="color:#1e4d2b; border-right:4px solid #2e7d32; padding-right:10px; margin-top:20px;">۴. اقتصادی و کاربردی</h3>
                <div class="grid-2">
                    ${this._renderItem('هزینه کاشت', data.costPlanting)}
                    ${this._renderItem('قیمت نهال', data.price)}
                    ${this._renderItem('عمر اقتصادی', data.economicLife)}
                    ${this._renderItem('هزینه نگهداری', data.costMaintenance)}
                    ${this._renderItem('امتیاز اقتصادی', data.economicScore)}
                    ${this._renderItem('هزینه جایگزینی', data.replacementCost)}
                </div>
                <div style="margin-top:10px;">
                    ${this._renderItem('کارکردهای اکولوژیک', data.ecoFunctions)}
                    ${this._renderItem('کاربری‌های مناسب', data.suitableUses)}
                </div>

                <h3 style="color:#1e4d2b; border-right:4px solid #2e7d32; padding-right:10px; margin-top:20px;">۵. سازگاری و توصیه فنی</h3>
                <div class="grid-2">
                    ${this._renderItem('سازگاری با کم‌آبی', data.adaptWater)}
                    ${this._renderItem('سازگاری اقلیمی', data.adaptClimate)}
                    ${this._renderItem('تحمل گرمای تابستان', data.adaptHeat)}
                    ${this._renderItem('تحمل سرمای زمستان', data.adaptCold)}
                    ${this._renderItem('پتانسیل توسعه', data.adaptPotential)}
                    ${this._renderItem('اولویت کاشت', data.adaptPriority)}
                </div>
                <div class="item"><strong>محدودیت‌ها:</strong> ${data.adaptLimitations || '---'}</div>
                <div style="margin-top:12px; background:#e8f5e9; padding:12px; border-radius:10px;">
                    <strong>🔹 توصیه فنی:</strong><br>
                    الگوی کاشت: ${data.techPattern || '---'} | فاصله از پیاده‌رو: ${data.techSetback || '---'} | ترکیب: ${data.techCombo || '---'} | تعداد: ${data.techQty || '---'} | سرانه آب: ${data.techWater || '---'}
                </div>

                <h3 style="color:#1e4d2b; border-right:4px solid #2e7d32; padding-right:10px; margin-top:20px;">۶. مشخصات نهالستان</h3>
                <div class="grid-2">
                    ${this._renderItem('ارتفاع نهال', data.nHeight)}
                    ${this._renderItem('حجم گلدان', data.nPotSize)}
                    ${this._renderItem('زنده‌مانی', data.nSurvival)}
                    ${this._renderItem('سن نهال', data.nAge)}
                    ${this._renderItem('قطر یقه', data.nCollar)}
                    ${this._renderItem('وضعیت ریشه', data.nRoot)}
                </div>

                <div style="margin-top:20px; border-top:2px solid #ccc; padding-top:12px; display:flex; justify-content:space-between; font-size:13px; color:#555; flex-wrap:wrap; gap:8px;">
                    <span>📅 تاریخ تهیه: ${new Date().toLocaleDateString('fa-IR')}</span>
                    <span>🏷️ کد: ${data.code || '---'}</span>
                    <span style="color:#2e7d32; font-weight:bold;">👤 تهیه‌کننده: عیسی صمدی پشتگل</span>
                </div>
            </div>
        `;
    }

    // ---------- رندر لیست گیاهان ----------
    renderList(filtered) {
        if (!filtered || filtered.length === 0) {
            this.listContainer.innerHTML = '<div style="text-align:center;color:#888;padding:40px 0;">🌱 هیچ گیاهی پیدا نشد.</div>';
            return;
        }

        const isAdmin = plantManager.isAdmin();

        let html = '';
        filtered.forEach(p => {
            const thumb = p.imageData ?
                `<img src="${p.imageData}" class="thumb">` :
                `<div class="thumb" style="background:#e0e0e0;display:flex;align-items:center;justify-content:center;font-size:24px;">🌿</div>`;

            let actions = '';
            if (isAdmin) {
                actions = `
                    <button class="btn btn-teal btn-sm" onclick="window.editPlant(${p.id})" title="ویرایش">✏️</button>
                    <button class="btn btn-red btn-sm" onclick="window.deletePlant(${p.id})" title="حذف">🗑️</button>
                `;
            }

            html += `
                <div class="plant-list-item">
                    <div class="info">
                        ${thumb}
                        <div class="click-area" onclick="window.viewPlant(${p.id})">
                            <strong>${p.localName || 'نامشخص'}</strong>
                            <span style="color:#555;font-size:13px;">${p.persianName || ''} | ${p.family || ''}</span>
                            <br><span style="font-size:12px;color:#777;">کد: ${p.code || '---'} | علمی: ${p.scientificName || '---'}</span>
                            ${p.sprayMonth ? `<span style="font-size:11px;color:#e65100;">🧪 ${p.sprayMonth}</span>` : ''}
                            ${p.fertilizeMonth ? `<span style="font-size:11px;color:#2e7d32;">🌱 ${p.fertilizeMonth}</span>` : ''}
                        </div>
                    </div>
                    <div class="action-buttons">
                        <span class="badge-count">${p.adaptPriority || '---'}</span>
                        ${actions}
                    </div>
                </div>
            `;
        });
        this.listContainer.innerHTML = html;
    }

    // ---------- رندر آلارم‌ها ----------
    renderAlerts(alerts) {
        if (alerts.length > 0) {
            this.alertBox.style.display = 'block';
            let listHtml = '';
            alerts.forEach(a => {
                listHtml += `
                    <li>
                        <span class="plant-name">🌿 ${a.name}</span>
                        → <span class="task-type">${a.task}</span>
                    </li>
                `;
            });
            this.alertList.innerHTML = listHtml;
        } else {
            this.alertBox.style.display = 'none';
        }
    }

    // ---------- به‌روزرسانی آمار ----------
    updateStats(count, lastUpdate) {
        this.totalCount.textContent = count;
        this.countBadge.textContent = count;
        this.lastUpdate.textContent = lastUpdate;
    }

    // ---------- آیتم کمک‌رسان ----------
    _renderItem(label, value) {
        return `<div class="item"><strong>${label}:</strong> ${value || '---'}</div>`;
    }
}

const uiRenderer = new UIRenderer();
export default uiRenderer;