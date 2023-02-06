require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { connectToFirebaseRDB } = require('../traditional/lib/db-firebase');
const { get ,child, set} = require('firebase/database');

app.use(cors());
app.use(express.json());

app.get('/readNFT/:id', async (req, res) => {
    try{
        // Read the data
        var dbRef = connectToFirebaseRDB();
        get(child(dbRef, `nfts/${req.params.id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                res.status(200).json({
                    data: snapshot.val()
                })
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        }); 
    }catch(err){
        return err;
    }
});

app.post('/createNFT', async (req, res) => {
    const {kind, type, filter, owner} = req.body;

    try {
        const dbRef = connectToFirebaseRDB();
        set(child(dbRef, `nfts/${owner}`),{
            keyboardFilter: filter,
            keyboardKind: kind,
            keyboardType: type
        })
        return res.status(201).json({
            success: true,
            message: 'NFT creation successfully!'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }


    
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
