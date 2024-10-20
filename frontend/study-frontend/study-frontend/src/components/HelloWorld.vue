<template>
  <div>
    <h1>Your Tasks</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }} - Completed: {{ task.completed }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: []
    };
  },
  mounted() {
    axios.get('http://127.0.0.1:5000/api/tasks')
      .then(response => {
        this.tasks = response.data;
      });
  }
};
</script>
