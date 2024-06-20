# Timer18angSpace

## todo
- ng-templates for storing part of image depends on data from input-range
- auth with realworld api 
- localstorage for saving data about time
- maybe json-placeholder {[id]:{complete:{time, count}, successful: {time, count}}} or firebase (will be from(promise))
- maybe table with showing data about all sessions
- maybe user can shoose  

## questions
- not component but simple template?
- make own pipe that shows min:sec from sec (+)
- service or main component? how to trigger func to render success when timer is 0 (why do  we need context if we can just pass output/input or just {{variable}} inside ng-template)
- changeDet.strategy works for all children by default. is it costy for component that really don't need it (rerender for ex. every second)?
  
## mentor
- check the types in app/comonents/main:  
    * `createEmbeddedView<SettingsComponent | TimerComponent | SuccessComponent>` 
    * `EmbeddedViewRef<SettingsComponent | TimerComponent | SuccessComponent>`