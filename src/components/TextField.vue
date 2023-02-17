<template>
  <input
    class="textfield"
    :type="type"
    :placeholder="placeholder"
    :value="input"
    @input="$emit('update:input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
  },
  emits: ["update:input"],
};
</script>

<style scoped lang="scss">
.textfield {
  font-size: 1rem;
  font-weight: 400;
  line-height: inherit;
  width: 100%;
  height: auto;
  padding: 0.75rem 1.25rem;
  border: none;
  outline: none;
  border-radius: 2rem;
  color: #121212;
  background: #f1f5f9;
  ::placeholder {
    font-family: inherit;
  }
}
</style>
