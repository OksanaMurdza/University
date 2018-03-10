<template>
<div id="app">
   <div id="wrapper">
      <div id="topic-block">
        <div class="lines" :style="{height: `${linesHeight}px`}"></div>
          <ul class="list">
            <li v-for="(item, index) in topics" :key="index" @click="changeTopic(item)">
              {{item}}
            </li>
          </ul>
          <NewEntity @saveEntity="addNewTopic"/>
      </div>
      <MessageBlock 
        :messages="takeMessageForTopic" 
        @delete="deleteMessage"
        @addNew="addMessage"
      />
   </div>
</div>
</template>

<script>
import MessageBlock from "./components/MessageBlock";
import NewEntity from "./components/NewEntity";

import { takeDiaryTopic, takeMessages } from "../api/";
import { hashCode } from "./createHash";

export default {
  name: "Diary",
  components: {
    MessageBlock,
    NewEntity
  },
  data() {
    return {
      topics: [],
      messages: [],
      currentTopic: ""
    };
  },
  methods: {
    changeTopic(topic) {
      this.currentTopic = topic;
    },
    deleteMessage(msg) {
      const { messages, currentTopic } = this;

      this.messages = messages.filter(
        ({ topic, id }) => !(topic === currentTopic && msg === id)
      );
    },
    addNewTopic(text) {
      this.topics.push(text);
    },
    addMessage(msg) {
      console.log(hashCode);
      const d = new Date();
      const hour = d.getHours();
      const min = d.getMinutes();
      const newMessage = {
        id: hashCode(msg),
        text: msg,
        createTime: `${hour}:${min}`,
        topic: this.currentTopic
      };
      this.messages.push(newMessage);
    }
  },
  computed: {
    takeMessageForTopic() {
      const { currentTopic, messages } = this;

      return messages.filter(({ topic }) => currentTopic === topic);
    },
    linesHeight() {
      // css для неудачников ;)
      return this.topics.length * 45.55;
    }
  },
  mounted() {
    takeDiaryTopic()
      .then(topics => (this.topics = topics))
      .catch(err => console.log(err));
    takeMessages()
      .then(messages => (this.messages = messages))
      .catch(err => console.log(err));
  }
};

</script>

<style>
  html,
  body {
    padding: 0;
    margin: 0;
    background-color: #5d97ac;
  }

</style>

<style scoped>
  #app {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
  }

  #wrapper {
    display: flex;
    flex-direction: row;
    width: 80%;
  }

  #topic-block {
    padding-top: 20px;
  }


  .list {
  color: white;
  font-size: 22px;
  padding: 0 !important;
  width: 500px;
  font-family: courier, monospace;
  border: 1px solid #dedede;
  margin: 0;
  cursor: pointer;
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
  /* border-left: 1px solid #ffaa9f; */
  /* border-right: 1px solid #ffaa9f; */
  border-left: 1px solid #de2e21;
  border-right: 1px solid #de2e21;    
  width: 2px;
  float: left;
  /* height: 495px; */
  margin-left: 40px;
}
</style>
