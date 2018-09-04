const fs = require('fs');

let listToDo = [];

const saveDb = () => {
    let data = JSON.stringify(listToDo);
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err)
            throw new Error(err)
    });
}

const chargedDB = () => {
    try {
        listToDo = require('../db/data.json');
    } catch (error) {
        listToDo = [];
    }
}

const create = (descripcion) => {
    chargedDB();
    let toDo = {
        descripcion,
        completado: false
    };
    listToDo.push(toDo);
    saveDb();
    return toDo;
}

const getList = () => {
    chargedDB();
    return listToDo;
}

const update = (descripcion, completado = true) => {
    chargedDB();

    let index = listToDo.findIndex(task => task.descripcion === descripcion);
    if (index >= 0) {
        listToDo[index].completado = completado;
        saveDb();
        return true;
    } else {
        return false;
    }
}

const deleted = (descripcion) => {
    chargedDB();
    let index = listToDo.findIndex(task => task.descripcion === descripcion);
    if (index >= 0) {
        listToDo.splice(index, 1);
        saveDb();
        return true;
    } else {
        return false;
    }
    // let newList = listToDo.filter( task => {
    //     return task.descripcion !== descripcion
    // });
    // if ( listToDo.length === newList.length) {
    //     return false;
    // } else {
    //     listToDo = newList;
    //     saveDb();
    //     return true;
    // }
}

module.exports = {
    create,
    getList,
    update,
    deleted
}