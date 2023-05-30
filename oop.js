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
    
    plus(c) {
        var real = this.real + c.real
        var imag = this.imag + c.imag
        return new Complex(real, imag)
    }
    static plus(a, b) {
        var real = a.real + b.real
        var imag = a.imag + b.imag
        return new Complex(real, imag)
    }
    minus(c) {
        var real = this.real - c.real
        var imag = this.imag - c.imag
        return new Complex(real, imag)
    }
    static minus(a, b) {
        var real = a.real - b.real
        var imag = a.imag - b.imag
        return new Complex(real, imag)
    }
    mul(c) {
        var real = this.real * c.real - this.imag * c.imag
        var imag = this.real * c.imag + this.imag * c.real
        return new Complex(real, imag)
    }
    static mul(a, b) {
        var real = a.real * b.real - a.imag * b.imag
        var imag = a.real * b.imag + b.imag * b.real
        return new Complex(real, imag)
    }
    div(c) {
        var helper = new Complex(c.real, -c.imag)
        var up = this.mul(helper)
        var down = c.mul(helper)
        var real = up.real / down.real
        var imag = up.imag / down.real
        return new Complex(real, imag)
    }
    static div(a, b) {
        var helper = new Complex(b.real, -b.imag)
        var up = a.mul(helper)
        var down = b.mul(helper)
        var real = up.real / down.real
        var imag = up.imag / down.real
        return new Complex(real, imag)
    }
}


class Queue {
    constructor() {
        this.vals = []
    }
    add(val) {
        this.vals.push(val)
    }
    pop() {
        return this.vals.shift()
    }
    get size() {
        return this.vals.length
    }
}


class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }
    append(val) {
        var node = {
            val: val,
            next: null
        }
        if (this.head == null) {
            this.head = this.tail = node
            return
        } else {
            this.tail.next = node
            this.tail = node
            return
        }
    }
    prepend(val) {
        var node = {
            val: val,
            next: null
        }
        if (this.head == null) {
            this.head = this.tail = node
            return
        } else {
            node.next = this.head
            this.head = node
            return
        }
    }
    at(idx) {
        if (this.head === this.tail === null) return null
        var p = this.head
        var count = 0
        while (count < idx) {
            p = p.next
            count++
        }
        return p.val
    }
    get size() {
        var p = this.head
        var l = 0
        while (p) {
            l++
            p = p.next
        }
        return l
    }
}

