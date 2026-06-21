# ОФЕРТА ЗА ИЗРАБОТКА
## Emblema - Мобилно приложение + Web Admin + Backend API

---

| | |
|---|---|
| **Дата** | 21.06.2025 |
| **Валидност на офертата** | 30 дни |
| **Ставка разработка** | **40 € / час** (без ДДС) |
| **Метод на работа** | AI-assisted development (Cursor + Claude) |
| **Платформи** | iOS, Android, Web Admin |

---

## 1. Резюме

Настоящата оферта обхваща **пълна изработка** на платформата Emblema - мобилно приложение за жители, web панел за домоуправители и централен администратор, и централен backend с API.

**Smart Home модулът е извън обхват.** Отварянето на врати/гараж/бариера се реализира чрез **external link** към външна Smart Home система.

### Обобщена оценка

| Показател | Стойност |
|---|---|
| Общо часове (оценка) | **~1 120 ч.** |
| Ставка | 40 € / ч. |
| **Обща цена (оценка)** | **~44 800 €** (без ДДС) |
| Очакван срок | **5–7 месеца** (1 senior full-stack + периодичен QA) |

> Часовете са калибрирани за **AI-assisted разработка** (Cursor + Claude). Спрямо класическо ръчно писане на код, оценката е **~30–35% по-ниска** при запазване на същия функционален обхват. QA, интеграционно тестване и App Store submission не се намаляват пропорционално.

---

## 2. Обхват - какво включва

### ✅ Включено в офертата

| # | Модул | Описание |
|---|---|---|
| 1 | Backend & API | REST API, PostgreSQL, multi-tenancy, audit log |
| 2 | Auth & RBAC | 4 роли, JWT, одобрение на акаунти |
| 3 | Публична част (Mobile) | Новини, събития, спорт, лоялност, радио |
| 4 | Потребителски dashboard | Достъп до сгради, external Smart Home links |
| 5 | Автомобилни номера | CRUD, временен достъп, история |
| 6 | Building Manager панел | Потребители, достъп, съобщения, audit |
| 7 | Central Admin панел | Сгради, мениджъри, CMS, глобален log |
| 8 | Нотификации | Push (FCM/APNs), in-app, email |
| 9 | Сигурност | HTTPS, rate limiting, role isolation, 2FA (Admin/Manager) |
| 10 | Mobile App | iOS + Android (React Native), navigation, deep linking |
| 11 | Web Admin | Responsive React/Next.js панел |
| 12 | DevOps | CI/CD, staging + production, deployment |
| 13 | QA & UAT | Ръчно + автоматизирани тестове (критични пътища) |

### ❌ Извън обхват (бъдещ етап)

| Функционалност | Бележка |
|---|---|
| Smart Home модул (управление на врати/осветление) | External link only |
| Домофон в приложението | Следващ етап |
| LPR / разпознаване на номера | Изисква хардуер |
| Hikvision / Shelly интеграция | След хардуерен анализ |
| Marketplace / плащания | Не е в scope |
| Phone/OTP вход | Опционален add-on (виж §5) |

---

## 3. Разбивка по фази и модули

### ФАЗА 0 - Discovery & Setup
*Подготовка на проекта, архитектура, dev environments*

| ID | Задача | Часове | Цена (€) |
|---|---|---:|---:|
| P0-01 | Архитектурен документ + ER диаграма на базата | 8 | 320 |
| P0-02 | Repo setup, monorepo структура, linting, conventions | 8 | 320 |
| P0-03 | CI/CD pipeline (GitHub Actions / подобно) | 12 | 480 |
| P0-04 | Staging + Production environments (cloud hosting) | 12 | 480 |
| P0-05 | Design system basics (цветове, typography, компоненти) | 16 | 640 |
| | **Подtotal Фаза 0** | **56** | **2 240** |

---

### ФАЗА 1 - Backend Core & Auth
*Централен API, база данни, автентикация, RBAC*

| ID | Задача | Часове | Цена (€) |
|---|---|---:|---:|
| B-01 | Database schema + migrations (users, buildings, tenants) | 24 | 960 |
| B-02 | REST API scaffold (NestJS / Express + validation) | 16 | 640 |
| B-03 | JWT auth + refresh tokens + session management | 16 | 640 |
| B-04 | Registration / Login / Forgot password / Reset | 12 | 480 |
| B-05 | RBAC middleware - 4 роли (Public, User, Manager, Admin) | 20 | 800 |
| B-06 | Account approval workflow (pending → approved → building link) | 16 | 640 |
| B-07 | User profile API (read/update, change password) | 8 | 320 |
| B-08 | Audit log engine (всички чувствителни действия) | 20 | 800 |
| B-09 | Rate limiting, CORS, security headers | 8 | 320 |
| B-10 | 2FA за Admin & Manager роли (TOTP) | 16 | 640 |
| | **Подtotal Фаза 1** | **156** | **6 240** |

---

### ФАЗА 2 - Backend: Сгради, Достъп, Автомобили
*Бизнес логика за multi-tenancy и access management*

| ID | Задача | Часове | Цена (€) |
|---|---|---:|---:|
| B-11 | Building CRUD + структура (входове, гаражи, паркинги, бариери) | 24 | 960 |
| B-12 | Manager ↔ Building assignment (multi-tenant isolation) | 12 | 480 |
| B-13 | Access rights - постоянен / период / временен | 28 | 1 120 |
| B-14 | Vehicle plates CRUD + временен достъп + история | 20 | 800 |
| B-15 | Messaging API (building-wide / per user / per entrance) | 16 | 640 |
| B-16 | External Smart Home link config per entrance/garage/barrier | 8 | 320 |
| B-17 | Media upload (images for news, events, partners) | 12 | 480 |
| | **Подtotal Фаза 2** | **120** | **4 800** |

---

### ФАЗА 3 - Backend: CMS & Публично съдържание
*API за новини, събития, партньори, спорт, радио*

| ID | Задача | Часове | Цена (€) |
|---|---|---:|---:|
| B-18 | News CRUD + categories + publish/unpublish | 12 | 480 |
| B-19 | Events CRUD + date filtering | 12 | 480 |
| B-20 | Loyalty partners CRUD + categories + QR/barcode data | 16 | 640 |
| B-21 | Emblema Sport - venues CRUD | 12 | 480 |
| B-22 | Emblema Radio - stream URL / playlist config API | 6 | 240 |
| B-23 | Public API endpoints (без auth) за mobile app | 8 | 320 |
| | **Подtotal Фаза 3** | **66** | **2 640** |

---

### ФАЗА 4 - Нотификации
*Push, in-app, email*

| ID | Задача | Часове | Цена (€) |
|---|---|---:|---:|
| N-01 | Firebase FCM + APNs setup | 12 | 480 |
| N-02 | Push notification service (triggers, templates) | 16 | 640 |
| N-03 | In-app notification inbox API | 12 | 480 |
| N-04 | Email notifications (approval, messages, access removed) | 12 | 480 |
| N-05 | Notification preferences (opt-in/out per type) | 8 | 320 |
| | **Подtotal Фаза 4** | **60** | **2 400** |

---

### ФАЗА 5 - Mobile App (React Native)
*iOS + Android - публична и автентикирана част*

| ID | Задача | Часове | Цена (€) |
|---|---|---:|---:|
| M-01 | App shell, navigation (public vs authenticated), bottom tabs | 24 | 960 |
| M-02 | Auth screens (login, register, forgot password) | 16 | 640 |
| M-03 | News - list + detail + pull-to-refresh | 12 | 480 |
| M-04 | Events - list + detail + calendar filter | 12 | 480 |
| M-05 | Emblema Sport - list + detail | 12 | 480 |
| M-06 | Loyalty card - partners list + categories + detail + QR | 20 | 800 |
| M-07 | Emblema Radio - audio player + mini player + background | 24 | 960 |
| M-08 | User profile (view/edit, linked buildings read-only) | 12 | 480 |
| M-09 | My Access dashboard + external Smart Home link buttons | 16 | 640 |
| M-10 | My Vehicles - list + request add | 10 | 400 |
| M-11 | Messages / Inbox + mark as read | 14 | 560 |
| M-12 | Push notification handling + deep linking | 12 | 480 |
| M-13 | App icons, splash screen, store metadata prep | 8 | 320 |
| M-14 | iOS + Android build config, signing, TestFlight/Internal testing | 16 | 640 |
| | **Подtotal Фаза 5** | **208** | **8 320** |

---

### ФАЗА 6 - Web Admin Panel (React/Next.js)
*Building Manager + Central Admin*

| ID | Задача | Часове | Цена (€) |
|---|---|---:|---:|
| W-01 | Admin shell - layout, sidebar, responsive, auth guard | 20 | 800 |
| W-02 | **Manager:** User list + invite + remove + edit rights | 20 | 800 |
| W-03 | **Manager:** Access management UI (assign/remove, types, dates) | 28 | 1 120 |
| W-04 | **Manager:** Vehicle plates management + history | 16 | 640 |
| W-05 | **Manager:** Send messages + push trigger | 12 | 480 |
| W-06 | **Manager:** Audit log viewer (filtered) | 12 | 480 |
| W-07 | **Admin:** Building CRUD + structure editor | 24 | 960 |
| W-08 | **Admin:** Manager assignment to buildings | 10 | 400 |
| W-09 | **Admin:** Global user management + approval queue | 16 | 640 |
| W-10 | **Admin:** CMS - News, Events, Partners, Sport, Radio | 32 | 1 280 |
| W-11 | **Admin:** Global audit log | 12 | 480 |
| W-12 | Dashboard widgets (stats, recent activity) | 12 | 480 |
| | **Подtotal Фаза 6** | **214** | **8 560** |

---

### ФАЗА 7 - QA, Security Review & Launch
*Тестване, hardening, пускане в production*

| ID | Задача | Часове | Цена (€) |
|---|---|---:|---:|
| Q-01 | Automated tests - auth, RBAC, access logic (unit + integration) | 32 | 1 280 |
| Q-02 | Manual QA - mobile (iOS + Android) full regression | 24 | 960 |
| Q-03 | Manual QA - web admin full regression | 16 | 640 |
| Q-04 | Security review (OWASP basics, role isolation verification) | 12 | 480 |
| Q-05 | Performance testing (API load basics) | 8 | 320 |
| Q-06 | UAT support (2 итерации feedback fixes) | 24 | 960 |
| Q-07 | App Store + Google Play submission | 12 | 480 |
| Q-08 | Technical documentation + API docs (Swagger/OpenAPI) | 12 | 480 |
| Q-09 | Handover session + deployment runbook | 8 | 320 |
| | **Подtotal Фаза 7** | **148** | **5 920** |

---

### ФАЗА 8 - Project Management
*Координация, sprint planning, client communication*

| ID | Задача | Часове | Цена (€) |
|---|---|---:|---:|
| PM-01 | Sprint planning, weekly syncs, progress reports (~5–7 месеца) | 40 | 1 600 |
| PM-02 | Risk management, scope tracking, change requests | 16 | 640 |
| | **Подtotal Фаза 8** | **56** | **2 240** |

---

## 4. Обобщена таблица по фази

| Фаза | Описание | Часове | Цена (€) |
|---|---|---:|---:|
| 0 | Discovery & Setup | 56 | 2 240 |
| 1 | Backend Core & Auth | 156 | 6 240 |
| 2 | Backend: Сгради, Достъп, Автомобили | 120 | 4 800 |
| 3 | Backend: CMS & Публично съдържание | 66 | 2 640 |
| 4 | Нотификации | 60 | 2 400 |
| 5 | Mobile App (iOS + Android) | 208 | 8 320 |
| 6 | Web Admin Panel | 214 | 8 560 |
| 7 | QA, Security & Launch | 148 | 5 920 |
| 8 | Project Management | 56 | 2 240 |
| | **ОБЩО** | **1 084** | **43 360** |

> Закръглена офертна стойност: **~44 800 €** (без ДДС), включва ~3% contingency buffer.

---

## 5. Опционални add-ons

| ID | Add-on | Часове | Цена (€) |
|---|---|---:|---:|
| OPT-01 | Phone/OTP вход (SMS provider integration) | 24 | 960 |
| OPT-02 | Многоезичност (BG + EN) - i18n за app + admin | 40 | 1 600 |
| OPT-03 | Analytics dashboard (Mixpanel / Firebase Analytics) | 16 | 640 |
| OPT-04 | Offline mode за публично съдържание | 24 | 960 |
| OPT-05 | Dark mode (mobile + web) | 16 | 640 |
| OPT-06 | Допълнителен UAT цикъл | 16 | 640 |

---

## 6. Методология на оценката (AI-assisted)

| Активност | Класическа оценка | AI-assisted (Cursor + Claude) | Коефициент |
|---|---:|---:|---|
| CRUD / scaffold код | 100% | 40–50% | ×0.45 |
| UI компоненти / screens | 100% | 55–65% | ×0.60 |
| Бизнес логика / RBAC | 100% | 70–80% | ×0.75 |
| DevOps / infra setup | 100% | 75–85% | ×0.80 |
| QA & manual testing | 100% | 90–100% | ×0.95 |
| PM & documentation | 100% | 85–90% | ×0.88 |

**Пример:** News list screen - класически ~20 ч. → AI-assisted ~12 ч.

---

## 7. Предположения и условия

### Предположения
- Клиентът предоставя brand assets (лого, цветове, шрифтове) до началото на Фаза 5
- Smart Home external links (URL-и) се конфигурират от Admin - без custom интеграция
- Hosting разходи (AWS/GCP/DigitalOcean) **не са включени** - отделен месечен бюджет ~50–150 €/мес.
- Apple Developer + Google Play developer accounts - за сметка на клиента
- SMS provider за OTP (ако се добави) - за сметка на клиента

### Условия на плащане (предложение)
| Етап | % | Сума (€) | При |
|---|---:|---:|---|
| Аванс | 30% | ~13 440 | Подписване на договор |
| Milestone 1 | 25% | ~11 200 | Backend + Auth готов (Фаза 1–2) |
| Milestone 2 | 25% | ~11 200 | Mobile + Admin функционален (Фаза 5–6) |
| Final | 20% | ~8 960 | QA passed + App Store submission (Фаза 7) |

### Гаранция
- 30 дни bug-fix warranty след production launch (без нови features)

---

## 8. Технологичен стек (предложение)

| Слой | Технология |
|---|---|
| Mobile | React Native (Expo) |
| Web Admin | Next.js 14+ / React |
| Backend | NestJS (Node.js) + PostgreSQL |
| Auth | JWT + refresh tokens + optional 2FA |
| Push | Firebase Cloud Messaging |
| Hosting | Docker + cloud VPS / managed (Railway, Render, AWS) |
| CI/CD | GitHub Actions |

---

## 9. Timeline (ориентировъчен)

```
Месец 1    [Фаза 0 + Фаза 1]          Setup, Backend Core, Auth
Месец 2    [Фаза 2 + Фаза 3]          Buildings, Access, CMS API
Месец 3    [Фаза 4 + Фаза 5 начало]   Notifications, Mobile shell
Месец 4    [Фаза 5]                   Mobile features complete
Месец 5    [Фаза 6]                   Web Admin complete
Месец 6    [Фаза 7]                   QA, UAT, Launch
Месец 7    [Buffer]                   Fixes, App Store review
```

---

*Документът е генериран за оферта. За PDF: отворете `OFFERTA-Emblema-App.html` в браузър → Print → Save as PDF.*
