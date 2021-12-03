<template>
	<div>
		<div>{{ category?.name }}</div>
		<div>{{ category?.description }}</div>
		<ImageAssistant :image="category?.image" bucket="product-bucket"/>

		<router-link :to="`/categories/${category?.id}`" class="create-button">
			Edit
		</router-link>
	</div>
</template>

<script>
import {defineComponent} from 'vue';
import ImageAssistant from '../ImageAssistant';

export default defineComponent({
  name: 'CategoryList',
  components: {ImageAssistant},
  props: ['category'],
  setup() {
    return {};
  },
});
</script>
