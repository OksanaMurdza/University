<template>
  <div id="messages-block" v-if="items.length > 0">
    <ul class="list">
      <li v-for="(item, index) in items" :key="index">
        <h6 @click="deleteItem(item.id)">x</h6>
        time: <strong>{{item.createTime}}</strong>
        <br>
        text: <strong>{{item.text}}</strong>
      </li>
      <NewEntity @saveEntity="addNewMessage"/>
    </ul>
  </div>
</template>

<script>
import NewEntity from "../components/NewEntity";

export default {
  name: "MessageBlock",
  props: {
    messages: {
      type: Array
    }
  },
  components: {
    NewEntity
  },
  data() {
    return {
      items: ""
    };
  },
  watch: {
    messages: {
      handler() {
        this.items = this.messages;
      }
    }
  },
  methods: {
    deleteItem(id) {
      this.$emit("delete", id);
    },
    addNewMessage(msg) {
      this.$emit("addNew", msg);
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #messages-block {
    margin-left: 20px;
    padding-top: 20px;
  }

   .list {
  color: #555;
  font-size: 22px;
  padding: 0 !important;
  width: 500px;
  font-family: courier, monospace;
  border: 1px solid #dedede;
  margin: 0;
  cursor: pointer;
}

.list h6 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 15px;
  /* text-align: right; */
  float: right;
  transition: 0.2s;
}

.list h6:hover {
  color: red;
  transition: .2s;
}

.list li {
  list-style: none;
  border-bottom: 1px dotted #ccc;
  text-indent: 25px;
  height: auto;
  padding: 10px;
  text-transform: capitalize;
}
.list li:hover {
  background-color: #f0f0f0;
  -webkit-transition: all 0.2s;
  -moz-transition:    all 0.2s;
  -ms-transition:     all 0.2s;
  -o-transition:      all 0.2s;
}
.lines {
  border-left: 1px solid #ffaa9f;
  border-right: 1px solid #ffaa9f;
  width: 2px;
  float: left;
  /* height: 495px; */
  margin-left: 40px;
}
</style>
