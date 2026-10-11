# Five-minute panel guide

**Title:** AI Interview Mock Simulator
**Members:** Sarvajeet Bajikar & Adhiraj Kalkundrikar

## Problem statement

Students need a structured way to practice interview answers and review missing concepts. The project provides role-based questions, guided practice, immediate rubric feedback and saved reports in one web application.

## Five-minute speaking order

1. **Introduction — 35 seconds:** “Humara project students ko interview practice karne ke liye ek guided web platform deta hai. User questions answer karta hai, feedback dekhta hai aur previous attempts review kar sakta hai.”
2. **Problem — 40 seconds:** “Question lists available hain, lekin structured sessions, immediate feedback aur saved answers ek saath nahi milte. Humara prototype is workflow ko connect karta hai.”
3. **Methodology — 55 seconds:** “HTML forms se input lete hain. CSS interface ko responsive banata hai. JavaScript events, timer aur DOM updates handle karta hai. Fetch aur async/await se server ke saath communication hota hai.”
4. **Architecture — 60 seconds:** “Node.js aur Express backend par validation aur scoring handle karte hain. Questions aur evaluator separate modules hain. Submitted answers JSON file mein persist hote hain, drafts browser localStorage mein.”
5. **Evaluation — 60 seconds:** “Four concept groups mein three match ho to coverage 75 percent hai. Ye keyword-based AI-style prototype hai, trained AI nahi. Correctness verify nahi hoti; reference answer review ke liye diya hai.”
6. **Demo and conclusion — 50 seconds:** “Start interview, submit answer, feedback dekho, report download karo. Automated tests core API flows verify karte hain. Future mein semantic AI, login aur database add kar sakte hain.”

## A short live demo

- Choose Web development → Beginner → 3 questions.
- First answer: “HTML defines the structure. CSS controls the styles. JavaScript adds interactivity.”
- Submit; explain why all four concept groups match.
- Show reference feedback; complete or skip the next questions.
- Open report, download it, and reopen it from History.
- If time is tight, use the interactive rubric example on presentation slide 5.

## Likely viva questions

**1. Is this actually a trained AI model?**
No. The current prototype is rule-based. It imitates the interview-and-feedback workflow using a curated question bank and explainable concept matching. A semantic model is future scope.

**2. Why call it an AI interview simulator?**
That is the project theme and intended direction. We explicitly describe the implemented version as an AI-style prototype so its capabilities are not overstated.

**3. What does the frontend use?**
HTML for structure, CSS for layout and styling, and vanilla JavaScript for interaction. No React framework is required.

**4. What does the backend use?**
Node.js with the Express npm module. Node executes JavaScript on the server; Express handles routes and requests.

**5. How is the score calculated?**
The answer is normalized and checked against four concept groups. Each matched group contributes 25 points. Repeating a keyword does not increase its contribution.

**6. What is the main evaluation limitation?**
It cannot reliably understand meaning or verify correctness. Valid paraphrases may be missed, and incorrect answers containing the terms may score well.

**7. What is the DOM?**
The document's object representation in the browser. JavaScript changes elements to show the next question or feedback without reloading the entire page.

**8. Why use async/await?**
It makes asynchronous fetch calls easier to follow. We wait for the response while the browser remains responsive, then update the UI.

**9. Where is data stored?**
Submitted sessions are in the server's JSON file. Unsubmitted drafts are in browser localStorage. JSON-file storage is sufficient only for this small local prototype.

**10. How is input validated?**
The server checks name length, allowed tracks and levels, question count, answer size, elapsed time and question order. Frontend validation adds usability but is not trusted by itself.

**11. How do you avoid duplicate answers?**
Answers have question IDs. Retrying the same saved answer returns the existing session; a different answer for an already submitted question is rejected.

**12. What did you test?**
Scoring, punctuation, question-bank coverage, input rejection, session lifecycle, retry behavior, persistence after restart, deletion and five-question configurations. Real-browser UI and speech need local checking.

**13. Why does the timer not force submission?**
It guides practice rather than penalizing learners. They can finish their answer after the suggested two minutes.

**14. How would you make it production ready?**
Add authenticated user accounts, per-user authorization, a proper database, stronger operational security, semantic AI evaluation with clear rubric testing, and real user/browser testing.

**15. What does npm do?**
It installs dependencies from package.json and runs scripts. `npm start` launches the Node server; `npm test` runs the automated tests.
