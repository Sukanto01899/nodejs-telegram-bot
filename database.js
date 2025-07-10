const  fsPromise  = require('fs/promises')
const fs  = require('fs');
const path = require('path')
const crypto = require('crypto')


class Database {
  db(name) {
    this.name = name
    const folder = path.join(__dirname, name);

    if (!fs.existsSync(folder)) {
      fs.mkdir(folder, (error) => {
        if (error) throw error;
        console.log("database created");
      });
    }

    return {
      createCollection: (collection = "default") => {
        const folderPath = path.join(__dirname, name);
        const filePath = path.join(folderPath, collection + ".json");

        if (!fs.existsSync(filePath)) {
          fs.writeFile(filePath, JSON.stringify([]), "utf8", (error) => {
            if (error) throw error;
            console.log("collection added!");
          });
        }

        const readJsonData = async () => {
          const data = await fsPromise.readFile(filePath, "utf8");
          return JSON.parse(data);
        };

        const randomId = (length = 8)=>{
            return crypto.randomBytes(length).toString('hex')
        }

        return {
          insertOne: async (data) => {
            const processData = {...data, id: randomId()}
            try {
              const getJson = await readJsonData();
              getJson.push(processData)
              await fsPromise.writeFile(filePath, JSON.stringify(getJson));
              return {success: true}
            } catch (error) {
              return error;
            }
          },

          updateOne: async (query, data)=>{
            const allData = await readJsonData();

            // query keys check
            //allow only one keys
            // filter dat by query

            // const foundedData = allData.find(item => )
          },

          findAll: async ()=>{

          }
        };
      },
    };
  }
}

module.exports = Database