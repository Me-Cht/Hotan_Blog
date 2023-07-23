<template>
  <div id="todolist">
    测试
    <todo-form></todo-form>
    <todo-table></todo-table>
  </div>
</template>

<script>
export default {
  name: "todolist",
  data() {
    return {
      todolist: []
    };
  },
  components: {
    'todo-form': {
      template: `
        <div class="todo-form">
          <input type="text" placeholder="输入代办事项" v-model="inputText">
          <button @click="addItem">新增</button>
          <button @click="deleteItems">多选删除</button>
        </div>
      `,
      data() {
        return {
          inputText: '123456'
        };
      },
      methods: {
        addItem() {
          // 添加代办事项的逻辑
        },
        deleteItems() {
          // 多选删除的逻辑
        }
      }
    },
    'todo-table': {
      template: `
        <table class="todo-table">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox">
              </td>
              <td>完成前端课程</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      `,
      data() {
        return {
          allChecked: false
        };
      }
    }
  }
};
</script>

<style scoped>
/* 样式 */
</style>
