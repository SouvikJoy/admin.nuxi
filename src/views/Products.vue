<template>
	<div>
		<div>
			<button @click="$router.push('/create-product')" class="create-button">Create</button>
			<div v-for="(product, index) in data" :key="index">
				<ProductList :product="product" />
			</div>
		</div>
	</div>
</template>

<script>
import {defineComponent} from 'vue';
import ProductList from '@/components/ProductsComponents/ProductList';
import useQuery from '@/hooks/sb-hooks-select';
export default defineComponent({
  name: 'Products',
  components: {ProductList},
  setup() {
    const { loading, error, data, doQuery } = useQuery(
        'products',
        undefined,
        true
    );

    const getData = async() => {
      await doQuery();
    };

    return {
      loading,
      error,
      data,
      getData,
      doQuery
    };
  },
});
</script>

<style scoped>

</style>
