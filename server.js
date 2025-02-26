
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
app.use(cors());

function loadHealthcareData(callback) {
    let results = [];
    fs.createReadStream("healthcare_dataset.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            console.log(`Loaded ${results.length} records`); 
        });
}

app.get("/data", (req, res) => {
    loadHealthcareData((data) => {
        res.json({
            qualityMetric: "High", 
            testResults: data.map(row => ({
                name: row.Name || "Unknown",
                age: row.Age || "Unknown",
                gender: row.Gender || "Unknown",
                bloodType: row["Blood Type"] || "Unknown",
                result: row["Test Result"] || "Unknown"
            }))
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
