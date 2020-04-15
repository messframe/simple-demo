@echo off
start cmd /k "cd center&&npm run dev"
start cmd /k "cd center&&cd common-deps-static&&hs -p 8200 --cors"
start cmd /k "cd routeControl&&npm run dev"
start cmd /k "cd common_modules&&cd moduleA&&npm run dev"
start cmd /k "cd common_modules&&cd moduleB&&npm run dev"
start cmd /k "cd common_modules&&cd moduleC&&npm run dev"
