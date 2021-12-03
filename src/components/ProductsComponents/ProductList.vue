<template>
	<div>
		<div>{{ product?.name }}</div>
		<div>{{ product?.category }}</div>
		<div>{{ product?.brief }}</div>
		<div>{{ product?.description }}</div>
		<div>{{ product?.price }}</div>
		<div>{{ product?.created_at }}</div>
		<ImageAssistant :image="product?.image" bucket="product-bucket"/>

		<router-link :to="`/products/${product?.id}`" class="create-button">
			Edit
		</router-link>
	</div>
</template>

<script>
import {defineComponent} from 'vue';
import ImageAssistant from '../ImageAssistant';

export default defineComponent({
  name: 'ProductList',
  components: {ImageAssistant},
  props: ['product'],
  setup() {
    return {};
  },
});
</script>
