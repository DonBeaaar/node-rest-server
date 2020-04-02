// ==========================================
// Puerto
// ==========================================

process.env.PORT = process.env.PORT || 3000;


// ==========================================
// Entorno
// ==========================================


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==========================================
// Seed
// ==========================================

process.env.SEED = process.env.SEED || 'seed-desarollo';


// ==========================================
// Caducidad token
// ==========================================

process.env.CADUCIDAD_JWT = '48h';





// ==========================================
// DB
// ==========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URL_DB = urlDB;