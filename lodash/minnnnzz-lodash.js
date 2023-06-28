var minnnnzz = {


    chunk: function (array, size) {
        var result = []
        for (var i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size))
        }
        return result
    },


    compact: function (array) {
        var result = []
        for (var i of array) {
            if (i) {
                result.push(i)
            }
        }
        return result
    },
    
    fill: function (array, value, start = 0, end = array.length){
        for (var i = start; i < end; i++){
            array[i] = value
        }
        return array
    },

    drop: function (array, n = 1) {
        return array.slice(n)
    },

    findIndex : function(array,predicate,fromIndex = 0){
        for(;fromIndex<array.length;fromIndex++){
          if(typeof predicate == 'function'){
            for(var key in array[fromIndex]){
              if(predicate(array[fromIndex])){
                return fromIndex
              }
            }
          }
          if(typeof predicate == 'object'){
            if(Array.isArray(predicate)){
              for(var key in array[fromIndex]){
                if(key == predicate[0] && array[fromIndex][key] == predicate[1]){
                  return fromIndex
                }
              }
            }else{
              var a = true
              for(var key in array[fromIndex]){
    
                if(array[fromIndex][key] !== predicate[key]){
                  a = false
                }
              }
              if(a == true){
                return fromIndex
              }
            }
          }
          if(typeof predicate == 'string'){
              if(predicate in array[fromIndex] && array[fromIndex][predicate] == true){
                return fromIndex
              }
            }
    
        }
        return -1
    },
    
      findLastIndex :function(array, predicate = this.identity(predicate), fromIndex=array.length-1){
        var c = 0
        var j = fromIndex
        for(;fromIndex >=0;fromIndex--){
          if(typeof predicate == 'function'){
            for(var key in array[fromIndex]){
              if(predicate(array[fromIndex])){
                return j - c
              }
            }
          }
          if(typeof predicate == 'object'){
            if(Array.isArray(predicate)){
              for(var key in array[fromIndex]){
                if(key == predicate[0] && array[fromIndex][key] == predicate[1]){
                  return j - c
                }
              }
            }else{
              var a = true
              for(var key in array[fromIndex]){
    
                if(array[fromIndex][key] !== predicate[key]){
                  a = false
                }
              }
              if(a == true){
                return j - c
              }
            }
          }
          if(typeof predicate == 'string'){
              if(predicate in array[fromIndex] && array[fromIndex][predicate] == true){
                return j - c
              }
            }
            c++
        }
        return -1
      },
    






}  