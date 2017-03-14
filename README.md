# @xunlei/vuex-action-debounce

Vuex action debounce 插件，可以让相同类型及参数的action在单位时间内只有一次，从而避免重复网络请求

## 用法

### 安装
```
npm install @xunlei/vuex-action-debounce -S
```

### 使用

```javascript
import vuexActionDebounce from @xunlei/vuex-action-debounce

const timeout = 0 // 请求完成后的缓存时间
const vuexActionDebouncePlugin = vuexActionDebounce(timeout)

const store = new Vuex.Store({
  state,
  mutations,
  plugins: [ vuexActionDebouncePlugin ]
})
```

## 注意
- action 需要返回promise


