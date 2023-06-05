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



}