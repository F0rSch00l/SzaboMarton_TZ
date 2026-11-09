const express = require("express");
const mysql2 = require("mysql2/promise");

const app = express();

app.use(express.json());

const conn = mysql2.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "konyvtar_db"
});

//Done
app.get("/", (req, res) => {
    res.status(200).send("Működik ✔");
});

//Done
app.get("/konyvek", (req, res) => {
    let sqlQuery = "SELECT konyvek.id, cim, kiadasi_ev, oldalszam, kolcsonozheto, mufajok.nev as 'mufaj_nev' FROM konyvek INNER JOIN mufajok ON konyvek.mufaj_id = mufajok.id ORDER BY kiadasi_ev"
    conn.query(sqlQuery,
        (err, results) => {
        if (err)
        {
            console.log(err);
            res.status(500).send("Hiba adatbázis hiba");
            return;
        }
        res.status(201).send(results);
    });
});

//Done
app.get("/konyvek/elerheto", (req, res) => {
    let sqlQuery = "SELECT id, cim, kiadasi_ev, oldalszam, kolcsonozheto, mufaj_id FROM konyvek WHERE kolcsonozheto AND kiadasi_ev < 2000 ORDER BY id"
    conn.query(sqlQuery,
        (err, results) => {
        if (err)
        {
            console.log(err);
            res.status(500).send("Hiba adatbázis hiba");
            return;
        }
        res.status(201).send(results);
    });
});

//Done
app.get("/konyvek/hosszuak", (req, res) => {
    let sqlQuery = "SELECT cim, kiadasi_ev, oldalszam FROM konyvek WHERE oldalszam > 400 ORDER BY oldalszam DESC"
    conn.query(sqlQuery,
        (err, results) => {
        if (err)
        {
            console.log(err);
            res.status(500).send("Hiba adatbázis hiba");
            return;
        }
        res.status(201).send(results);
    });
});

//Done
app.get("/konyvek/kereses/:szoveg", (req, res) => {
    let sqlQuery = `SELECT id, mufaj_id, cim, kiadasi_ev, oldalszam, kolcsonozheto FROM konyvek WHERE cim LIKE '%${req.params.szoveg}%';`
    conn.query(sqlQuery,
        (err, results) => {
        if (err)
        {
            console.log(err);
            res.status(500).send("Hiba adatbázis hiba");
            return;
        }
        res.status(201).send(results);
    });
});

//Done
app.get("/mufajok/statisztika", (req, res) => {
    let sqlQuery = "SELECT mufajok.nev ,COUNT(mufaj_id) AS 'konyvek_szama', AVG(oldalszam) AS 'atlagos_oldalszam' FROM konyvek INNER JOIN mufajok ON mufajok.id = konyvek.mufaj_id GROUP BY mufaj_id;"
    conn.query(sqlQuery,
        (err, results) => {
        if (err)
        {
            console.log(err);
            res.status(500).send("Hiba adatbázis hiba");
            return;
        }
        res.status(201).send(results);
    });
});

app.post('/users', async (req, res) => {
    
    
    const {mufaj_id ,cim, kiadasi_ev, oldalszam, kolcsonozheto} = req.body;

    const query = "INSERT INTO konyvek (mufaj_id, cim, kiadasi_ev, oldalszam, kolcsonozheto) VALUES (?,?,?,?,?)";
    try {
        const [results] = await conn.execute(query, [mufaj_id, cim, kiadasi_ev, oldalszam, kolcsonozheto]);
        res.status(200).send("Feltöltés sikeres")
    }
    catch(err)
    {
        
    
             return res.status(500).send("Hiba az adatbázisba való feltöltés során: " + err);
           
    }
});

app.delete("/delUser", async (req, res) => {
    
    const {id} = req.body;

    const query = "DELETE FROM konyvek WHERE id = ?";
    try{
        const [results] = await conn.execute(query, [id]);
        res.status(200).send("Törlés sikeres");
    }
    catch(err){
        return res.status(500).send("Hiba: " + err)
    }
})

app.post("/updateTitle", async (req, res) => {
    const {id, paramValue} = req.body;

    const query = "UPDATE konyvek SET cim = ? WHERE id LIKE ?";

    try{
        const [results] = await conn.execute(query, [paramValue, id]);
        res.status(200).send("Frissítés sikeres");
    }
    catch(err)
    {
        return res.status(500).send("Hiba: " + err)
    }
})


//Done
app.listen(3000, (err) =>{
    if(err)
        {
            console.log(err);
            return;
        }
    console.log("API működik a 3000-es porton");
});