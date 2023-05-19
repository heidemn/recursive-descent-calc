# Recursive Descent Calculator

Simple calculator, based on the recursive descent parser from Wikipedia:  
https://en.wikipedia.org/wiki/Recursive_descent_parser#C_implementation

## Install

```bash
npm i
```

## Run

```bash
./main.ts 
# 42 + 43 = 85

./main.ts '-2+(-5*2)'
# -2+(-5*2) = -12

./main.ts '-2+(-5*(+1+1))'
# -2+(-5*(+1+1)) = -12

./main.ts '4*3^2'
# 4*3^2 = 36

./main.ts '(4*3)^2'
# (4*3)^2 = 144

./main.ts '4^3^2'
# 4^3^2 = 262144
```
