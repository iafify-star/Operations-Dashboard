# WH Ops View — سكربت الكابستي + بوكمارك Created / Pending

الشيت: **WH Ops View** (تاب `OB` و `IB`).

| العمود | جاي منين |
|---|---|
| **Capacity** (OB) | شيت خطة الـ IB/OB، تاب `Daily view (...)`، صف تاريخ `OB!A2` |
| **Capacity** (IB — Today / MTD) | نفس الخطة: اليوم، ومجموع من أول الشهر لحد التاريخ |
| **Created** | كارت **Total Qty** في Minutes Central › Outbound › Picking لكل مخزن |
| **Pending** | كارت **Qty Pending for assignment** لكل مخزن |
| **%** | `Created ÷ Capacity` (وفي IB: `Received ÷ Capacity`) |

### ربط المخازن بأعمدة الخطة (`CONFIG` في أول `Code.gs`)

| WH | OB | IB |
|---|---|---|
| CAIID01 | OB AM Sort | IB AM Sort |
| CAIID02 | OB AM Non-sort | IB AM Non-sort |
| CAIID03 | OB TC - Chocolates | — |
| CAIID04 | OB TC - Chilled | — |
| CAIID03 & CAIID04 | — | IB TC - Chilled + IB TC - Chocolates |
| CAIID05 | OB FZ | IB FZ |
| CAIID06 | Xdock CAIID06 | Xdock CAIID06 |
| CAIID07 | Xdock CAIID07 | Xdock CAIID07 |

## التركيب (مرة واحدة)

1. افتح شيت **WH Ops View** › **Extensions › Apps Script**.
2. امسح اللي في `Code.gs` والصق محتوى [`Code.gs`](./Code.gs) ده، واعمل Save.
3. **Deploy › New deployment** › النوع **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone within noon** (أو Anyone with Google account)
   - Deploy، ووافق على الصلاحيات.
4. ارجع للشيت واعمل Refresh — هتلاقي قائمة **⚙️ Ops View**.
5. **⚙️ Ops View › 🔖 هات البوكمارك** › افتح اللينك › اسحب الزرار الأصفر **🔄 Ops View Sync** لشريط البوكماركس.
6. (اختياري) **⚙️ Ops View › ⏰ شغّل تحديث الكابستي كل ساعة**.

> لو عدّلت الكود بعدين: **Deploy › Manage deployments › Edit › Version: New version** عشان اللينك يفضل هو هو.

## الاستخدام اليومي

- افتح Minutes Central › Outbound › Picking (أي تاريخ — البوكمارك بياخد التاريخ من `from` في اللينك) ودوس **🔄 Ops View Sync**.
- هيظهر مربع صغير فوق على اليمين بيقرا كل مخزن (CAIID01 → CAIID07)، وبعدها يفتح تاب فيها ✅ والأرقام اللي اتكتبت.
- نفس الضغطة بتحدّث الكابستي كمان.
- الكابستي لوحده: **⚙️ Ops View › 🔄 حدّث الكابستي دلوقتي**.

## شهر جديد

**⚙️ Ops View › ➕ ضيف شيت خطة لشهر جديد** والصق لينك شيت الشهر (لازم فيه تاب اسمه يبدأ بـ `Daily view`). السكربت بيدور في كل الشيتات المضافة على التاريخ.

## ملاحظات

- التاريخ اللي بيتحسب عليه الكابستي هو `OB!A2`. لو عايزه يمشي لوحده خلّيه `=TODAY()`.
- آخر تحديث بيتكتب في `OB!G1:H2`.
- البوكمارك محمي بتوكن متخزن في السكربت؛ لو اتسرّب امسح `PUSH_TOKEN` من Project Settings › Script properties وهات البوكمارك من جديد.
