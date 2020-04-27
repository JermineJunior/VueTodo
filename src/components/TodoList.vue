 <template>
    <div>
      <input type="text" class="form-control" placeholder="what needs to be done" v-model="newTodo" @keyup.enter="addTodo">
        <todo-item
        v-for="(todo , index) in todosFiltered" :key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining" >
        </todo-item>
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
          <transition name="fade">
            <button class="btn badge badge-pill badge-danger" v-if="showClearCompleted" @click="clearCompleted">
                Clear Completed
              </button>
          </transition>
        </div>
    </div>
</template>

<script>
import TodoItem from './TodoItem'
import axios from 'axios'

axios.defaults.baseURL= 'http://localhost:8000/api';
export default {

  name: 'todo-list',
  components: {TodoItem},
  data () {
    return {
      newTodo: '',
      beforeEditCache: '',
      idForTodo: 3,
      filter: 'all',
      todos: []
    }
  },
  created() {
    eventBus.$on('removedTodo',(index) => this.removeTodo(index))
    eventBus.$on('finishedEdit',(data) => this.finishedEdit(data))
    this.fetch();
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
  methods: {
    fetch(){
       axios.get('/todos')
            .then(response => {
              this.todos = response.data;
            })
            .catch(error => {
              console.log(error);
            })
    },
    addTodo() {
      if(this.newTodo.trim().length == 0) {
        return
      }
        axios.post('/todos', {
            id: this.idForTodo,
            title: this.newTodo,
            completed: false,
            editing: false
          })
          .then(function (response) {
                this.newTodo = '',
                this.idForTodo++
          })
          .catch(function (error) {
          })
           this.fetch()

    },
    finishedEdit(data){
        this.todos.splice(data.index , 1 , data.todo)
    },

    removeTodo(index) {
      this.todos.splice(index , 1)
    },

    checkAllTodos() {
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },

    clearCompleted() {
      /** test */
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

//CSS TRANSITION
.fade-enter-active , .fade-leave-active {
  transition: opcity .2s;
}

.fade-enter , .fade-leave-to {
  opcity: 0;
}

</style>
