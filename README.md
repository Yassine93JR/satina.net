# Satina.net — Site premium multi-pages

**Satina IT Paris** — site statique HTML / CSS / JS, design futuriste type Webflow · Apple · tech premium.

## Lancer en local

```powershell
.\demarrer-site.ps1
```

→ [http://localhost:8080](http://localhost:8080) — **Ctrl+F5** après chaque mise à jour.

## Pages

| Page | Fichier |
|------|---------|
| Accueil | `index.html` |
| À propos | `a-propos.html` |
| Services | `services.html` + `services/*.html` |
| Conseil | `conseil.html` |
| Contact | `contact.html` |

## Assets (projet nettoyé)

```
assets/css/theme.css   — variables (clair / sombre)
assets/css/site.css    — tout le design (unique feuille)
assets/js/             — app, i18n, theme, hero, motion, widgets…
assets/i18n/*.json     — traductions source
assets/images/         — médias utilisés uniquement
tools/build-locales.py — JSON → locales.js
```

## Traductions

Langues : **Français**, **English**, **Español**, **العربية**, **简体中文**.

Sélecteur glass intégré à la barre de navigation (pas Google Translate).

Modifier `assets/i18n/*.json` puis :

```powershell
python tools/build-locales.py
```

## Navigation

Barre **fixe** en overlay glass : elle reste visible au scroll, le contenu démarre **en haut de l’écran** (hero plein écran sous la navbar).

## Widgets

- **Paris** : heure + météo (capsule glass, bas gauche)
- **WhatsApp** : bas droite

## Contact

16 rue de Vichy, Paris — info@satina.fr — 06 07 09 42 06 — 01 45 86 32 96
