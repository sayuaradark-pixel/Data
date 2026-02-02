const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");

// මුලින්ම root path එක සෙට් කරගමු
__path = process.cwd();

/**
 * ⚠️ වැදගත්: Hugging Face Spaces වලදී default port එක 7860 විය යුතුය.
 */
const PORT = process.env.PORT || 7860;

// ඔයාගේ start.js එක මෙතනින් load වෙනවා
// මේකේ තමයි WhatsApp logic එක සහ mongoDB සම්පූර්ණ වැඩ ටික තියෙන්නේ
let code = require('./start');

// Memory leaks වැළැක්වීමට listeners ප්‍රමාණය වැඩි කිරීම
require('events').EventEmitter.defaultMaxListeners = 500;

/* ---------- MIDDLEWARES ---------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * 📂 Public Folder: මෙහි pair.html සහ main.html තිබිය යුතුය.
 * Hugging Face එකේ පේන්න නම් මේ folder එක අනිවාර්යයි.
 */
app.use(express.static(path.join(__dirname, 'public')));

/* ---------- ROUTES ---------- */

// WhatsApp Pairing logic එකට අදාළ API එක '/code' යටතේ වැඩ කරයි
app.use('/code', code);

// /start ගියහම පේන page එක
app.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pair.html'));
});

// Main Dashboard එක (මුල් පිටුව)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

/* ---------- SERVER START ---------- */
app.listen(PORT, () => {
    console.log(`
=========================================
🚀 SAYURA-MD MINI IS RUNNING!
📂 Path: http://localhost:${PORT}
🔗 Hugging Face Space: Online
=========================================
`);
});

module.exports = app;