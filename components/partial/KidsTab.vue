<template>
	<div>
		<h2>Kids</h2>
	</div>
</template>

<script>
import { onActivated } from 'vue';

export default {
  name: 'KidsTab',
  setup() {
    onActivated(() => {
      console.log('Female Tab');
    });
  }
};
</script>
