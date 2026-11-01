# Kegel Fit

*[Srpska verzija](README.md)*

A guided pelvic floor (Kegel) workout web app in a single HTML file: tense/relax timer, vibration and sound cues, a 25-week plan and progress tracking.

> **Note:** this app is a training aid, not medical advice. If you have any health problems or feel pain while exercising, talk to a doctor or physiotherapist.

## Features

- **25-week plan**, 7 days per week, 5 blocks per day. Session length grows from about 2:39 (week 1, day 1) to about 15:00 (week 25, day 7).
- **Free choice** of any week and any day (nothing is locked).
- **Fullscreen workout screen** with a ring that shows progress through the set, TENSE / RELAX labels and a countdown.
- **Vibration** that runs continuously while TENSE is active and stops on RELAX.
- **Sound cues** when the phase changes.
- **Two languages:** Serbian (Latin script) and English. On first launch the language follows the browser (Serbian, Croatian and Bosnian give Serbian, everything else English). You can change it in Settings, and the choice is saved and synced through Firebase.
- **Statistics:** streak, completed workouts, total time and history.
- **Backup** of your data (export and import a JSON file).
- Optional **Google sign-in** and sync to Firebase Firestore.

## Running the app

No installation or build step is needed.

1. Open `kegel_fit_web_app.html` in a browser (double-click or `File → Open`).
2. To use it on a phone, put the file on any static hosting (for example GitHub Pages) and open that address in the browser.

An internet connection is needed when the page loads, because these libraries come from a CDN: Tailwind CSS, Font Awesome and Google Fonts (Inter). Workout data is stored locally in the browser.

## How to use

1. On the home screen pick a **week** (horizontal list at the top), then a **day** (the 7 buttons below it).
2. Look at the workout structure (blocks, reps, durations) and press **Start workout**.
3. After a finished workout the app moves to the next day by itself. After day 7 it moves to day 1 of the next week.

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
- **Vibration** and **sound:** on or off.
- **Backup:** download or load a JSON file with your progress. Loading **replaces** your current data; the app asks for confirmation first and validates the file.
- **Delete all data.**

## Workout plan

Every day has 5 blocks of two kinds:

- **Slow blocks (Slow tension):** tense and relax with longer holds. The hold grows from 3 s / 3 s up to 18 s / 8 s.
- **Fast blocks (Fast tension):** always 1 s tense and 1 s relax, with many reps.

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

## Data storage

- **Locally:** in the browser's `localStorage` under the key `kegel_fit_state`. It holds the selected week and day, completed days, streak, history and settings.
- **Day number:** completed days are stored as a number from 1 to 175 (week 1 day 1 is 1, week 25 day 7 is 175). Backups from the older version, which had only the first week, still load correctly.
- **Cloud (optional):** after signing in with Google, data is synced to Firebase Firestore, into the document `users/{uid}`. On first sign-in, local and cloud data are **merged** (completed days and history are combined, the streak is the larger of the two), so nothing is lost.

### Firebase setup (sign-in and cloud database)

Until you add your own configuration the app works in local mode, and the sign-in window says that cloud sync is not set up.

1. **Create a project** in the [Firebase console](https://console.firebase.google.com/) (Add project). Google Analytics is not needed.
2. **Add a Web app:** Project settings → Your apps → the `</>` icon → enter a name → Register app. Copy the `firebaseConfig` object.
3. **Paste the configuration** into `kegel_fit_web_app.html`, into the `FIREBASE_CONFIG` object at the start of the module (`<script type="module">`). The API key is not a secret: security comes from the rules and the authorized domains.
4. **Enable Google sign-in:** Build → Authentication → Get started → Sign-in method → Google → Enable. Pick a support email and save.
5. **Create a Firestore database:** Build → Firestore Database → Create database. Choose a location close to you (for example `eur3`) and start in production mode.
6. **Publish the rules:** Firestore → Rules → paste the contents of [`firestore.rules`](firestore.rules) → Publish. The rules let each user access only their own document `users/{uid}` and deny everything else.
7. **Allow your domains:** Authentication → Settings → Authorized domains. `localhost` is already there. Add the domain where you publish the app (for example `username.github.io`).

#### Testing on your computer

Google sign-in **does not work** when the page is opened as a file (`file://`). Start a local server in the app's folder:

```bash
python3 -m http.server 8080
```

then open `http://localhost:8080/kegel_fit_web_app.html`.

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

Sound and vibration start only after you tap the screen (for example the Start button), because browsers do not allow them to start automatically.

## Project structure

- `kegel_fit_web_app.html`: the whole app (HTML, CSS and JavaScript), with a separate module inside the same file for Firebase
- `README.md` and `README.en.md`: documentation in Serbian and English
- `firestore.rules`: Firestore security rules
- `LICENSE`: GNU GPL v3

## License

Kegel Fit is free software under the **GNU General Public License, version 3** (GPL-3.0). You may use, study, change and share it, as long as modified versions you distribute stay under the GPL and come with their source code.

The full license text is in [`LICENSE`](LICENSE), and the copyright notice is at the start of `kegel_fit_web_app.html`.

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
