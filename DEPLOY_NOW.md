# 🚀 نشر LEX AI — خطوات فورية (10 دقائق)

## ما تحتاجه:
- حساب Vercel مجاني: vercel.com
- مفتاح Anthropic API: console.anthropic.com (مجاني)

---

## الخطوات (10 دقائق)

### 1. رفع الكود على GitHub
- اذهب إلى github.com/new
- اسم المشروع: lexai
- ارفع جميع الملفات

### 2. ربط Vercel
- اذهب إلى vercel.com
- "Add New Project" ← اختر الـ repository
- اضغط Deploy

### 3. إضافة متغيرات البيئة
في Vercel Dashboard → Settings → Environment Variables أضف:

| المتغير | القيمة |
|---------|--------|
| ANTHROPIC_API_KEY | sk-ant-api03-... |
| ACCESS_PASSWORD | كلمة_السر_الخاصة |

### 4. إعادة النشر
Deployments → Redeploy

### النتيجة
رابط مثل: https://lexai-yourname.vercel.app

---

## لكل عميل — نسخة مستقلة
- نفس الخطوات
- password مختلفة لكل عميل
- يمكن تخصيص الاسم في الرابط

## الأسعار
- Vercel: مجاني
- Anthropic API: ~0.003$ لكل تحليل (رخيص جداً)
