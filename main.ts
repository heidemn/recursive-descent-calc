#!/usr/bin/env -S npx ts-node

// Simple calculator, based on the recursive descent parser from Wikipedia:
// https://en.wikipedia.org/wiki/Recursive_descent_parser#C_implementation

const input = process.argv[2] || '42 + 43';
let index = 0;

type SymType = 'number' | 'plus' | 'minus' | 'mul' | 'div' | 'lparen' | 'rparen' | 'EOF';
interface Sym {
    type: SymType;
    value?: number | undefined;
}
let prevSym: Sym;
let sym: Sym;

function nextSym() {
    prevSym = sym;
    let c: string;
    do {
        c = input[index++];
    } while (c === ' ');

    if (c === undefined) {
        sym = {type: 'EOF'};
    } else if (c === '+') {
        sym = {type: 'plus'};
    } else if (c === '-') {
        sym = {type: 'minus'};
    } else if (c === '*') {
        sym = {type: 'mul'};
    } else if (c === '/') {
        sym = {type: 'div'};
    } else if (c === '(') {
        sym = {type: 'lparen'};
    } else if (c === ')') {
        sym = {type: 'rparen'};
    } else if (c >= '0' && c <= '9') {
        const start = index - 1;
        while (index < input.length && input[index] >= '0' && input[index] <= '9') {
            index++;
        }
        const num = input.substring(start, index);
        sym = {type: 'number', value: parseInt(num)};
    } else {
        throw new Error('Unknown char: ' + c);
    }
}

function accept(st: SymType): boolean {
    if (sym.type == st) {
        nextSym();
        return true;
    }
    return false;
}

function expect(st: SymType) {
    if (accept(st)) {
        return true;
    }
    throw new Error("expect: unexpected symbol " + st);
}

function factor(): number {
    if (accept('number')) {
        return prevSym.value!;
    } else if (accept('lparen')) {
        const v = expression();
        expect('rparen');
        return v;
    } else {
        throw new Error("factor: syntax error: " + sym.type);
    }
}

function term(): number {
    let v = factor();
    while (sym.type == 'mul' || sym.type == 'div') {
        nextSym();
        if (prevSym.type === 'mul') {
            v *= term();
        } else {
            v /= term();
        }
    }
    return v;
}

function expression(): number {
    let sign = 1;
    if (sym.type == 'plus' || sym.type == 'minus') {
        sign = prevSym.type === 'minus' ? (-1) : 1;
        nextSym();
    }
    let v = sign * term();

    while (sym.type == 'plus' || sym.type == 'minus') {
        nextSym();
        if (prevSym.type === 'plus') {
            v += term();
        } else {
            v -= term();
        }
    }
    return v;
}

nextSym();
console.log(input + ' = ' + expression());
