import { log, timeoutPromise, retry} from './utils/promise-helpers.js' ;
import './utils/array-helpers.js' ;
// importa dando um apelido para o artefato importado
import { notasService as service } from './nota/service.js' ;
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js' ;

const operations = pipe( partialize(takeUntil, 3 ), partialize(debounceTime, 500 ) );

// utilizando retry 
const action = operations(() =>
    retry( 3 , 3000 , () =>
    timeoutPromise( 200 , service.sumItems( '2143' )))
    .then(soma => {
        console .log(soma);
        // um interessado 
        alert(soma); 
        // outro interessado 
    })
    .catch(log) );

document .querySelector( '#myButton' ) .onclick = action;