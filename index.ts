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

console.log(lines+msg00+version+"\n"+msg01+userName+"!"+lines)

// 🚫 No eliminar las líneas de abajo ⬇️
rl.close();