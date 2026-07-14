const { runStoredProcedure} = require('./../services/dbService');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const { log , levels } = require('./logUtils');

const JWT_SECRET = process.env.JWT_SECRET || 'tasks-app-secret-key-2026';
const JWT_EXPIRES_IN = '24h';

function checkLogin(userName, password){
    return new Promise((resolve, reject) =>{
      const params = {
          userName: { type: sql.NVarChar(50), value: String(userName || '').substring(0, 50) },
          password: { type: sql.NVarChar(100), value: String(password || '').substring(0, 100) },
      };

      runStoredProcedure('spCheckUserLogin', params).then(({recordset}) => {
        log(`spCheckUserLogin result:${recordset}`,levels.INFORMATION)
        resolve(recordset[0]);
    }).catch(err => {
        log(err, levels.ERROR);
        reject(err);
    })
    })
  }

function generateToken(user) {
    const { password, ...payload } = user;
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = { checkLogin, generateToken, verifyToken };
