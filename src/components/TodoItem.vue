<template>
  <div class="todo-item">
    <div class="content-left">
          <input type="checkbox" v-model="completed">
          <div v-if="!editing" @dblclick="editTodo" :class="{ completed : completed}" class="space">
            {{title }}
          </div>
          <input v-else type="text" class="form-control" v-focus v-model="title"
          @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit">
        </div>

        <div class="remove-item" @click="removeTodo(index)">
          &times;
        </div>
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
  methods: {
    removeTodo(index){
      this.$emit('removed',index)
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

       this.$emit('finishedEdit',{
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
  },
}
</script>
