const { runStoredProcedure} = require('./../services/dbService');
const sql = require('mssql');
const {getCurrentConfig} = require('./../services/configService');
const webSocketService = require('./../services/webSocketService');
const {log, levels} =  require('./../utils/logUtils');

var intervalId;
async function startCheckDates(){{
     try {
         const config = getCurrentConfig();
          CheckTasksScheduling();
         intervalId =   setInterval(()=>{
             CheckTasksScheduling();
            }, config.INTERVAL) 
            
     }
    catch (err) {
        log(err. levels.ERROR);
    }
}}

function CheckTasksScheduling(){
   runStoredProcedure('spCheckScheduling').then(({recordset}) => {
            log(`spCheckScheduling result:${recordset.length}`,levels.INFORMATION)
            for(let task of recordset){
                const {name} = task;
                webSocketService.emitAll({topic:'important', data:JSON.stringify({name, date: getToday() })});
            }
        }).catch(err => {
            log( err, levels.ERROR);
            reject(err);
        })  
}
function getToday(){
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // חודשים מתחילים מ-0
    const year = today.getFullYear();
    return  day+'/'+month+ '/' +year;
}


async function sendMassage(userName, message){
    try {
        webSocketService.emitAll({topic:'message', data:JSON.stringify({userName, message}) });
     }
    catch (err) {
        log(err. levels.ERROR);
    }
 }


module.exports = {  startCheckDates, sendMassage};

