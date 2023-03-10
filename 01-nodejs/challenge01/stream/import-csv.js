import { parse } from 'csv-parse';
import fs from 'node:fs';


fs.createReadStream("./tasks.csv")
  .pipe(parse({ delimiter: ",", from_line: 2, skipEmptyLines: true}))
  .on("data", async function (row) {
        const [title, description] = row
        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            })
        })
        
        })
  .on("error", function (error) {
    console.log(error.message);
  });