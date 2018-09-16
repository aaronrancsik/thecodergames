import app from "./app";
import {express} from "./app"
const PORT = 3000;

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})

app.use(express.static('../client'));

app.all('*', (req, res)=> { 
    res.redirect('/'); 
});