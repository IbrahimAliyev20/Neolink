# Neolink — Hard Diagnostic Report

**Layihə:** `hr-vacancy` (Next.js 16, App Router, Turbopack, next-intl az/en/ru)
**Tarix:** 2026-07-24
**Əhatə:** `src/` altında ~120 fayl — funksionallıq, API çağırışları, input validasiyaları, i18n, routing, konfiqurasiya.
**Metod:** Bütün layihə oxundu, `npx tsc --noEmit` işlədildi (0 xəta), 3 lokalın mesaj faylları tutuşduruldu, hər kritik tapıntı kodda birbaşa təsdiqləndi.

> **Ümumi qənaət:** TypeScript təmiz kompilyasiya olur — heç bir problem build-i sındırmır. Amma **runtime, i18n, API, SEO və UX** səviyyəsində ciddi qüsurlar var. Ən vacibi: mesaj faylları tam sinxrondur (hər dildə 169 açar) — **yeni açar əlavəsi lazım deyil**, iş komponentləri mövcud açarlara bağlamaqdır.

---

## Xülasə cədvəli

| Ciddilik | Sayı | Ən kritik nümunələr |
|---|---|---|
| 🟥 Kritik | 4 | Dil dəyişəndə cache qarışması, sınıq multipart formalar, offer/expectations çarpazı |
| 🟧 Yüksək | 10 | Hardcoded i18n mətnlər, metadata həmişə AZ, `next/link`, fayl-tip validasiyası, səhv brend metadata |
| 🟨 Orta | 13 | Mutation retry dublikatı, XSS, error-vs-notfound, ölü linklər, telefon validasiyası, paginasiya |
| 🟩 Aşağı | 16 | Config/təmizlik, mətn typoları, ölü kod, a11y detalları |

---

## 🟥 KRİTİK

### K1 — Dil dəyişəndə köhnə dildə məzmun qalır (query key-lərdə locale yoxdur)
**Fayllar:** bütün `src/services/**/queries.ts`, `src/lib/api/client.ts:47-61`, `src/providers/QueryProvider.tsx:39-48`

React Query açarları dilə bağlı deyil (`['hero']`, `['blog','all']`, `['project','show',slug]` və s.), amma cavab məzmunu dilə bağlıdır — `Accept-Language` request vaxtı `window.location.pathname`-dən götürülür. Brauzerdə `QueryClient` **singleton**-dur və dil dəyişimi client-side naviqasiyadır → cache yaşayır. `az → en` keçəndə `['hero']` hələ də köhnə Azərbaycanca payload-u qaytarır (`staleTime: 60000`). İki dil eyni cache xanasını bir-birinin üstünə yazır.

**Həll:** hər query key-ə locale ölçüsü əlavə et — hər hook-da `const locale = useLocale()` və `queryKey: [...key, locale]`.

---

### K2 — CV / Kontakt / Təklif formaları serverə sınıq multipart göndərir
**Fayllar:** `src/lib/api/client.ts:11-13`, `src/services/vacancy-form/api.ts:18-20`, `src/services/service-form/api.ts`, `src/services/contact/api.ts:36-38`

Axios instansında qlobal `Content-Type: application/json` təyin olunub. Formalar bunu `'multipart/form-data'` ilə əl ilə override edir — **amma `boundary` parametrisiz**. Brauzer Content-Type əl ilə təyin olunanda avtomatik boundary əlavə etmir → backend body-ni parse edə bilmir. **Nəticədə hər 3 form (CV müraciəti daxil) sınıq request göndərir.**

**Həll:** FormData üçün Content-Type-ı silmək (`headers['Content-Type'] = undefined`) — axios/brauzer özü boundary ilə düzgün qoyacaq.

---

### K3 — Vakansiya detalında `offer` və `expectations` sahələri çarpaz bağlanıb
**Fayl:** `src/app/[locale]/[slug]/page.tsx:33-34`

"Namizəddən gözləntilər" başlığı altında `vacancy.offer` göstərilir, "Təkliflərimiz" başlığı altında isə `vacancy.expectations`. Sahələr yerdəyişib — istifadəçi hər iki bölmədə **səhv məzmun** görür. (Bölmə başlıqları da hardcoded — bax H3.)

**Həll:** `html` sahələrini düzgün başlıqlara bağla.

---

### K4 — İstifadəçi giriş formalarında ciddi validasiya boşluqları
**Fayllar:** `src/components/vacancy/apply-section.tsx:23-32,134`, `src/components/shared/OfferModal.tsx:40`, `src/components/contact/hero-section.tsx:65`

- **CV drag-and-drop fayl tipini yoxlamır:** `applyFile` yalnız `file.size`-ı yoxlayır. `accept=".pdf,.doc,.docx"` yalnız klik yolunu məhdudlaşdırır; **sürüklə-burax** ilə istənilən fayl (şəkil, `.exe`, `.zip`) qəbul olunub serverə göndərilir.
- **Telefon validasiyası yoxdur:** `phone: \`+994${phone}\`` — rəqəm/uzunluq yoxlaması yoxdur, hərflər də keçir. `+994 ⌄` selektoru saxtadır (statik, klik olunmur).
- **Ad/e-poçt trim olunmur** — yalnız `required` HTML atributu ilə boşluq (`"   "`) keçir.

**Həll:** `applyFile`-da genişlənmə/MIME yoxlaması; telefonda rəqəm regex; submitdən əvvəl `trim()`.

---

## 🟧 YÜKSƏK

### H1 — `apply-section.tsx`: hazır tərcümə açarları var, mətn hardcoded
**Fayl:** `src/components/vacancy/apply-section.tsx`

`useTranslations("vacancy.apply")` və `common` import olunub və toast/validasiyada işlədilir, amma bütün **görünən forma mətni** hardcoded Azərbaycanca literaldır (açarlar 3 dildə mövcuddur):

| Sətir | Hardcoded mətn | Mövcud açar |
|---|---|---|
| 62 | Neoline Ailəsinə Qoşulun | `vacancy.apply.heading` |
| 65-66 | təsvir | `vacancy.apply.desc` |
| 71 | E-poçt ilə müraciət: | `common.emailApply` |
| 84 | Müraciət edin | `vacancy.apply.formTitle` |
| 94 | Ad, soyad | `vacancy.apply.nameLabel` |
| 102 | placeholder | `vacancy.apply.namePlaceholder` |
| 109 | E-poçt | `vacancy.apply.emailLabel` |
| 117 | placeholder | `vacancy.apply.emailPlaceholder` |
| 123 | CV-niz | `vacancy.apply.cvLabel` |
| 157 | Buradan yükləyin | `vacancy.apply.uploadHere` |
| 158 | və ya sürükləyib buraxın | `vacancy.apply.uploadDrop` |
| 162 | Maksimum fayl {size}MB | `vacancy.apply.maxFile` |
| 176 | Göndərilir… / Göndər | `common.sending` / `common.send` |

Həmçinin `tc` (sətir 14) import olunub, amma istifadə olunmur (ölü dəyişən). Nəticə: EN/RU istifadəçilər bu formada Azərbaycanca mətn görür.

### H2 — `RelatedVacancies.tsx`: heç bir tərcümə hook-u yoxdur + `next/link`
**Fayl:** `src/components/vacancy/RelatedVacancies.tsx`

Komponent heç bir `useTranslations` import etmir; bütün mətn hardcoded: `Digər Vakansiyalarla Tanış olun` (→ `vacancy.other.heading`), təsvir (→ `vacancy.other.desc`), `Ətraflı bax` (→ `common.viewDetails`), `Hamısına bax` (→ `common.seeAll`). Üstəlik təsvir səhvən blog mətninin ("məqalələr") copy-paste-idir və footer linki səhvən `/about`-a (ChevronDown ikonu ilə) gedir. `import Link from "next/link"` (sətir 3) locale itirir.

### H3 — Vakansiya detal səhifəsi tam hardcoded
**Fayl:** `src/app/[locale]/[slug]/page.tsx`

`"use client"`, heç bir tərcümə yoxdur: `Vakansiya tapılmadı.` (23, → `vacancy.detail.notFound`), `Vakansiya haqqında` (32, → `vacancy.detail.sectionAbout`), `Namizəddən gözləntilər` (33), `Təkliflərimiz` (34). K3 sahə çarpazı ilə eyni fayl.

### H4 — Server-side metadata həmişə Azərbaycanca gəlir (SEO)
**Fayllar:** `src/services/meta-tag/api.ts:26-40`; çağıranlar: `page.tsx:9`, `about/page.tsx`, `contact/page.tsx`, `services/page.tsx`, `blogs/layout.tsx`, `projects/layout.tsx`

`generateMetadata` serverdə işləyir; `client.ts:52-59`-da `window` yoxdursa locale sərt `"az"` kodlanıb. `generateMetadata` `params.locale` almır və ötürmür. Nəticə: EN/RU səhifələrinin `<title>`, description, keywords **həmişə AZ**. Düzəldici `getServerLocale()` (`utils.ts:52`) yazılıb, amma heç yerdə istifadə olunmur.

### H5 — Root metadata səhv brend + lokalizasiyasız
**Fayl:** `src/app/[locale]/layout.tsx:43-46`

`title: "HR-vakansiyaları"` — köhnə `hr-vacancy` şablonundan qalıb, bu Neoline saytıdır. `metadata.title/description` açarları var, istifadə olunmur. `metadataBase`, `openGraph`, `alternates`/`hreflang` yoxdur (middleware-də `alternateLinks: false` ilə birlikdə üç dil üçün heç bir hreflang siqnalı yoxdur).

### H6 — `next/link` istifadəsi locale-i itirir
**Fayllar:** `src/components/services/grid-section.tsx:3`, `src/components/vacancy/RelatedVacancies.tsx:3`

`@/i18n/navigation` yerinə `next/link`. Kart linkləri (`/services/${slug}`, `/${slug}`) aktiv locale prefiksini itirir. `shared/language-selector.tsx:9` da `next/navigation`-dən `useSearchParams` çəkir (bu doğrudur, amma fayl ölü koddur — bax L-bölmə).

### H7 — SSR/hydration infrastrukturu ölü kod
**Fayllar:** `src/providers/server.ts`, `src/providers/HydrationBoundary.tsx`

`prefetchQuery`/`dehydrate`/`getServerQueryClient` heç bir səhifədə çağırılmır. Bütün səhifələr `"use client"`, mount-da fetch edir → boş ilk paint, fetch waterfall, crawler-lər üçün görünməz məzmun. Ya SSR prefetch tətbiq edilməli, ya da ölü kod silinməli.

### H8 — `OfferModal.tsx` qismən hardcoded
**Fayl:** `src/components/shared/OfferModal.tsx`

`useTranslations` var, çoxu işlədilir, amma hardcoded qalır: `E-poçt` (147, → `services.offerModal.emailLabel`), placeholder (155, → `emailPlaceholder`), `Telefon nömrəsi` (162, → `phoneLabel`), placeholder (175, → `phonePlaceholder`), `Ləğv et` (189, → `common.cancel`), `Göndərilir…/Göndər` (198, → `common.sending`/`common.send`).

### H9 — Header xidmət menyusunda dublikat key + səhv preview
**Fayl:** `src/components/navigation/header.tsx:474-503`

`previewImages.map(... key={image})` — iki xidmət eyni şəkli paylaşanda və ya şəkil `undefined` olanda **dublikat React key**. `setPreviewIndex(previewImages.indexOf(service.image))` — dublikat şəkil ilk indeksə düşür (səhv preview), yoxdursa `-1` qaytarır. `previewRefs` massivi də köhnəlmiş node-lara işarə edə bilər.

### H10 — Səhv/ölü UI kontrolları və səhv məzmun
**Fayllar:**
- `src/components/projects/grid-section.tsx:53-58` — "Hamısına bax" ölü `<span>` (link/onClick yoxdur), klik olunan görünür amma heç yerə getmir.
- `src/components/projects/hero-section.tsx:213-216` — desktop təsviri səhv blog mətnidir ("məqalələr"), `t("desc")` yerinə hardcoded.

---

## 🟨 ORTA

| # | Fayl | Problem | Həll |
|---|------|---------|------|
| M1 | `QueryProvider.tsx:29-34` | Mutations `retry: 1` — POST formaları idempotent deyil, **dublikat müraciət/email** riski | `mutations: { retry: 0 }` |
| M2 | `lib/data/projects.ts:38-47` | `item.projecttags[0]` guard-sız — API sahəni buraxsa/`null` olsa `projects` çökür | `Array.isArray` guard + `?? []` |
| M3 | `[locale]/[slug]/page.tsx:43` | `vacancy_id={String(vacancy.id ?? vacancy.slug)}` — `id` yoxdursa **slug** göndərilir, backend numeric FK gözləyir | `id` yoxdursa göndərmə/xəbərdarlıq |
| M4 | detail səhifələri (blog/project/service/vacancy) | `isError` heç oxunmur → backend **outage "tapılmadı" kimi** göstərilir | error state + retry UI |
| M5 | `home/hero-section.tsx:141`, `cta-banner.tsx:80`, blog `html-content` | `dangerouslySetInnerHTML` **sanitizasiyasız** (CMS `neoline.markup.az`) → XSS riski | DOMPurify-tipli sanitizasiya |
| M6 | `contact/hero-section.tsx:17` | `t.raw("subjects") as string[]` guard-sız `.map` → açar yoxdursa render throw | `Array.isArray` fallback |
| M7 | `blog/api.ts`, `project/api.ts` | Siyahılar yalnız `.data` oxuyur, **paginasiya iqnor** — 1-ci səhifədən sonrakılar itir; tag/related natamam data üzərində hesablanır | `meta`/pagination modeli |
| M8 | `projects/hero-section.tsx`, `RelatedVacancies.tsx` | Səhv copy-paste blog mətni ("məqalələr") layihə/vakansiya kontekstində | düzgün açarlara bağla |
| M9 | `OfferModal`, `header` drawer, `contact` dropdown | `role="dialog"`/`aria-modal`/focus-trap yoxdur; CV dropzone-da `onKeyDown` yoxdur (klaviatura ilə açılmır) | ARIA + focus idarəsi + Enter/Space |
| M10 | `client.ts:28-36` | `handleApiError` yalnız `console.error`; 401-də cookie silinir amma redirect/telemetriya yoxdur | mərkəzi xəta idarəsi |
| M11 | `contact/map-section.tsx:12,19` | API `map` (embed) sahəsi iqnor, `address` string-i geokodlanır → səhv nöqtə riski | CMS `map`-i istifadə et |
| M12 | Forma mutasiyaları (`contact`, `service-form`, `vacancy-form` api.ts) | tipsiz, `Promise<unknown>` — success payload təhlükəsiz istifadə oluna bilmir | `post<T>` tipini ver |
| M13 | `blogs/page.tsx`, `projects/page.tsx` (tag filtri) | K1 ilə birlikdə dil dəyişəndə köhnə/uyğunsuz tag slug ilə fetch (race) | K1 həlli + slug yoxlaması |

---

## 🟩 AŞAĞI / Təmizlik

| # | Fayl | Problem |
|---|------|---------|
| L1 | `next.config.ts:11` | `images.unoptimized: true` — Next şəkil optimizasiyası tam sönük, `sizes` propları təsirsiz, `remotePatterns` faktiki ölü; şəkillər tam ölçüdə |
| L2 | `shared/container.tsx:11` | `className` verilməyəndə şablon literal `"undefined"` class-ı çap edir → `${className ?? ""}` |
| L3 | `client.ts:5,10` | `NEXT_PUBLIC_API_BASE_URL` fallback yoxdur (unset → `baseURL: undefined`); `timeout: 10000` magic number |
| L4 | `client.ts:48` | interceptor `config.params?.locale`/`X-Locale` oxuyur amma silmir → istifadə edilsə query-string/upstream-ə sızar |
| L5 | `client.ts:16-22` | Token idarəsi yalnız client-side, `access_token`-i heç yer set etmir (login yoxdur) — vestigial scaffolding |
| L6 | `az.json:7-9` | `azFull/enFull/ruFull = "Az"/"En"/"Ru"` (qısaltma), en/ru-da tam adlar → AZ locale-də dropdown "Az/En/Ru" göstərir |
| L7 | `az.json:139,141,200,202` | Mətn typoları: `"E-poçtunuu"` (ikiqat u), `"...daxi edin"` (→ "daxil") |
| L8 | `package.json:2,46` | `name: "hr-vacancy"` köhnə ad; `eslint-config-next: 15.5.0` amma `next: ^16.2.4` (major uyğunsuzluq) |
| L9 | `[locale]` route-ları | `generateStaticParams` / `setRequestLocale` yoxdur → tam dinamik render, static optimizasiya itir |
| L10 | `tsconfig.json:3` | `target: "ES2017"` — React 19/Next 16 üçün köhnə (async/await down-level) → `ES2022` |
| L11 | `eslint.config.mjs` | Layihə qaydalarını qoruyan rule yoxdur (`no-restricted-imports` ilə `next/link` qadağası tövsiyə olunur) |
| L12 | `shared/language-selector.tsx` | Ölü/dublikat dil seçici (heç yerdən import olunmur); `activeLocale.toUpperCase()` raw göstərir |
| L13 | `faq-section.tsx:195` + gallery/content/ecosystem | `key={faq.question}` / `key={index}` — sabit data üçün OK, reorder-də risqli |
| L14 | `layout.tsx:61-64` | `getMessages()` `hasLocale` yoxlamasından əvvəl işləyir; `messages as Record<string,string>` yanlış tip (nested obyekt) |
| L15 | `why-us-section.tsx:53-56` | Tək sözlü başlıqda `statLabel` boş qalır |
| L16 | `contact/map-section.tsx:7` | `fallbackAddress` hardcoded AZ string (data-fallback, amma açar tövsiyə olunur) |

---

## ✅ Sağlam olanlar (təsdiqləndi)

- **Mesaj faylları tam sinxrondur** — az/en/ru hər biri **169 açar**, çatışmayan/artıq açar yoxdur, tip uyğunsuzluğu yoxdur (`contact.subjects` hər üçündə 5 elementli massiv).
- **TypeScript təmiz kompilyasiya** — `npx tsc --noEmit` = 0 xəta.
- **GSAP animasiyaları** düzgün `gsap.context`/`matchMedia` + cleanup (`ctx.kill()`/`mm.revert()`), `prefers-reduced-motion` guard — **memory leak yoxdur** (`reveal`, `clip-reveal`, `split-lines`, `parallax`, `magnetic-link`, `count-up`, hero-lar, `LogoLoop` RAF/observer cancel).
- Slug hook-larında `enabled: Boolean(slug)` guard-ları düzgündür.
- Floating promise / işlənməmiş rejection yoxdur — React Query hər şeyi idarə edir; response interceptor yenidən reject edir.
- `src/proxy.ts` faylının adı Next 16 üçün **düzgündür** (`PROXY_FILENAME = 'proxy'`) — bug deyil.
- i18n config (`routing.ts`, `request.ts`, `navigation.ts`) səhvsizdir.
- Query açarları daxilən uyğundur (`logo` vs `logo/why`, `blog/tag` vs `blog/show` və s. fərqlidir) — yeganə açar qüsuru locale ölçüsünün olmaması (K1).

---

## Düzəltmə prioriteti (tövsiyə)

1. **K2** multipart boundary — 3 form hazırda sınıq, ən təcili.
2. **K1** query key-lərə locale — ən geniş istifadəçi təsiri.
3. **K3** offer/expectations çarpazı — səhv məzmun.
4. **H4/H5** metadata locale + brend, **H1/H2/H3/H8** i18n açarlarını bağla.
5. **H6** `next/link` → `@/i18n/navigation`, **K4** input validasiyaları.
6. **M1** mutation retry söndür, **M5** HTML sanitizasiya, **M4** error-vs-notfound.
7. Qalan Orta/Aşağı təmizlik.

---

*Bütün yollar `C:\Users\Rauf2\Desktop\PROJECTS\Neolink\` altındadır. Bu audit read-only aparıldı — heç bir fayl dəyişdirilmədi.*
