function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    if(typeof(expr) === 'string'){
      expr = expr.replace(/\s/g, '');
      expr = expr.split('');

      for(let i=0; i<expr.length; i++){
          if(isNaN(expr[i])){
            expr[i] = ' ' + expr [i] + ' ';
          }
      }

      expr = expr.join('');
      expr = expr.split(' ');
      for(let i=0; i<expr.length; i++){
        if(expr[i] === ''){
          expr.splice(i, 1);
        }
      }
    }

    let right = 0;
    let left = 0;
    let res;

    for(let i=0; i<expr.length; i++){
        if(expr[i] === '(')
            left++;
        if(expr[i] === ')')
            right++;
    }

    if(right != left){
        throw "ExpressionError: Brackets must be paired";
    }

    if(expr.indexOf('(') === -1){
        let result;
        let mult, div, sub, add;
        while(expr.length != 1){
            mult = expr.indexOf('*');
            div = expr.indexOf('/');
            sub = expr.indexOf('-');
            add = expr.indexOf('+');

            if(sub != -1 && add === -1){
                add = Infinity;
            }

            if(add != -1 && sub ===-1){
                sub = Infinity;
            }

            if(div != -1){
                result = Number(expr[div-1]) / Number(expr[div+1]);
                if(result === Infinity)
                    throw "TypeError: Division by zero.";
                expr[div+1] = result;
                expr.splice(div-1, 2);
            } else if(mult != -1){
                result = Number(expr[mult-1]) * Number(expr[mult+1]);
                expr[mult+1] = result;
                expr.splice(mult-1, 2);
            } else if(add != -1 && add < sub){
                result = Number(expr[add-1]) + Number(expr[add+1]);
                expr[add+1] = result;
                expr.splice(add-1, 2);
            } else if(sub != -1 && sub < add){
                result = Number(expr[sub-1]) - Number(expr[sub+1]);
                expr[sub+1] = result;
                expr.splice(sub-1, 2);
            }
        }

        result = Number(expr[0]);
        return result;
    }

//4*(5-(3-1)/(4-1)*2)

    while(expr.length > 1){
        if(expr.indexOf(')') != -1){
          right = expr.indexOf(')');
          for(let i=right; i>=0; i--){
              if(expr[i] === '('){
                  left = i;
                  break;
              }
          }
          res = expressionCalculator(expr.slice(left+1, right)).toString();
          expr[right] = res;
          expr.splice(left, right-left);
        } else {
            return expressionCalculator(expr);
        }
    }
    return Number(expr[0]);

}

module.exports = {
    expressionCalculator
}
