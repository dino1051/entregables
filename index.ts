import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
// 🚫 No eliminar las líneas de arriba ⬆️

// ✍️ Escribe tu código aquí 👇
let systemName: string = "Windows 11";
let version: number = 23.2 ;
let userName: string = "Daniel S";

const lines: string = "\n==================================\n"
const msg00: string = 'Nombre del sistema v'
const msg01: string = '¡Bienvenido, '
let opcion: number = 0;
let titulos: string[] = []
let status: boolean = true
console.log(lines+msg00+version+"\n"+msg01+userName+"!"+lines)

while(status){

    console.log(`${lines} Qué deseas hacer?
        1. Agregar el título de un libro
        2. Eliminar el título del último libro agregado
        3. Mostrar todos los títulos de libros
        4. Salir del programa${lines}`)
    let ans = await rl.question("")
    switch (parseInt(ans)){
        case 1:
            let libro = await rl.question("Ingresa el titulo: ");
            titulos.push(libro);
            console.log(`Se ha agregado ${libro} a la lista`);
        case 2:
            console.log(`Se ha eliminado ${titulos[titulos.length]} de la lista`);
            titulos.pop();
        case 3:
            for (let i = 0;i < titulos.length;i++) {
                console.log(`${i}: ${titulos[i]}`);                
            }
        case 4:
            status = false;
            console.log(`Buen día, ${userName}, hasta pronto.`)
            break;
        default:
            console.log('Opcion no valida, vuelve a intentarlo')
    }

}

// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();