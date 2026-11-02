# Kegel Fit

*[Srpska verzija](README.md)*

A guided pelvic floor (Kegel) workout web app: tense/relax timer, vibration and sound cues, a 25-week plan and progress tracking. It runs in the browser, can be installed to your phone's home screen and works offline.

> **Note:** this app is a training aid, not medical advice. If you have any health problems or feel pain while exercising, talk to a doctor or physiotherapist.

## Features

- **25-week plan**, 7 days per week, 5 blocks per day. Session length grows from about 2:39 (week 1, day 1) to about 15:00 (week 25, day 7).
- **Free choice** of any week and any day (nothing is locked).
- **Fullscreen workout screen** with a ring that shows progress through the set, TENSE / RELAX labels and a countdown. The screen stays on during the workout.
- **Vibration** that runs continuously while TENSE is active and stops on RELAX.
- **Sound cues** when the phase changes.
- **Offline use (PWA):** the app can be installed to the home screen and works without internet after the first load.
- **Statistics:** streak, completed workouts, total time and history.
- **Two languages:** Serbian (Latin script) and English. On first launch the language follows the browser (Serbian, Croatian and Bosnian give Serbian, everything else English). You can change it in Settings, and the choice is saved and synced through Firebase.
- **Backup** of your data (export and import a JSON file).
- Optional **Google sign-in** and sync to Firebase Firestore.

## Running the app

No installation or build step is needed. The whole app is in `index.html`.

1. Put the contents of the repository on any static hosting (for example GitHub Pages) and open that address in the browser.
2. To try it quickly on a computer, start a local server (see [Testing on your computer](#testing-on-your-computer)).

You can also open `index.html` by double-clicking it, but then offline mode (the service worker) and Google sign-in **do not work**, because both need `http://` or `https://`.

An internet connection is needed on the first load, because these libraries come from a CDN: Tailwind CSS, Font Awesome, Google Fonts (Inter) and the Firebase SDK. The service worker then keeps them in its cache, so the app also works without internet afterwards.

### Installing on a phone

- **Android (Chrome):** menu (⋮) → *Install app* or *Add to Home screen*.
- **iPhone (Safari):** Share button → *Add to Home Screen*.

The installed app opens fullscreen, without the browser bar, in portrait orientation.

### Android app (APK)

A ready-made APK is also available, built with [PWABuilder](https://www.pwabuilder.com/). It is the same app packaged as a Trusted Web Activity: it opens in the phone's browser engine, but without the address bar.

1. Download [`kegel-fit.apk`](https://milangru.github.io/kegel/apk/kegel-fit.apk) (or get it from the [`apk/`](apk/) folder in the repository).
2. Open the downloaded file and allow installation from this source when Android asks (*Install unknown apps*).
3. On launch a short notice "Running in <browser>" appears. This is normal and disappears by itself.

The APK is not on Google Play. The app updates itself because it loads the website, so a new APK is only needed if you change the icon, name or package settings.

There is no APK for iPhone: use the Safari installation described above.

#### If you build your own APK

- On PWABuilder enter the address of your site. You get an APK, `assetlinks.json` and a signing key (`signing.keystore`).
- `assetlinks.json` must be reachable at `https://<user>.github.io/.well-known/assetlinks.json`, that is at the **root of the domain**, not in a project subfolder. On GitHub Pages this means a separate repository `<user>.github.io` containing `.well-known/assetlinks.json` and an empty `.nojekyll` in its root. Without it the APK still runs, but with a visible address bar.
- **Never publish** `signing.keystore` and `signing-key-info.txt` in a public repository. Keep them locally with a backup: without them you cannot release an update of the same app.

## How to use

1. On the home screen pick a **week** (horizontal list at the top), then a **day** (the 7 buttons below it).
2. Look at the workout structure (blocks, reps, durations) and press **Start workout**.
3. After a finished workout the app moves to the next day by itself. After day 7 it moves to day 1 of the next week.

The bottom navigation has three tabs: **Workout**, **Stats** and **Settings**.

### Workout screen

The top card shows the block name, with help (?) on the left and a quit button (X) on the right. Above the ring is "Rep X of Y", and the ring has as many segments as the current block has reps. Each finished rep lights up the next segment. Inside the ring are the TENSE and RELAX labels with their durations and the countdown between them. The bottom bar shows which exercise you are on (for example 2/5) and how much time is left in the whole workout.

Buttons under the ring, in order:

| Button | What it does |
|---|---|
| Stealth | Hides the ring and colours and switches to a dark, discreet view. Text and seconds stay visible. |
| Sound | Turns the sound cues on or off. |
| Pause / Resume | Stops and continues the workout (large button in the middle). |
| Vibration | Turns vibration on or off, even in the middle of a tense phase. |
| Skip | From an exercise it goes to rest, from rest to the next exercise. On the last exercise it asks whether to finish the workout. |

### Settings

- **Language:** Serbian or English.
- **Rest between blocks:** 5, 10, 15, 20 or 30 seconds (default 15 s).
- **Vibration** and **sound cues:** on or off.
- **Cloud sync:** sign in and out with a Google account.
- **Data management:**
  - download a backup (JSON),
  - load a backup (JSON): this **replaces** your current data; the app asks for confirmation first and validates the file,
  - delete local history.

## Workout plan

Every day has 5 blocks of two kinds:

- **Slow blocks (slow tension):** tense and relax with longer holds. The hold grows from 3 s / 3 s up to 18 s / 8 s.
- **Fast blocks (fast tension):** always 1 s tense and 1 s relax, with many reps.

Block order:

- Weeks 1–12: slow · fast · slow · fast · slow
- Weeks 13–25: fast · slow · fast · slow · fast (longer holds, big fast blocks)

Sample from the plan (reps per block in order, duration calculated with a 15 s rest):

| Week | Hold | Day 1 | Day 7 | Duration |
|---|---|---|---|---|
| 1 | 3/3 | 4·6·4·6·4 | 5·8·5·7·5 | 2:39 → 3:03 |
| 4 | 4/4 | 6·13·5·12·6 | 7·14·6·13·7 | 4:09 → 4:37 |
| 8 | 4/4 → 5/4 | 10·20·9·18·10 | 10·21·8·20·10 | 6:11 → 6:37 |
| 12 | 6/5 → 7/5 | 10·28·9·25·10 | 10·29·8·27·10 | 8:08 → 8:31 |
| 13 | 7/5 → 8/5 | 25·13·22·13·22 | 25·13·22·13·21 | 8:33 → 8:57 |
| 18 | 10/7 → 11/7 | 31·13·27·13·27 | 34·12·31·12·31 | 11:15 → 11:27 |
| 22 | 14/7 → 15/8 | 39·12·35·12·35 | 37·12·33·12·33 | 13:05 → 13:41 |
| 25 | 17/8 → 18/8 | 40·12·36·12·36 | 48·11·42·11·42 | 14:47 → 14:59 |

Each day is longer than the one before. When the hold gets longer, the number of reps in slow blocks can drop a little, while the total duration keeps growing.

### Editing the plan

The plan lives in the `PLAN_DATA` array in the script: one row per week, seven entries per row. Each day is stored as:

```js
[hold, relax, reps_block1, block2, block3, block4, block5]
```

For example `[3,3,4,6,4,6,4]` is a day with a 3 s hold, 3 s relax and blocks of 4, 6, 4, 6 and 4 reps. The order of block types is set by the `PLAN_SWITCH_DAY` constant (from day 85, i.e. week 13, the order is fast · slow · fast · slow · fast). Fast blocks are always 1 s / 1 s.

## Translations

All app texts are in the `I18N` object at the start of the script, with keys for `sr` and `en`. Static HTML text has a `data-i18n="key"` attribute, and text written by JavaScript goes through the `t('key', {params})` function. For words that need plurals (for example "1 dan", "2 dana") there is `tp()`, which knows the Serbian rules (1 / 2–4 / 5 and more).

To add a new language, add another object next to `sr` and `en`, extend `detectLang()` and add an option to the language select in Settings. Every key must exist in every language. The chosen language is stored in `settings.lang` and is included in the backup.

## Offline use

The file `sw.js` is a service worker that makes offline use possible:

- On install it puts the local files (`index.html`, `manifest.webmanifest`, the icons from `favicon/`) and the CDN libraries into the cache (`kegel-fit-v4`). If one file fails to download, the others are still cached.
- The **page** (`index.html`) is always requested from the network first, with a 4 second limit. If the network does not answer or you are offline, the cached version is used. This means you do not need to touch `sw.js` after changing `index.html`.
- **Other files** (libraries, fonts, icons) are served from the cache immediately and refreshed in the background.
- Calls to Firestore and Firebase Auth **never** go through the cache.
- Increase the cache version (`CACHE`) only when you change the list of precached files (`LOCAL` and `CDN`).

The service worker only works over `https://` or `http://localhost`.

## Data storage

- **Locally:** in the browser's `localStorage` under the key `kegel_fit_state`. It holds the selected week and day, completed days, streak, history and settings.
- **Day number:** completed days are stored as a number from 1 to 175 (week 1 day 1 is 1, week 25 day 7 is 175). Backups from the older version, which had only the first week, still load correctly.
- **Cloud (optional):** after signing in with Google, data is synced to Firebase Firestore, into the document `users/{uid}`. On first sign-in, local and cloud data are **merged** (completed days and history are combined, the streak is the larger of the two), so nothing is lost. While you are offline, progress is kept on the device and synced as soon as you are back online.

### Firebase setup (sign-in and cloud database)

`index.html` already contains the configuration of the author's Firebase project. If you publish your own copy of the app, create **your own** Firebase project and replace it. If `FIREBASE_CONFIG` keeps the `YOUR_...` values, the app works in local mode, and the sign-in window says that cloud sync is not set up.

1. **Create a project** in the [Firebase console](https://console.firebase.google.com/) (Add project). Google Analytics is not needed.
2. **Add a Web app:** Project settings → Your apps → the `</>` icon → enter a name → Register app. Copy the `firebaseConfig` object.
3. **Paste the configuration** into `index.html`, into the `FIREBASE_CONFIG` object at the start of the module (`<script type="module">`). The API key is not a secret: security comes from the rules and the authorized domains.
4. **Enable Google sign-in:** Build → Authentication → Get started → Sign-in method → Google → Enable. Pick a support email and save.
5. **Create a Firestore database:** Build → Firestore Database → Create database. Choose a location close to you (for example `eur3`) and start in production mode.
6. **Publish the rules:** Firestore → Rules → paste the contents of [`firestore.rules`](firestore.rules) → Publish. The rules let each user access only their own document `users/{uid}` and deny everything else.
7. **Allow your domains:** Authentication → Settings → Authorized domains. `localhost` is already there. Add the domain where you publish the app (for example `username.github.io`).

#### Testing on your computer

Google sign-in and the service worker **do not work** when the page is opened as a file (`file://`). Start a local server in the app's folder:

```bash
python3 -m http.server 8080
```

then open `http://localhost:8080/`.

#### Common errors

| Message or behaviour | Cause |
|---|---|
| "Cloud sign-in is not set up" | `FIREBASE_CONFIG` still has the `YOUR_...` values. |
| "This address is not allowed in Firebase" | The domain is not in Authorized domains (step 7). |
| "Google sign-in is not enabled" | Step 4 was not done. |
| "Sign-in does not work when the page is opened as a file" | Open it over `http://localhost` or GitHub Pages. |
| "Firestore rules do not allow access" | The rules are missing or not published (step 6). |
| The sign-in window does not open | The browser blocks pop-ups for this page. |

## Browser support

| Feature | Support |
|---|---|
| Plan, timer, statistics | All modern browsers |
| Sound | All modern browsers (Web Audio) |
| Vibration | Chrome and Firefox on Android. **Does not work on iPhone (Safari).** |
| Screen stays on | Browsers with Screen Wake Lock support (Chrome, Edge, Safari 16.4+) |
| Offline use and installation | Browsers with service worker support, over `https://` |

Sound and vibration start only after you tap the screen (for example the Start button), because browsers do not allow them to start automatically.

## Project structure

- `index.html`: the whole app (HTML, CSS and JavaScript), with a separate module inside the same file for Firebase
- `sw.js`: service worker for offline use
- `manifest.webmanifest`: home screen installation data (name, colours, icons)
- `favicon/`: app icons
- `apk/`: Android app (`kegel-fit.apk`)
- `firestore.rules`: Firestore security rules
- `README.md` and `README.en.md`: documentation in Serbian and English
- `LICENSE`: GNU GPL v3

## License

Kegel Fit is free software under the **GNU General Public License, version 3** (GPL-3.0). You may use, study, change and share it, as long as modified versions you distribute stay under the GPL and come with their source code.

The full license text is in [`LICENSE`](LICENSE), and the copyright notice is at the start of `index.html`.

```
Copyright (C) 2026  Milan (milangru)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
```

Note: the libraries loaded from a CDN (Tailwind CSS, Font Awesome, Firebase SDK, Google Fonts) have their own licenses and are not part of this repository.
