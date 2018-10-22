import { handleStatus } from '../utils/promise-helpers.js' ;
import { partialize } from '../utils/operators.js' ;

const API = 'http://localhost:3000/notas' ;

const getItemsFromNotas = notas => notas.$flatMap(nota => nota.itens);
const filterItemsByCode = (code, items) => items.filter(item => item.codigo === code);
const sumItemsValue = items => items.reduce((total, item) => total + item.valor, 0 );

export const notasService = {
    listAll() {
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
        // utilizando partialize!
        const filterItems = partialize(filterItemsByCode, code);
        // função compose ainda não foi implementada 
        const sumItems = compose( sumItemsValue, filterItems, getItemsFromNotas);
        return this
            .listAll()
            .then(sumItems);
        //return this.listAll().then(sumItems(code));
    }
};