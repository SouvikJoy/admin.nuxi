<template>
	<div>
		<h2>Male</h2>
	</div>
</template>

<script>
import { onActivated } from 'vue';

export default {
  name: 'MaleTab',
  setup() {
    onActivated(() => {
      console.log('Male Tab Activated');
    });
  }
};
</script>
