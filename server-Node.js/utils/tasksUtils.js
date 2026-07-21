const { runStoredProcedure} = require('./../services/dbService');
const sql = require('mssql');
const { log , levels } = require('./logUtils');

function getTasks(){
    return new Promise((resolve, reject) =>{
      runStoredProcedure('spGetTasks').then(({recordset}) => {
        log(`spGetTasks result:${recordset.length}`,levels.INFORMATION)
        resolve  (recordset) ;
    }).catch(err => {
        log( err, levels.ERROR);
        reject(err);
    })
    })
}

function addOrUpdateTask(task){
    const{taskId, name, description, price, scheduling, status} = task;
    // Ensure numeric types, fallback defaults for SQL Server
    const tid   = (taskId != null && !Number.isNaN(Number(taskId))) ? Number(taskId) : 0;
    const prc   = (price != null && !Number.isNaN(Number(price))) ? Number(price) : 0;
    const st    = (status != null && !Number.isNaN(Number(status))) ? Number(status) : 0; // 0 = pending
    const sched = scheduling ? new Date(scheduling) : new Date();

    return new Promise((resolve, reject) =>{
      const params = {
          taskId:      { type: sql.Int,           value: tid   },
          name:        { type: sql.NVarChar(50),  value: name || ''   },
          description: { type: sql.NVarChar(sql.MAX), value: description || ''   },
          price:       { type: sql.Float,         value: prc   },
          scheduling:  { type: sql.Date,          value: sched   },
          status:      { type: sql.Int,           value: st   },
      };

      runStoredProcedure('spAddOrUpdateTask', params).then((_) => {
          resolve  (true) ;
        }).catch(err => {
            log( err, levels.ERROR);
            reject(err);
        })
    })
}


function deleteTask(taskId){
 
    return new Promise((resolve, reject) =>{
      const params = {
          taskId: { type: sql.Int, value: taskId   },
      };

      runStoredProcedure('spDeleteTask', params).then((_) => {
          resolve  (true) ;
        }).catch(err => {
            log( err, levels.ERROR);
            reject(err);
        })
    })
}




module.exports = { getTasks, addOrUpdateTask, deleteTask};