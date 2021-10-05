const express = require('express');
const router = express.Router();
const app = express();
const models = require('./models');

router.get('/', (req,res) => {
    res.send('Hello');
});

router.get('/articles/:id',async (req,res) => {
    // return article from database
    try {
        console.log(req.params.id)
        const articleData = await models.getArticle((req.params.id));
        res.json({error: false, message: 'success', data: articleData});
    }
    catch(e) {
        res.json({error: true, message: 'Error occurred during processing'});
    }
});




app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is listening at ${process.env.PORT || 3000}`);
});