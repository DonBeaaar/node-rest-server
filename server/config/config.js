// ==========================================
// Puerto
// ==========================================

process.env.PORT = process.env.PORT || 3000;


// ==========================================
// Entorno
// ==========================================


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



// ==========================================
// DB
// ==========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';


} else {
    urlDB = 'mongodb+srv://felipe:HCesSfozupYjLecm@cluster0-jpbc6.mongodb.net/cafe?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
}


process.env.URL_DB = urlDB;