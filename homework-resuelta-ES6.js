var traverseDomAndCollectElements = function(matchFunc, startEl = document.body) {
  var resultSet = []; //[body]  [body, img]

  // if (typeof startEl === "undefined") {
  //   startEl = document.body;
  // }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl)
  for (let i = 0; i < startEl.children.length; i++) {
    let child = startEl.children[i]
    let result = traverseDomAndCollectElements(matchFunc, child)
    resultSet = [...resultSet, ...result];
  }
  return resultSet;
};
//startEl.children.length
 // img.children --> [].length   0


//  DOM 
//  / | 
// HEAD  BODY.children  [div, div,  p]
//       / |   |                    i
//     div div  p
//    / |
//    a img  


// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) { // . u n o   div.danger  [div, danger]
  // tu código aquí
  if(selector[0] === '#') return 'id';
  if(selector[0] === '.') return 'class';
  if(selector.split('.').length === 2) return 'tag.class';

  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
   matchFunction = function(el) {
    return '#' + el.id === selector; 
   }
  } else if (selectorType === "class") {
    matchFunction = function(el) {
      if(el.classList.length > 1) {
        for (let i = 0; i < el.classList.length; i++) {
          if('.' + el.classList[i] === selector) {
            return true;
          }
        }
      }  
      return '.' + el.classList[0] === selector ? true : false;
    }
  } else if (selectorType === "tag.class") {  //div.danger
    matchFunction = function(el) {
      let arr = selector.split('.'); //[div, danger]
      if(el.tagName.toLowerCase() === arr[0]) {
        if(el.classList.length > 1) {
          for (let i = 0; i < el.classList.length; i++) {
            if(el.classList[i] === arr[1]) return true;
          }
        }
        if(el.className === arr[1]) return true;
      }
      return false;
    }
  } else if (selectorType === "tag") {
    matchFunction = function(el) {
      return el.tagName === selector.toUpperCase();  
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

  
// $('danger') --> []
// .querySelectorAll('danger')




