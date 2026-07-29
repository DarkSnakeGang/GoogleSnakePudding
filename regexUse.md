for variables in regex, use this structure to protect against future updates to the game's code where the variable names can change: 
```code
[a-zA-Z0-9_$]{1,8}
```

for any instance of keywords let, var, or const, make sure to use this structure to protect against future updates to the game where the defining keyword can change:
```code
(?:let|const|var)
```

