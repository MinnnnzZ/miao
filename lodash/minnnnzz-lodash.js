var minnnnzz = {


    compact: function (array, size) {
        var result = []
        for (var i of array) {
            if (i) {
                result.push(i)
            }
        }
        return result
    }

    
    chunk: function (array, size) {
        var result = []
        for (var i = 0; i < array.length; i += size){
            result.push(array.slice(i, i + size))
        }
    }

    
}