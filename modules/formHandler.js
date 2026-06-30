// ============================================================
//  ماژول مدیریت فرم
// ============================================================

import plantManager from './plantManager.js';

// لیست تمام فیلدهای فرم با شناسه‌های آنها
const FORM_FIELDS = {
    code: 'code',
    localName: 'localName',
    persianName: 'persianName',
    family: 'family',
    scientificName: 'scientificName',
    plantType: 'plantType',
    englishName: 'englishName',
    lifespan: 'lifespan',
    origin: 'origin',
    height: 'height',
    width: 'width',
    crownForm: 'crownForm',
    growthRate: 'growthRate',
    leafType: 'leafType',
    leafColor: 'leafColor',
    fallColor: 'fallColor',
    flowerType: 'flowerType',
    flowerColor: 'flowerColor',
    flowerSeason: 'flowerSeason',
    fruitTime: 'fruitTime',
    rootSystem: 'rootSystem',
    leafStatus: 'leafStatus',
    light: 'light',
    waterNeed: 'waterNeed',
    heatTolerance: 'heatTolerance',
    droughtTolerance: 'droughtTolerance',
    frostTolerance: 'frostTolerance',
    coldTolerance: 'coldTolerance',
    saltTolerance: 'saltTolerance',
    minTemp: 'minTemp',
    windTolerance: 'windTolerance',
    waterSalt: 'waterSalt',
    dustTolerance: 'dustTolerance',
    airPollution: 'airPollution',
    spacing: 'spacing',
    plantingSeason: 'plantingSeason',
    holeDiameter: 'holeDiameter',
    holeDepth: 'holeDepth',
    soilType: 'soilType',
    phRange: 'phRange',
    drainage: 'drainage',
    mulch: 'mulch',
    stake: 'stake',
    bedWidth: 'bedWidth',
    waterFirstYear: 'waterFirstYear',
    waterEstablished: 'waterEstablished',
    pruningNeed: 'pruningNeed',
    pruningType: 'pruningType',
    pests: 'pests',
    diseases: 'diseases',
    fertilizer: 'fertilizer',
    costPlanting: 'costPlanting',
    price: 'price',
    economicLife: 'economicLife',
    costMaintenance: 'costMaintenance',
    economicScore: 'economicScore',
    replacementCost: 'replacementCost',
    ecoFunctions: 'ecoFunctions',
    suitableUses: 'suitableUses',
    adaptWater: 'adaptWater',
    adaptClimate: 'adaptClimate',
    adaptHeat: 'adaptHeat',
    adaptCold: 'adaptCold',
    adaptPotential: 'adaptPotential',
    adaptPriority: 'adaptPriority',
    adaptLimitations: 'adaptLimitations',
    nHeight: 'nHeight',
    nPotSize: 'nPotSize',
    nSurvival: 'nSurvival',
    nAge: 'nAge',
    nCollar: 'nCollar',
    nRoot: 'nRoot',
    techPattern: 'techPattern',
    techSetback: 'techSetback',
    techCombo: 'techCombo',
    techQty: 'techQty',
    techWater: 'techWater',
    sprayMonth: 'sprayMonth',
    fertilizeMonth: 'fertilizeMonth'
};

class FormHandler {
    constructor() {
        this.imagePreview = document.getElementById('imagePreview');
        this.plantImage = document.getElementById('plantImage');
        this.editingBadge = document.getElementById('editingBadge');
        this.cancelBtn = document.getElementById('cancelEditBtn');
        this.saveBtn = document.querySelector('.btn-green');
    }

    // دریافت داده‌های فرم
    getData() {
        const data = {};
        for (const [key, id] of Object.entries(FORM_FIELDS)) {
            const el = document.getElementById(id);
            data[key] = el ? el.value : '';
        }
        data.imageData = this.imagePreview.src || '';
        return data;
    }

    // پر کردن فرم با داده‌ها
    setData(data) {
        for (const [key, id] of Object.entries(FORM_FIELDS)) {
            const el = document.getElementById(id);
            if (el) el.value = data[key] || '';
        }
        if (data.imageData) {
            this.imagePreview.src = data.imageData;
            this.imagePreview.style.display = 'block';
        } else {
            this.imagePreview.style.display = 'none';
            this.imagePreview.src = '';
        }
    }

    // خالی کردن فرم
    clear() {
        for (const [key, id] of Object.entries(FORM_FIELDS)) {
            const el = document.getElementById(id);
            if (el) el.value = '';
        }
        this.imagePreview.style.display = 'none';
        this.imagePreview.src = '';
        this.plantImage.value = '';
        this.cancelEdit();
    }

    // نمایش حالت ویرایش
    showEditMode() {
        this.editingBadge.style.display = 'inline-block';
        this.cancelBtn.style.display = 'inline-block';
        this.saveBtn.textContent = '💾 به‌روزرسانی گیاه';
    }

    // لغو حالت ویرایش
    cancelEdit() {
        this.editingBadge.style.display = 'none';
        this.cancelBtn.style.display = 'none';
        this.saveBtn.textContent = '💾 ذخیره گیاه';
        plantManager.cancelEdit();
    }

    // بررسی آیا در حالت ویرایش هستیم
    isEditing() {
        return plantManager.isEditing();
    }

    // پیش‌نمایش عکس
    previewImage(file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imagePreview.src = e.target.result;
                this.imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }
}

const formHandler = new FormHandler();
export default formHandler;