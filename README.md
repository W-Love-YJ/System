# vue3.0-elementPlus-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 主题使用方式
```js
//  字体颜色
@include font_color("font_color1");
//  边框颜色
@include border_color("border_color1");
//  背景颜色
@include background_color("background_color1");
//  背景颜色
@include background_image("background_image");
// 例子：
.class{
    @include font_color("font_color1");
}
```