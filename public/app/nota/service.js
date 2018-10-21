import { handleStatus } from '../utils/promise-helpers.js' ;

const API = 'http://localhost:3000/notas' ;

const sumItems = code => notas => notas
    .$flatMap(nota => nota.itens)
    .filter(item => item.codigo == code )
    .reduce((total, item) => total + item.valor, 0 );

export const notasService = { listAll() {
    return fetch(API) 
    // lida com o status da requisição 
    .then(handleStatus)
    .catch(err => { 
        // o serviço agora é o responsável em logar o erro 
        console.log(err); 
        // retorna uma mensagem amigável 
        return Promise.reject( 'Não foi possível obter as notas fiscais' ); 
        }); 
    },
    // novo método
    sumItems(code) {
        return this.listAll().then(sumItems(code));
    }
};