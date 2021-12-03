<template>
	<div class="tab-wrapper">
		<div class="flex justify-around">
			<span @click='tabName = "MaleTab"'>Male</span>
			<span @click='tabName = "FemaleTab"'>Female</span>
			<span @click='tabName = "KidsTab"'>Kids</span>
		</div>
		<keep-alive>
			<component :is="tabName" class="tab-area" />
		</keep-alive>
	</div>
</template>

<script>
import MaleTab from './MaleTab';
import FemaleTab from './FemaleTab';
import KidsTab from './KidsTab';

import { ref } from 'vue';

export default {
  name: 'Tabs',
  components: {
    MaleTab,
    FemaleTab,
    KidsTab
  },
  setup() {
    const tabName = ref('MaleTab');

    return {
      tabName
    };
  }
};
</script>
