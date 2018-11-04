import { log, timeoutPromise} from './utils/promise-helpers.js' ;
import './utils/array-helpers.js' ;
// importa dando um apelido para o artefato importado
import { notasService as service } from './nota/service.js' ;
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js' ;

const operations = pipe( partialize(takeUntil, 3 ), partialize(debounceTime, 500 ) );

// usando timeoutPromise
const action = operations(
    () => timeoutPromise( 200 , service.sumItems( '2143' )) .then(log) .catch(log) );

document .querySelector( '#myButton' ) .onclick = action;