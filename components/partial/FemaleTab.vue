<template>
	<div>
		<h2>Female</h2>
	</div>
</template>

<script>
import { onActivated } from 'vue';

export default {
  name: 'FemaleTab',
  setup() {
    onActivated(() => {
      console.log('Female Tab');
    });
  }
};
</script>
