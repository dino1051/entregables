import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });
// 🚫 No eliminar las líneas de arriba ⬆️

// ✍️ Escribe tu código aquí 👇
let systemName: string = "Windows 11";
let version: number = 23.2;
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
const noTasks = (x:number)=>{
    let msg=""
    if(x==1){msg=" pendientes"}
    if(x==2){msg=" completadas"}
    console.log(`
        ==================================
            No hay tareas${msg} que mostrar!
        ==================================`);
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}
let n: number = 0;
let tasks: Task[] = [];

async function addTask(title: string) {
  try {
    if (title === "") {
      throw new Error("Ha ingresado una tarea en blanco!");
    } else {
      n++;
      let tarea: Task = {
        id: n,
        title: title,
        completed: false,
      };
      await saveToDB(tarea);
      tasks.push(tarea);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
const listTasks = (tasks: Task[]) => {
  let lista = tasks.map((task) =>
    task.completed
      ? `
        [${task.id}] ${task.title} - completed`
      : `
        [${task.id}] ${task.title} - pending`,
  );
  lista.forEach((cadena: string) => {
    console.log(cadena);
  });
};

const removeTask = (n: number, tasks: Task[]): void => {
  let tasks2: Task[] = [];
  if (n < tasks.length / 2) {
    let j = 0;
    for (let i = 0; i < n; i++) {
      tasks2.push(tasks[j]);
      tasks.shift();
    }
    tasks.shift();
    for (let i = tasks2.length - 1; i >= 0; i--) {
      tasks.unshift(tasks2[i]);
    }
  } else {
    let j = tasks.length - 1;
    for (let i = tasks.length - 1; i > n; i--) {
      tasks2.push(tasks[j]);
      tasks.pop();
      j--;
    }
    tasks.pop();
    for (let i = tasks2.length - 1; i >= 0; i--) {
      tasks.push(tasks[i]);
    }
  }
};
/*
const recorrerId = (n:number,tasks:Task[]) =>{
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].id = i;     
    }
}
*/

const markCompleted = (id: number, tasks: Task[]) => {
  const found = tasks.find((element) => element.id === id);
  found.completed = true;
  return found;
};

const filterPending = (): Task[] => {
  const filtro = tasks.filter((task) => task.completed === false);
  return filtro;
};
const filterCompleted = (): Task[] => {
  const filtro = tasks.filter((task) => task.completed === true);
  return filtro;
};

async function saveToDB(task: Task) {
  await new Promise((resolve, reject) => {
    if (task.title == typeof undefined) {
      reject("Tarea invalida");
    } else {
      setTimeout(() => {
        resolve(task);
        console.log(`
        ==================================
        Se ha agregado correctamente la tarea: ${task.title}
        ==================================`);
      }, 2000);
    }
  });
}

console.log(initMsg);

do {
  console.log(menuMsg);
  let ans = await rl.question("");
  ans = parseInt(ans);
  if (ans == 1) {
    let title = await rl.question("Ingrese la tarea que desea agregar\n");
    await addTask(title);
  }
  if (ans == 2) {
    if (n == 0) {
      noTasks(0);
    } else {
      let index = await rl.question("Qué número de tarea deseas eliminar?\n");
      index--;
      if (index <= n) {
        console.log(`
        ==================================
            Has eliminado la tarea ${tasks[index].title} !
        ==================================
                `);
        removeTask(index, tasks);
        //recorrerId(n,tasks)
        n--;
      } else {
        console.log(`Ingrese un número valido`);
      }
    }
  }
  if (ans == 3) {
    if (n == 0) {
      noTasks(0);
    } else {
      listTasks(tasks);
    }
  }
  if (ans == 4) {
    if (n == 0) {
      noTasks(0)
    } else {
      let index = await rl.question(
        "Qué número de tarea deseas marcar como completada?\n",
      );
      index = parseInt(index);
      if (index <= n) {
        markCompleted(index, tasks);
        console.log(`
        ==================================
        Ahora ${markCompleted(index, tasks).title} está completada
        ==================================`);
      }
    }
  }
  if (ans == 5) {
    if (n == 0) {
      noTasks(0);
    } else {
      if (typeof filterPending()[0] != typeof undefined) {
        listTasks(filterPending());
      } else {
        noTasks(n=1);
      }
    }
  }
  if (ans == 6) {
    if (n == 0) {
      noTasks(0);
    } else {
      if (typeof filterCompleted()[0] != typeof undefined) {
        listTasks(filterCompleted());
      } else {
        noTasks(n=2);
      }
    }
  }
  if (ans == 7) {
    console.log(`Buen día, ${userName}, hasta pronto.`);
    break;
  }
} while (true);

// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();
