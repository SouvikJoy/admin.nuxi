<template>
	<div>
		<Header />
		<div>
			<button @click="$router.push('/create-service')" class="create-button">Create</button>
			<div v-for="(service, index) in data" :key="index">


				<ServiceList :service="service" />

			</div>
		</div>
	</div>
</template>

<script>
import {defineComponent} from 'vue';
import useQuery from '@/hooks/sb-hooks-select';
import ServiceList from '@/components/ServiceComponents/ServiceList';
export default defineComponent({
  name: 'Services',
  components: {ServiceList},
  setup() {
    const { loading, error, data, doQuery } = useQuery(
        'services',
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
