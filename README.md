# AI Interview Mock Simulator — Interview Studio

Web Technologies PBL · Woxsen University

**Sarvajeet Bajikar & Adhiraj Kalkundrikar**

## Start here (Windows / macOS / Linux)

1. Install Node.js 20 or newer with npm if it is not already installed.
2. Clone this repository or download and extract its ZIP completely.
3. Open the repository folder. **You must see `package.json` here.**
4. Open a terminal in this folder. On Windows, type `powershell` into the File Explorer address bar and press Enter.
5. Run:

```sh
npm install
npm start
```

6. Open **http://localhost:3000**. Keep the terminal running.
7. Open **http://localhost:3000/presentation.html** for the animated presentation.

There is no `start.bat`. Start the app with npm. An internet connection is needed to install the npm dependency the first time. Afterwards the core app runs locally without an API key or internet connection. Browser text-to-speech depends on available voices and browser support.

## What works

- Web development, Java & OOP, and HR interview tracks.
- 18 curated questions: 3 beginner and 3 intermediate questions per track.
- Choose 3 or 5 questions. The selected level comes first; a 5-question session includes the other level too.
- Suggested two-minute timer per question, with no forced timeout.
- Typed answers, word count, optional read-aloud, explicit skip action.
- Browser-local draft recovery, server-side saved answers and resumable sessions.
- Concept coverage, missing terms, writing-length advice and reference answers.
- History, report reopening, plain-text download, print and session deletion.
- Six-slide animated presentation with keyboard navigation, interactive examples, fullscreen and Hinglish notes.

## Important: what “AI” means in this prototype

The title describes an AI-style mock interview experience. **This version uses a deterministic keyword rubric, not an LLM or a trained machine-learning model.** No remote AI requests are made. Each question has four concept groups. Each group counts once if one of its accepted phrases appears. Score = matched groups / total groups × 100. Empty/skipped answers score zero.

This is a teaching prototype. The evaluator can miss good paraphrases or reward incorrect statements containing the expected terms. Scores are not correctness, confidence, personality or hiring assessments. Reference answers help the learner review independently. Semantic AI evaluation is future scope, not an implemented feature.

## Files you can explain to the panel

| File | Role |
|---|---|
| `public/index.html` | Page shell and navigation |
| `public/style.css` | Responsive interface, colors and transitions |
| `public/app.js` | Forms, DOM updates, fetch, timers, drafts, history and reports |
| `server.js` | Express routes, validation, ordered submissions and persistence |
| `src/questions.js` | Question bank, accepted concept phrases and reference answers |
| `src/evaluate.js` | Normalization, concept matching and feedback generation |
| `test/app.test.js` | Automated scoring and API tests |
| `public/presentation.html` | Standalone animated final presentation |
| `data/sessions.json` | Created at first startup; local saved sessions |

## Data flow

Browser form → POST JSON → Express validation → question evaluator → JSON file save → JSON response → DOM feedback view.

The backend serves frontend and API from the same origin. Draft answers use `localStorage`. Submitted answers are written to `data/sessions.json` using a temporary file and rename. This is not a relational database. Stop the server before manually backing up or changing the data file.

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Server status |
| GET | `/api/config` | Available tracks |
| GET | `/api/sessions` | List sessions |
| POST | `/api/sessions` | Create a session |
| GET | `/api/sessions/:id` | Resume or view a session |
| POST | `/api/sessions/:id/answers` | Submit current answer |
| DELETE | `/api/sessions/:id` | Delete a session |

## Validation performed

Run:

```sh
npm test
```

Four automated tests pass. They cover scoring boundaries and punctuation, question-bank coverage, session creation, input validation, question ordering, safe retry behavior, completion, restart persistence, deletion, and all track/level configurations for five-question sessions. Server and frontend JavaScript syntax were checked. Browser rendering, interaction and speech playback were not tested in a real browser in the build environment; use the local smoke check below before your presentation.

### Local smoke check

1. Start a Web development / Beginner / 3-question interview.
2. Type `HTML defines the structure. CSS controls the styles. JavaScript adds interactivity.` for the first question. Submit: concept coverage should be 100.
3. Submit or skip the remaining questions. Download the report and open it.
4. Open History, view the completed session, restart the server, then check History again.
5. Start another session, type a draft, refresh and choose Resume latest interview.
6. Open the presentation; try arrows, N for notes, F for fullscreen, workflow buttons, submission trace and rubric buttons.

## Troubleshooting

**ENOENT / package.json not found:** You are in the wrong folder. Run `dir` (Windows) or `ls` and check for `package.json`. Do not use npm in the parent ZIP folder.

**Port 3000 already in use:** Stop the earlier terminal with Ctrl+C. Or use another port:

PowerShell:
```powershell
$env:PORT=3001
npm start
```

macOS / Linux:
```sh
PORT=3001 npm start
```

Then open http://localhost:3001. The standalone deck's demo link points to the default port 3000; open the changed URL manually.

**Cannot reach the app:** Keep the terminal running and use `http`, not `https`. The server binds to `127.0.0.1` for local use; another phone cannot reach it.

**Damaged data file:** Stop the server and back up `data/sessions.json`. Repair it or rename it to start with empty history. The app does not silently discard unreadable history.

## Scope and future work

This is a single-user, local academic prototype. Run only one server process per data file. It has no login or multi-user authorization and should not be exposed publicly as-is. Do not enter sensitive personal information. Future work: semantic AI feedback, authentication, a database and user testing. The browser-generated reports are plain text; the PowerPoint file is in `presentation/`.

See `PANEL_GUIDE.md` for the five-minute explanation and viva answers.
