// ============================================================
//  ماژول خروجی اکسل
// ============================================================

import plantManager from './plantManager.js';

class ExcelExport {
    exportToCSV() {
        const plants = plantManager.getAll();

        if (plants.length === 0) {
            alert('هیچ گیاهی برای خروجی وجود ندارد!');
            return;
        }

        const headers = ['کد', 'نام محلی', 'نام فارسی', 'خانواده', 'نام علمی', 'نوع گیاه', 'ارتفاع', 'نیاز آبی', 'تحمل سرما',
            'اولویت کاشت', 'توصیه فنی', 'ماه سم‌پاشی', 'ماه کوددهی'
        ];

        let csv = headers.join(',') + '\n';

        plants.forEach(p => {
            const row = [
                p.code || '',
                p.localName || '',
                p.persianName || '',
                p.family || '',
                p.scientificName || '',
                p.plantType || '',
                p.height || '',
                p.waterNeed || '',
                p.coldTolerance || '',
                p.adaptPriority || '',
                p.techPattern || '',
                p.sprayMonth || '',
                p.fertilizeMonth || ''
            ];
            csv += row.join(',') + '\n';
        });

        // اضافه کردن BOM برای پشتیبانی از فارسی در اکسل
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `اطلس_گیاهان_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    }
}

const excelExport = new ExcelExport();
export default excelExport;