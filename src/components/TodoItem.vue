<template>
  <div class="todo-item">
    <div class="content-left">
          <input type="checkbox" v-model="completed" @change="doneEdit">
          <div v-if="!editing" @dblclick="editTodo" :class="{ completed : completed}" class="space">
            {{title }}
          </div>
          <input v-else type="text" class="form-control" v-focus v-model="title"
          @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit">
        </div>
        <div>
          <button @click="pluralize" class="btn btn-light" >Plural</button>
          <span class="remove-item" @click="removeTodo(index)">
            &times;
          </span>
        </div>
     </div>
</template>
<script>
export default {
  name: 'todo-item',
  props:{
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    checkAll:{
      type:Boolean,
      required:true,
    }
  },
  data() {
    return {
      'id':this.todo.id,
      'title':this.todo.title,
      'completed': this.todo.completed,
      'editing': this.todo.editing,
      'beforeEditCache':''
    }
  },
  created() {
     eventBus.$on('pluralize',this.handlePluralize)
  },
  beforeDestroy() {
     eventBus.$off('pluralize',this.handlePluralize)
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },
  directives: {
  focus: {
    // directive definition
    inserted: function (el) {
      el.focus()
    }
  }
},
  methods: {
    removeTodo(index){
      eventBus.$emit('removed',index)
    },

    editTodo() {
      this.beforeEditCache = this.title
      this.editing = true
    },

    doneEdit() {
      if(this.title.trim() == '') {
        this.title = this.beforeEditCache
      }

      // beforeEditCache = todo.title
      this.editing = false

       eventBus.$emit('finishedEdit',{
         'index':this.index,
         'todo':{
            'id':this.id,
            'title':this.title,
            'completed': this.completed,
            'editing': this.editing,
         }
       })
    },

    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
    pluralize(){
      eventBus.$emit('pluralize')
    },
    handlePluralize(){
    this.title = this.title + 's'

      eventBus.$emit('finishedEdit',{
          'index':this.index,
          'todo':{
              'id':this.id,
              'title':this.title,
              'completed': this.completed,
              'editing': this.editing,
          }
        })
    },
  },

}
</script>
