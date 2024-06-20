# Timer18angSpace

## todo

- accelerate uploading of images
- auth with realworld api
- localstorage for saving time data in timer
- maybe json-placeholder {[id]:{complete:{time, count}, successful: {time, count}}} or firebase (will be from(promise))
- maybe table with showing data about all sessions
- maybe user can shoose

## questions

- not component but simple template?
- make own pipe that shows min:sec from sec (+)
- service or main component? how to trigger func to render success when timer is 0 (why do we need context if we can just pass output/input or just {{variable}} inside ng-template)
  v2
- when you need to delete refs
- whats the difference between inject(service) and constructor(private servise: Service)

## mentor

- check the types in app/comonents/main:
  - `createEmbeddedView<SettingsComponent | TimerComponent | SuccessComponent>`
  - `EmbeddedViewRef<SettingsComponent | TimerComponent | SuccessComponent>`
