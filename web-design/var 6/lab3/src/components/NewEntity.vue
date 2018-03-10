<template>
 <div class="entity-wrapper">
    <div class="control-block" @click="changeMode" v-if="!createMode">
      <div class="icon">
        <i class="fas fa-plus-circle fa-2x"></i>
      </div>
    </div>
    <div v-else class="input-block">
      <input type="text" v-model="entityText">
      <button @click="save">save</button>
      <button @click="close">close</button>
    </div>
 </div>
</template>

<script>
export default {
  name: "NewEntity",
  data() {
    return {
      entityText: "",
      createMode: false
    };
  },
  methods: {
    save() {
      if (this.entityText) {
        this.$emit("saveEntity", this.entityText);
        this.entityText = "";
        this.createMode = false;
      }
    },
    changeMode() {
      this.createMode = true;
    },
    close() {
      this.createMode = false;
    }
  }
};
</script>

<style scoped>
  .control-block {
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: green;
    transition: 2s;
  }

  .control-block > .icon:hover {
    transition: 2s;
    transform: rotate(360deg);
  }

  .input-block {
    padding: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .input-block > input {
    width: 70%;
    font-family: courier, monospace;
    height: 20px;
    outline: none;
    border-radius: 5px;
    border: transparent;
  }

  button {
    font-family: courier, monospace;
    border: none;
    background-color: white;
    height: 100%;
  }
</style>
