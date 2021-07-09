const axios = require('axios');
const memory={};
const movie= (req , res)=> {
    let query=req.query.city;
    let memoryKey=query;
    if(memoryKey in memory)
    {   console.log('cache hit')
        res.send(memory[memoryKey])
    }
    else
    {
        let url= `https://api.themoviedb.org/3/search/movie?api_key=${process.env.themoviedb_API_KEY}&query=${query}`
        const getMoviesAPI=axios.get(url).then(response=>{
            const movies=response.data.results;
            const findData=movies.map(item=> new renderMovies(item))
            memory[memoryKey]=findData;
            console.log('cache missed')
            res.send(findData);
        }).catch(error=>res.send(erorr.message));
    }



}
class renderMovies{
    constructor(data){
        this.original_title=data.original_title;
        this.vote_count=data.vote_count;
        if(data.poster_path){
    
            this.poster_path='https://image.tmdb.org/t/p/original/'+data.poster_path;
        }
    }
    }

    module.exports=movie;