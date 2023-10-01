const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;
app.use(express.json())
//Se crea la base de datos
let peliculas=[{id:0, titulo:"pelicula 0",director:"director 0", ano:2000, genero:"genero 0", clasificacion:"clasificacion 0"},
                 {id:1, titulo:"pelicula 1",director:"director 1", ano:2001, genero:"genero 1", clasificacion:"clasificacion 1"},
                 {id:2, titulo:"pelicula 2",director:"director 2", ano:2002, genero:"genero 2", clasificacion:"clasificacion 2"},
                 {id:3, titulo:"pelicula 3",director:"director 3", ano:2003, genero:"genero 3", clasificacion:"clasificacion 3"},
                 {id:4, titulo:"pelicula 4",director:"director 4", ano:2004, genero:"genero 4", clasificacion:"clasificacion 4"},
                 {id:5, titulo:"pelicula 5",director:"director 5", ano:2005, genero:"genero 5", clasificacion:"clasificacion 5"},
                 {id:6, titulo:"pelicula 6",director:"director 6", ano:2006, genero:"genero 6", clasificacion:"clasificacion 6"},
                 {id:7, titulo:"pelicula 7",director:"director 7", ano:2007, genero:"genero 7", clasificacion:"clasificacion 7"},
                 {id:8, titulo:"pelicula 8",director:"director 8", ano:2008, genero:"genero 8", clasificacion:"clasificacion 8"},
                 {id:9, titulo:"pelicula 9",director:"director 9", ano:2009, genero:"genero 9", clasificacion:"clasificacion 9"},];
//Se genera la consulta de todos las peliculas
app.get('/socios/v1/peliculas',(req,res)=>{
    if(peliculas){
        res.status(200).json({
            estado:1,
            mensaje:"Existen peliculas",
            peliculas: peliculas
    })
    }else{res.status(404).json({
        estado:0,
        mensaje:"No se encontraron peliculas",
        peliculas: peliculas
    })
    }
})
//Consulta de una pelicula en específico
app.get('/socios/v1/peliculas/:id', (req, res) => {
    const id = req.params.id;
    const pelicula = peliculas.find(pelicula => pelicula.id == id); //se ahorra el for
    if (pelicula) {
        res.status(200).json({
            estado: 1,
            mensaje: "Sí se encontró la pelicula",
            pelicula: pelicula
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "pelicula no encontrada",
            pelicula: {}
        })
    }
})
//Se crea un pelicula nueva
app.post('/socios/v1/peliculas',(req,res)=>{

    const{ titulo, director, ano, genero, clasificacion}= req.body;

    const id = Math.round(Math.random()*1000);
    if(titulo==undefined || ano== undefined || director== undefined|| genero== undefined || clasificacion== undefined){
        res.status(400).json({
            estado: 0,
            mensaje:"Faltan parametros a la solicitud"
        })

    }else{
        const nuevoPelicula={id:id, titulo:titulo, director:director, ano:ano, genero: genero, clasificacion:clasificacion};
        const longitudInicial = peliculas.length;
        console.log(peliculas.length);
        console.log(longitudInicial);
        peliculas.push(nuevoPelicula)
        if(peliculas.length>longitudInicial){
            //Todo Ok de parte del cliente y el servidor
            res.status(201).json({
                estado:1,
                mensaje: "Pelicula creada",
                nuevoPelicula: nuevoPelicula
            })
        }else{
            //Error del creador de la API o de la base de datos, de la base de datos o de quien lo configura
            res.status(500).json({
                estado: 0,
                mensaje: "Ocurrio un error desconocido"

            })
        }
        
    } 
    
})
//Se actualiza una pelicula
app.put('/socios/v1/peliculas/:id',(req,res)=>{

    const{ id}=req.params;
    const{ titulo, director, ano, genero, clasificacion}= req.body;
    if(titulo==undefined||director==undefined || ano==undefined || genero== undefined, clasificacion==undefined){
        res.status(400).json({
            estado:0,
            mensaje: "Bad request, Faltan parametros en la solicitud"
        })
    }else{
        const posActualizar =peliculas.findIndex(pelicula=>pelicula.id==id)
        if(posActualizar!= -1){

            peliculas[posActualizar].ano=ano;
            peliculas[posActualizar].clasificacion=clasificacion;
            peliculas[posActualizar].genero=genero;
            peliculas[posActualizar].director=director;
            peliculas[posActualizar].titulo=titulo;
            res.status(200).json({
                estado:1,
                mensaje:"pelicula actualizada",
                peliculas:peliculas[posActualizar]
            })
        }else{

            res.status(404).json({
                estado:0,
                mensaje:"No se encontró el registro"
            })
        }
    }

})
//Se elimina una pelicula
app.delete('/socios/v1/peliculas/:id',(req,res)=>{

    const{ id }= req.params;
    const indiceEliminar= peliculas.findIndex(pelicula=>pelicula.id==id)
    if(indiceEliminar!=-1){
        peliculas.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"pelicula eliminada con exito"
        })

    }
    else{
        res.status(404).json({
            estado:0,
            mensaje:"registro no encontrado"
        })
    }
})

app.listen(puerto,()=>{
console.log(('servidor corriendo en el puerto', puerto));
})