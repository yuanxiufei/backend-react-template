## React 入门到进阶

#### Vue 和 React 框架对比

| **Vue**                                     | **React**                            |
| ------------------------------------------- | ------------------------------------ |
| MV\*框架                                    | MV\*框架                             |
| 虚拟 DOM（但 diff 算法不同）                | 虚拟 DOM（但 diff 算法不同）         |
| 专注于视图层                                | 专注于视图层                         |
| 尤雨溪开发（1.0、2.0、3.0）                 | Facebook 开发（15、16、17、18）      |
| @vue/cli、vite                              | create-react-app、vite               |
| 指令（v-if/v-for/v-on/v-model/v-bind）      | 没有指令（JSX 语法）                 |
| 框架自动优化性能                            | 手工优化（memo/useMemo/useCallback） |
| 表单（双向绑定）、组件（单向数据流）        | 单向数据流                           |
| SFC（Template/Script/Style）                | JSX（All In JS）                     |
| Vue-router/vuex/pina、element、element-plus | React-router/redux/mobox、antd       |

#### Vue 和 React diff 算法差异

**vue 中 diff 算法实现流程**

1. 在内存中构建虚拟 dom 树
2. 将内存中虚拟 dom 树渲染成真实 dom 结构
3. 数据改变的时候，将之前的虚拟 dom 树结合新的数据生成新的虚拟 dom 树
4. 将此次生成好的虚拟 dom 树和上一次的虚拟 dom 树进行一次比对（diff 算法进行比对），来更新只需要被替换的 DOM，而不是全部重绘。在 Diff 算法中，只平层的比较前后两棵 DOM 树的节点，没有进行深度的遍历。
5. 会将对比出来的差异进行重新渲染

**react 中 diff 算法实现流程**

1. DOM 结构发生改变-----直接卸载并重新 create
2. DOM 结构一样-----不会卸载,但是会 update 变化的内容
3. 所有同一层级的子节点.他们都可以通过 key 来区分-----同时遵循 1.2 两点  
   （其实这个 key 的存在与否只会影响 diff 算法的复杂度,换言之,你不加 key 的情况下,diff 算法就会以暴力的方式去根据一二的策略更新,但是你加了 key,diff 算法会引入一些另外的操作）

React 会逐个对节点进行更新，转换到目标节点。而最后插入新的节点，涉及到的 DOM 操作非常多。diff 总共就是移动、删除、增加三个操作，而如果给每个节点唯一的标识（key），那么 React 优先采用移动的方式，能够找到正确的位置去插入新的节点。

vue 会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。而对于 React 而言,每当应用的状态被改变时,全部组件都会重新渲染,所以 react 中会需要 shouldComponentUpdate 这个生命周期函数方法来进行控制。

#### Vue 和 React 生命周期

**vue**

【初始化阶段（4 个）】

（1）beforeCreate

此钩子函数不能获取到数据，dom 元素也没有渲染出来，此钩子函数不会用来做什么事情。

（2）created

此钩子函数，数据已经挂载了，但是 dom 节点还是没有渲染出来，在这个钩子函数里面，如果同步更改数据的话，不会影响运行中钩子函数的执行。可以用来发送 ajax 请求，也可以做一些初始化事件的相关操作。

（3）beforeMount

代表 dom 节点马上要被渲染出来了，但是还没有真正的渲染出来，此钩子函数跟 created 钩子函数基本一样，也可以做一些初始化数据的配置。

（4）mounted

是生命周期初始化阶段的最后一个钩子函数，数据已经挂载完毕了，真实 dom 也可以获取到了。

【运行中阶段（2 个）】

（5）beforeUpdate

运行中钩子函数 beforeUpdate 默认是不会执行的，当数据更改的时候，才会执行。数据更新的时候，先调用 beforeUpdate，然后数据更新引发视图渲染完成之后，再会执行 updated。运行时 beforeUpdate 这个钩子函数获取的数据还是更新之前的数据（获取的是更新前的 dom 内容），在这个钩子函数里面，千万不能对数据进行更改，会造成死循环。

（6）updated

这个钩子函数获取的数据是更新后的数据，生成新的虚拟 dom，跟上一次的虚拟 dom 结构进行比较，比较出来差异（diff 算法）后再渲染真实 dom，当数据引发 dom 重新渲染的时候，在 updated 钩子函数里面就可以获取最新的真实 dom 了。

【销毁阶段（2 个）】

（7）beforeDestroy

切换路由的时候，组件就会被销毁了，销毁之前执行 beforeDestroy。在这个钩子函数里面，我们可以做一些善后的操作，例如可以清空一下全局的定时器（created 钩子函数绑定的初始化阶段的事件）、清除事件绑定。

（8）destoryed

组件销毁后执行 destroyed，销毁后组件的双向数据绑定、事件监听 watcher 相关的都被移除掉了，但是组件的真实 dom 结构还是存在在页面中的。

添加 keep-alive 标签后会增加 active 和 deactive 这两个生命周期函数，初始化操作放在 actived 里面，一旦切换组件，因为组件没有被销毁，所以它不会执行销毁阶段的钩子函数，所以移除操作需要放在 deactived 里面，在里面进行一些善后操作，这个时候 created 钩子函数只会执行一次，销毁的钩子函数一直没有执行。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/21/16debf6f691f598a~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

**react**

【初始化阶段（5 个）】：

（1）getDefaultProps：实例化组件之后，组件的 getDefaultProps 钩子函数会执行

这个钩子函数的目的是为组件的实例挂载默认的属性

这个钩子函数只会执行一次，也就是说，只在第一次实例化的时候执行，创建出所有实例共享的默认属性，后面再实例化的时候，不会执行 getDefaultProps，直接使用已有的共享的默认属性

理论上来说，写成函数返回对象的方式，是为了防止实例共享，但是 react 专门为了让实例共享，只能让这个函数只执行一次

组件间共享默认属性会减少内存空间的浪费，而且也不需要担心某一个实例更改属性后其他的实例也会更改的问题，因为组件不能自己更改属性，而且默认属性的优先级低。

（2）getInitialState：为实例挂载初始状态，且每次实例化都会执行，也就是说，每一个组件实例都拥有自己独立的状态。

（3）componentWillMount：执行 componentWillMount，相当于 Vue 里的 created+beforeMount，这里是在渲染之前最后一次更改数据的机会，在这里更改的话是不会触发 render 的重新执行。

（4）render：渲染 dom

render()方法必须是一个纯函数，他不应该改变

state，也不能直接和浏览器进行交互，应该将事件放在其他生命周期函数中。 如果

shouldComponentUpdate()返回

false，

render()不会被调用。

（5）componentDidMount：相当于 Vue 里的 mounted,多用于操作真实 dom

【运行中阶段（5 个）】

当组件 mount 到页面中之后，就进入了运行中阶段，在这里有 5 个钩子函数，但是这 5 个函数只有在数据（属性、状态）发送改变的时候才会执行

（1）componentWillReceiveProps(nextProps,nextState)

当父组件给子组件传入的属性改变的时候，子组件的这个函数才会执行。初始化 props 时候不会主动执行

当执行的时候，函数接收的参数是子组件接收到的新参数，这个时候，新参数还没有同步到 this.props 上,多用于判断新属性和原有属性的变化后更改组件的状态。

（2）接下来就会执行 shouldComponentUpdate(nextProps,nextState),这个函数的作用：当属性或状态发生改变后控制组件是否要更新，提高性能,返回 true 就更新，否则不更新，默认返回 true。

接收 nextProp、nextState，根据根据新属性状态和原属性状态作出对比、判断后控制是否更新

如果

shouldComponentUpdate()返回

false，

componentWillUpdate,

render 和

componentDidUpdate 不会被调用。

（3）componentWillUpdate,在这里，组件马上就要重新 render 了，多做一些准备工作，千万千万，不要在这里修改状态，否则会死循环 相当于 Vue 中的 beforeUpdate

（4）render，重新渲染 dom

（5）componentDidUpdate，在这里，新的 dom 结构已经诞生了,相当于 Vue 里的 updated

【销毁阶段】

当组件被销毁之前的一刹那，会触发 componentWillUnmount，临死前的挣扎

相当于 Vue 里的 beforeDestroy，所以说一般会做一些善后的事情，例如使定时器无效，取消网络请求或清理在

componentDidMount 中创建的任何监听。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/21/16debf7c76553b3b~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)
