const express = require('express');
const app = express();
const {engine} = require('express-handlebars');

// Internationlization
const i18n = require('i18n');
i18n.configure({
    locales: ['en', 'es'],
    directory: __dirname + '/locales'
});

app.use(i18n.init);

// Use handlebars as view engine
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');


// Handle change of language
app.use((req, res, next) => {
    // Set language from query parameter or cookie or default to 'en'
    let lang = req.query.lang || req.cookies?.lang || 'en';

    // Update cookie if language is changed via query parameter
    if (req.query.lang) {
        res.cookie('lang', req.query.lang, {maxAge: 900000, httpOnly: true});
    }

    // Set language for i18n
    req.setLocale(lang);
    res.locals.lang = lang;

    // Continue
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Run
app.listen(3000, () => console.log('Server running at http://localhost:3000/'));
