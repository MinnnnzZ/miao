class Vector{
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    plus(vector) {
        var x = this.x + vector.x
        var y = this.y + vector.y
        return new Vector(x, y)
    }
    minus(vector) {
        var x = this.x - vector.x
        var y = this.y - vector.y
        return new Vector(x, y)
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}


class Complex{
    constructor(real, imag) {
        this.real = real
        this.imag = imag
    }
    

}