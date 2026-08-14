import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
// 🚫 No eliminar las líneas de arriba ⬆️

// ✍️ Escribe tu código aquí 👇
let systemName: string = "Windows 11";
let version: number = 23.2 ;
let userName: string = "Daniel S";

const initMsg: string = `
        ==================================
            Nombre del sistema v${version}
            ¡Bienvenido, ${userName}!
        ==================================`;
const menuMsg: string = `
        ==================================
            Qué deseas hacer?
                1. Agregar una tarea.
                2. Eliminar una tarea.
                3. Mostrar todas las tareas.
                4. Marcar tarea completada.
                5. Mostrar tareas pendientes.
                6. Mostrar tareas completadas.
                7. Salir del programa.
        ==================================`;

interface Task{
    id: number;
    title: string;
    completed: boolean;
}
let n: number = 0;
let tasks: Task[] = [];

const addTask = (title:string) =>{
    n++
    let tarea: Task = {
        id:n,
        title:title,
        completed: false
    }
    tasks.push(tarea);
    console.log(`
        ==================================
        Se ha agregado correctamente la tarea: ${title}
        ==================================
        `)
}
const listTasks = (tasks:Task[]) =>{
    let lista = tasks.map(task=>task.completed?`
        [${task.id}] ${task.title} - completed`:`
        [${task.id}] ${task.title} - pending`);  
    lista.forEach((cadena:string)=>{console.log(cadena)});
}

const removeTask = (n:number,tasks:Task[]):void=> {
    let tasks2: Task[] = [];
    if(n<(tasks.length/2)){
        let j = 0;
        for (let i = 0; i < n; i++) {
            tasks2.push(tasks[j]);
            tasks.shift();
     
        }
        tasks.shift();
        for (let i = tasks2.length-1;i >= 0;i--){
            tasks.unshift(tasks2[i]);
        }
    }else{
        let j = tasks.length-1;
        for (let i = tasks.length-1; i > n; i--) {
            tasks2.push(tasks[j]);
            tasks.pop();
            j--;
        }
        tasks.pop();
        for (let i = tasks2.length-1;i >= 0;i--){
            tasks.push(tasks[i]);
        
            }
        }
}
/*
const recorrerId = (n:number,tasks:Task[]) =>{
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].id = i;     
    }
}
*/

const markCompleted = (id: number,tasks:Task[]) =>{
    const found = tasks.find((element) => element.id === id);
    found.completed = true;
    return found;
}

const filterPending = (task:Task[]):Task[] =>{
    const filtro = tasks.filter((task) => task.completed === false);
    return filtro;
}
const filterCompleted = (task:Task[]):Task[] =>{
    const filtro = tasks.filter((task) => task.completed === true);
    return filtro;
}

console.log(initMsg);

do {
    console.log(menuMsg);
    let ans = await rl.question("");
    ans = parseInt(ans);
    if(ans == 1){
        let title = await rl.question("Ingrese la tarea que desea agregar\n");
        
        addTask(title);
    };
    if(ans == 2){
        if(n==0){console.log(`
        ==================================
            No hay tareas que mostrar!
        ==================================`)}
        else{
            let index = await rl.question("Qué número de tarea deseas eliminar?\n");
            index--;
            if(index<=n){
                console.log(`
        ==================================
            Has eliminado la tarea ${tasks[index].title} !
        ==================================
                `)
                removeTask(index,tasks);
                //recorrerId(n,tasks)
                n--;
            }
            else{
                console.log(`Ingrese un número valido`)
            }
        }
          
    };
    if(ans == 3){
        if(n==0){console.log(`
        ==================================
            La lista de tareas está vacía!
        ==================================`)}else{
            listTasks(tasks);
        }
    };
    if(ans == 4){
        if(n==0){console.log(`
        ==================================
            La lista de tareas está vacía!
        ==================================`)}
        else{
            let index = await rl.question("Qué número de tarea deseas marcar como completada?\n");
            index = parseInt(index)
            if(index<=n){
                    markCompleted(index,tasks);
                    console.log(`
        ==================================
        Ahora ${markCompleted(index,tasks).title} está completada
        ==================================`);
            }  
        }
    }
    if(ans == 5){
        if(n==0){console.log(`
        ==================================
            La lista de tareas está vacía!
        ==================================`)}
        else{
            if(typeof(filterPending(tasks)[0])!=typeof(undefined)){
                listTasks(filterPending(tasks));
            }else{console.log(`
        ==================================
            La lista de tareas pendientes está vacía!
        ==================================`)}
    }}
    if(ans == 6){
        if(n==0){console.log(`
        ==================================
            La lista de tareas está vacía!
        ==================================`)}
        else{
            if(typeof(filterCompleted(tasks)[0])!=typeof(undefined))
                {
        listTasks(filterCompleted(tasks));
            }else{console.log(`
        ==================================
            La lista de tareas completadas está vacía!
        ==================================`)}}}
    if(ans == 7){
        console.log(`Buen día, ${userName}, hasta pronto.`)
        break;
    };
}while (true);
        

// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();