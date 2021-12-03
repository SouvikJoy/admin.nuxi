<template>
	<div class="md:mx-6">
		<div class="title">Subscribers List</div>
		<div class="flex flex-col">
			<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div
						class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
					>
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th
										scope="col"
										class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
									>
										Email
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr v-for="(subscriber, index) in data" :key="index">
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex items-center">
											<div class="ml-4">
												<div class="text-sm font-medium text-gray-900">
													{{ subscriber?.email }}
												</div>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {defineComponent} from 'vue';
import useQuery from '@/hooks/sb-hooks-select';
import Header from '../../components/Common/Header';
export default defineComponent({
  name: 'Subscribers',
  components: {Header},
  setup() {
    const { loading, error, data, doQuery } = useQuery(
        'subscribers',
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
