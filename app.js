const argv = require('./config/yargs').argv;
const toDo = require('./por-hacer/por-hacer');
const colors = require('colors');


let comando = argv._[0];

switch (comando) {
    case 'crear':
        let task = toDo.create(argv.descripcion);
        console.log(task);
        break;

    case 'listar':
        let list = toDo.getList();
        for (let task of list) {
            console.log('===== To Do ====='.green);
            console.log(task.descripcion);
            console.log('Status: ', task.completado);
            console.log('================='.green);
        }
        break;

    case 'actualizar':
        let update = toDo.update(argv.descripcion, argv.completado);
        console.log(update);
        break;

    case 'eliminar':
        let deleted = toDo.deleted(argv.descripcion);
        console.log(deleted);
        break;

    default:
        console.log('Comando no reconocido');
}