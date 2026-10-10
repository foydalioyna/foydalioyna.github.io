# GitHub'ga har kuni yuklash (6 kun)

Bu papkadagi skriptlar loyihani **6 kun davomida, har kuni bir marta** GitHub'ga
commit + push qiladi. **Bugun = 1-kun.**

## Qanday boshlanadi

1. GitHub'da **bo'sh** repozitoriy yarating (README, .gitignore qo'shmang — bo'sh bo'lsin).
2. Shu papkadagi **`sozlash.bat`** ni ikki marta bosing.
3. So'raladi:
   - **GitHub repo URL** — masalan `https://github.com/username/foydali-oyna.git`
   - **Git username** — GitHub foydalanuvchi nomingiz
   - **Git email** — emailingiz
   - **Branch** — Enter (standart: `main`)
   - **Necha kun** — Enter (standart: `6`)
4. Skript Git o'rnatilmagan bo'lsa **winget orqali avtomatik o'rnatadi**.
5. Keyin **1-kunni hoziroq yuklaydi**.
6. Oxirida "har kuni avtomatik yuklashni yoqaymi?" deb so'raydi — **ha** deng va
   vaqtni kiriting (masalan `10:00`). Shunda Windows Task Scheduler vazifasi yaratiladi.

Shundan keyin har kuni belgilangan vaqtda kompyuter yoqilgan bo'lsa, avtomatik
commit + push bo'ladi. 6-kundan keyin skript o'zi to'xtaydi va vazifani o'chiradi.

## Qo'lda boshqarish

| Fayl | Vazifasi |
|------|----------|
| `sozlash.bat` | Birinchi sozlash (bir marta) |
| `yuklash.bat` | Hozir, qo'lda yuklash |
| `vazifani-ochirish.bat` | Kunlik avtomatik vazifani o'chirish |

## Muhim: autentifikatsiya (parol emas!)

GitHub endi parol bilan push qabul qilmaydi. Variantlar:

- **Eng oson:** `sozlash.bat` ni qo'lda ishga tushirganingizda GitHub login oynasi
  chiqadi. **Personal Access Token** (PAT) ni parol o'rniga kiriting.
  Token: GitHub → Settings → Developer settings → Personal access tokens →
  Fine-grained tokens → **Contents: Read and write** ruxsati bilan yarating.
- Windows Credential Manager tokenni eslab qoladi, keyingi kunlar avtomatik ishlaydi.
- Alternativ: **SSH kalit** ishlatish.

> Agar push "Authentication failed" bilan to'xtasa, `yuklash.bat` ni qo'lda bir marta
> ishga tushirib, login qiling. Shundan keyin avtomatik rejim ishlaydi.

## Ichida nima bo'ladi

- `_github/config.json` — sozlamalar (repo, ism, kun soni).
- `_github/holat.json` — boshlanish sanasi va oxirgi yuklangan kun (repoga qo'shilmaydi).
- `_github/yuklash.log` — har bir urinish tarixi (repoga qo'shilmaydi).
- `KUNLAR.md` — har kun shu faylga bitta yozuv qo'shiladi (shu sabab har kuni
  o'zgarish bo'ladi va commit bo'sh qolmaydi). Buni GitHub'da ko'rishingiz mumkin.

## Boshqa kompyuterda / qaytadan boshlash

- `_github/holat.json` ni o'chirsangiz, hisob **bugundan yana 1-kun** bo'lib boshlanadi.
- Vaqtni o'zgartirish: `vazifani-ochirish.bat`, keyin `sozlash.bat` ni qayta ishga
  tushirib yangi vaqt kiriting.
