const http = require("http")
const url = require("url")
const fs = require("fs")
http.createServer(function(req, res){
    const param = url.parse(req.url, true).query;
    const archivo = param.archivo;
    const contenido = param.contenido;
    const nombre = param.nombre;
    const nuevoNombre = param.nuevoNombre;
    const fechaDia = new Date();
    const fecha = `${fechaDia.getDate()}/0${fechaDia.getMonth()+1}/${fechaDia.getFullYear()}`;

    if(req.url.includes('/crear')){ //uff8 por temas de lengueja en caracteres
        fs.writeFile(archivo, `${fecha}\n${contenido}`, 'utf8', ()=>{
            res.write(`${archivo} creado de forma exitosa`);
            res.end();
        })
    }
    if(req.url.includes('/leer')){
        fs.readFile(archivo, "utf8", (err, data)=>{
            res.write(`Archivo ${archivo} fue encontrado, ${data}`);
            res.end();
        })
    }
    if(req.url.includes('/renombrar')){
        fs.rename(nombre, nuevoNombre, (err, data)=>{
            res.write(` El archivo ${nombre} fue renombrado por ${nuevoNombre} exitosamente :D`);
            res.end();
        })
    }
    if(req.url.includes('/eliminar')){
        fs.unlink(archivo, (err, data)=>{
            res.write(`El archivo ${archivo} ha sido eliminado breo`);
            res.end();
        })
    }
})
.listen(8080, ()=>console.log("El puerto 8080 ha sido conectado mi pana"));