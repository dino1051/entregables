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
                5. Salir del programa.
        ==================================`;

interface Task{
    id: number;
    title: string;
    completed: boolean;
}
let n: number = 0;
let tasks: Task[] = [];

const addTask = (title:string) =>{ 
    let tarea: Task = {
        id:n,
        title:title,
        completed: false
    }
    tasks.push(tarea);
    n++;
    console.log(`
        ==================================
            Se ha agregado correctamente la tarea: ${title}
        ==================================
        `)
}
const listTasks = () =>{
    for (let i = 0; i < tasks.length; i++){
        let j = tasks[i].id + 1;
        let status: string;
        if(tasks[i].completed){status="completed"}else{status="pending"}
        console.log(`[${j}] ${tasks[i]?.title} - ${status}`);        
    }
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
const recorrerId = (n:number,tasks:Task[]) =>{
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].id = i;     
    }
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
                recorrerId(n,tasks)
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
            listTasks();
        }
    };
    if(ans == 4){
        if(n==0){console.log(`
        ==================================
            La lista de tareas está vacía!
        ==================================`)}
        else{
            let index = await rl.question("Qué número de tarea deseas marcar como completada?\n");
            index--;
                if(index<=n){
                    tasks[index].completed = true;
                }  
            }
    }
    if(ans == 5){
        console.log(`Buen día, ${userName}, hasta pronto.`)
        break;
    };
}while (true);
        

// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();