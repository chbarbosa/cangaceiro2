import { handleStatus, log } from './utils/promise-helpers.js' ;
import './utils/array-helpers.js' ;
// importa dando um apelido para o artefato importado
import { notasService as service } from './nota/service.js' ;
import { takeUntil, debounceTime } from './utils/operators.js' ;

const action = debounceTime( 500 , takeUntil( 3 , () => 
    service .sumItems( '2143' ) .then(log) .catch(log) 
    ));

document .querySelector( '#myButton' ) .onclick = action;