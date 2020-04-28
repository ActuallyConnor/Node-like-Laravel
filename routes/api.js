const express = require ('express');
const app = express();

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
app.get('/api/', function(req, res) {
    
    // serves /api/index.html
    res.sendFile('/index.html');
    
});
