<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>vue生命周期学习</title>
        <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
    </head>

    <body>
        <div id="app">
            <input v-model="message"></input>
            <h1>{{message1}}</h1>
        </div>
    </body>
    <script>
        var vm = new Vue({/*创建vue对象*/
            el: '#app',/****挂载目标****/
            data: {/****数据对象****/
                message: 'Hello World!'
            },
            computed:{/****实现某一属性的实时计算****/
                message1:function(){
                    return this.message.split("").reverse().join("");
                }
            },
            watched:{/****检测某一属性值的变化****/

            },
            methods:{/****组件内部的方法****/

            },

            beforeCreate: function() {
                console.group('------beforeCreate创建前状态------');
                console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
                console.log("%c%s", "color:red", "data   : " + this.$data); //undefined 
                console.log("%c%s", "color:red", "message: " + this.message)//undefined
            },
            /**
             * 1.在beforeCreate和created钩子之间，程序开始监控Data对象数据的变化及vue内部的初始化事件
             * 
             * */
            created: function() {
                console.group('------created创建完毕状态------');
                console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
                console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化 
                console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
            },
            /**
             * 2.在created和beforeMount之间，判断是否有el选项，若有则继续编译，无，则暂停生命周期；
             * 然后程序会判断是否有templete参数选项，若有，则将其作为模板编译成render函数。若无，则将外部html作为模板编译（template优先级比外部html高）
             * 
             * */
            beforeMount: function() {
                console.group('------beforeMount挂载前状态------');
                console.log("%c%s", "color:red", "el     : " + (this.$el)); //已被初始化
                console.log(this.$el);
                console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化  
                console.log("%c%s", "color:red", "message: " + this.message); //已被初始化  
            },
            /**
             * 3.在beforeMount和mounted之间，程序将上一步编辑好的html内容替换el属性指向的dom对象或者选择权对应的html标签里面的内容
             * 
             * */
            mounted: function() {
                console.group('------mounted 挂载结束状态------');
                console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
                console.log(this.$el);
                console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
                console.log("%c%s", "color:red", "message: " + this.message); //已被初始化 
            },
            /**
             * 4.mounted和beforeUpdate之间，程序实时监控数据变化
             * 
             * */
            beforeUpdate: function() {
                console.group('beforeUpdate 更新前状态===============》');
                console.log("%c%s", "color:red", "el     : " + this.$el);
                console.log(this.$el);
                console.log("%c%s", "color:red", "data   : " + this.$data);
                console.log("%c%s", "color:red", "message: " + this.message);
            },
            /**
             * 5.beforeUpdate和updated之间，实时更新dom
             * 
             * */
            updated: function() {
                console.group('updated 更新完成状态===============》');
                console.log("%c%s", "color:red", "el     : " + this.$el);
                console.log(this.$el);
                console.log("%c%s", "color:red", "data   : " + this.$data);
                console.log("%c%s", "color:red", "message: " + this.message);
            },
            beforeDestroy: function() {
                console.group('beforeDestroy 销毁前状态===============》');
                console.log("%c%s", "color:red", "el     : " + this.$el);
                console.log(this.$el);
                console.log("%c%s", "color:red", "data   : " + this.$data);
                console.log("%c%s", "color:red", "message: " + this.message);
            },
            /**
             * 6.实例销毁
             * 
             * */
            destroyed: function() {
                console.group('destroyed 销毁完成状态===============》');
                console.log("%c%s", "color:red", "el     : " + this.$el);
                console.log(this.$el);
                console.log("%c%s", "color:red", "data   : " + this.$data);
                console.log("%c%s", "color:red", "message: " + this.message)
            }
        })
    </script>

</html>