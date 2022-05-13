const userRoutes = (app, fs) => {
  // variables
  const dataPath = './projectfolder/data/users.json';

  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = 'utf8'
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = 'utf8'
  ) => {
    fs.writeFile(filePath, fileData, encoding, err => {
      if (err) {
        throw err;
      }

      callback();
    });
  };

  // READ
  app.get('/users', (req, res) => {
    readFile(data => {
        console.log(data)
      res.send(data);
    }, true);
  });

  app.post('/users', (req, res)=> {
      readFile(data => {
          const newUserId = Date.now().toString();

          data[newUserId] = req.body;

          writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send('new user added');
          });
      })
  });

    // UPDATE
    app.put('/users/:id', (req, res) => {
        readFile(data => {
        // add the new user
        const userId = req.params['id'];
        data[userId] = req.body;
    
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`users id:${userId} updated`);
        });
        }, true);
    });

    // DELETE
    app.delete('/users/:id', (req, res) => {
        readFile(data => {
        // add the new user
        const userId = req.params['id'];
        delete data[userId];
    
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`users id:${userId} removed`);
        });
        }, true);
    });


};

module.exports = userRoutes;