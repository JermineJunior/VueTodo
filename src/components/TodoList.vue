<template>
    <div>
      <input type="text" class="form-control" placeholder="what needs to be done" v-model="newTodo" @keyup.enter="addTodo">
      
        <div v-for="(todo , index) in todosFiltered" :key="todo.id" class="todo-item">
          <div class="content-left">
            <input type="checkbox" v-if="!todo.editing" v-model="todo.completed">
            <div v-if="!todo.editing" @dblclick="editTodo(todo)" :class="{ completed : todo.completed}" class="space">
              {{ todo.title }}  
            </div>
            <input type="text" v-else class="form-control" v-focus v-model="todo.title"
             @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">   
          </div>

          <div class="remove-item" @click="removeTodo(index)">
            &times;
          </div>
        </div> 

        <div class="extra-container">
          <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">Check All</label></div>
          <dir class="badge badge-pill badge-dark">{{ remaining }} items left</dir>
        </div>

        <div class="extra-container">
          <div>
            <button class="btn" :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
            <button class="btn" :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
            <button class="btn" :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
          </div>

          <button class="btn badge badge-pill badge-danger" v-if="showClearCompleted" @click="clearCompleted">
            Clear Completed
          </button>

        </div>
        

    </div>
</template>

<script>
export default {
  name: 'todo-list',
  data () {
    return {
      newTodo: '',
      beforeEditCache: '',
      idForTodod: 3,
      filter: 'all',
      todos: [
        {
          'id': 1,
          'title': 'Laravel',
          'completed': false,
          'editing': false
        },
         {
          'id': 2,
          'title': 'Bootstrap',
          'completed': false,
          'editing': false
        },
         {
          'id': 3,
          'title': 'Vue',
          'completed': false,
          'editing': false
        }
      ]
    }
  },

  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining() {
      return this.remaining != 0
    },
    todosFiltered() {
      if(this.filter == 'all') 
      {
        return this.todos
      }
      else if(this.filter == 'active')
      {
        return this.todos.filter(todo => !todo.completed)
      }
      else if(this.filter == 'completed')
      {
        return this.todos.filter(todo => todo.completed)
      }
      else return this.todos
    },
    showClearCompleted() {
      return this.todos.filter(todo => todo.completed).length > 0
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
    addTodo() {
      if(this.newTodo.trim().length == 0) {
        return 
      }

      this.todos.push({
        id: this.idForTodod,
        title: this.newTodo,
        completed: false,
        editing: false

      })

      this.newTodo = '',
      this.idForTodod++
    },

    editTodo(todo) {
      this.beforeEditCache = todo.title
      todo.editing = true
    },

    doneEdit(todo) {
      if(todo.title.trim() == '') {
        todo.title = this.beforeEditCache
      }

      // beforeEditCache = todo.title
      todo.editing = false
    },

    cancelEdit(todo) {
      todo.title = this.beforeEditCache
      todo.editing = false
    },

    removeTodo(index) {
      this.todos.splice(index , 1)
    },

    checkAllTodos() {
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },

    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.form-control {
  margin-bottom: 15px;
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.content-left {
  display: flex;
  align-items: center;
}
.space {
  margin-left: 15px;
}

.completed {
  text-decoration: line-through;
  color: gray;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 8px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover {
    background-color: lightgray;
  }

  &:focus {
    outline: none;
  }
}

.active {
  background-color: rgb(9, 209, 133); 
}

</style>
