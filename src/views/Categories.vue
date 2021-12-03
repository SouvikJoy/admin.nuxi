<template>
	<div>
		<div>
			<button @click="$router.push('/create-category')" class="create-button">Create</button>
			<div v-for="(category, index) in data" :key="index">
				<CategoryList :category="category" />
			</div>
		</div>
	</div>
</template>

<script>
import {defineComponent} from 'vue';
import useQuery from '@/hooks/sb-hooks-select';
import CategoryList from '@/components/CategoryComponents/CategoryList';
export default defineComponent({
  name: 'Categories',
  components: {CategoryList},
  setup() {
    const { loading, error, data, doQuery } = useQuery(
        'categories',
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
