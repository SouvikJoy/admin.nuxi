<template>
	<div>
		<div>{{ service?.name }}</div>
		<div>{{ service?.description }}</div>
		<ImageAssistant :image="service?.image" bucket="product-bucket"/>
		<router-link :to="`/services/${service.id}`" class="create-button">

			Edit

		</router-link>
	</div>
</template>

<script>
import {defineComponent} from 'vue';
import ImageAssistant from '../ImageAssistant';

export default defineComponent({
  name: 'ServiceList',
  components: {ImageAssistant},
  props: ['service'],
  setup() {
    return {};
  },
});
</script>
