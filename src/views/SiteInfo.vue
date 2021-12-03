<template>
	<div class="grid place-items-center min-h-screen">
		<Form
			ref="formRef"
			v-slot="{ errors }"
			class="form-widget"
			@submit="updateSiteInfo"
		>
			<div class="flex justify-center my-6">
				<Logo v-model:path="app_logo_url" @upload="updateSiteInfo" />
			</div>


			<div>
				<div class="grid md:grid-cols-2 gap-4">
					<div>
						<label for="name">Name</label>
						<Field
							id="name"
							name="name"
							v-model="app_name"
							type="text"
							class="input-class"
							:class="fieldClasses(!!errors.name)"
							rules="required"
						/>

						<ErrorMessage class="text-xs text-red-600 font-bold tracking-wider" name="name" />
					</div>

					<div>
						<label for="email">Email</label>
						<Field
							id="email"
							name="email"
							:class="fieldClasses(!!errors.brief)"
							v-model="app_email"
							type="email"
							class="input-class"
							rules="required"
						/>
					</div>

					<ErrorMessage class="text-xs text-red-600 font-bold tracking-wider" name="email" />
				</div>

				<div class="grid md:grid-cols-2 py-4 gap-4">
					<div>
						<label for="telephone">Telephone</label>
						<Field
							id="telephone"
							name="telephone"
							v-model="app_telephone"
							:class="fieldClasses(!!errors.telephone)"
							type="text"
							class="input-class"
							rules="required"
						/>

						<ErrorMessage
							class="text-xs text-red-600 font-bold tracking-wider"
							name="telephone"
						/>
					</div>

					<div>
						<label for="cellphone">Cellphone</label>
						<Field
							id="cellphone"
							name="cellphone"
							:class="fieldClasses(!!errors.cellphone)"
							v-model="app_cellphone"
							type="text"
							class="input-class"
							rules="required"
						/>

						<ErrorMessage
							class="text-xs text-red-600 font-bold tracking-wider"
							name="cellphone"
						/>
					</div>
				</div>

				<div>
					<label for="address">Address</label>
					<Field
						id="address"
						name="address"
						v-model="app_address"
						:class="fieldClasses(!!errors.address)"
						type="text"
						class="input-class"
						rules="required"
					/>

					<ErrorMessage class="text-xs text-red-600 font-bold tracking-wider" name="address" />
				</div>

				<div class="py-4">
					<label for="brief">Brief</label>
					<Field
						id="brief"
						name="brief"
						:class="fieldClasses(!!errors.brief)"
						v-model="app_brief"
						type="text"
						class="input-class"
						rules="required|max:80"
					/>

					<ErrorMessage class="text-xs text-red-600 font-bold tracking-wider" name="brief" />
				</div>

				<div>
					<label for="description">Description</label>
					<Field
						as="textarea"
						name="description"
						v-model="app_description"
						:class="fieldClasses(!!errors.description)"
						rows="6"
						class="input-class"
						rules="required|max:180"
					/>

					<ErrorMessage
						class="text-xs text-red-600 font-bold tracking-wider"
						name="description"
					/>
				</div>

				<label for="background-image">Landing Page Image</label>
				<div class="flex justify-center my-6">
					<BackgroundImage v-model:path="app_landing_image_url" @upload="updateSiteInfo" />
				</div>
			</div>

			<div>
				<input
					type="submit"
					class="create-button"
					:value="loading ? 'Loading ...' : 'Update'"
					:disabled="loading"
				/>
			</div>
		</Form>
	</div>
</template>

<script>
import useClient from '@/hooks/sb-hooks';
import { onMounted, ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { initRule } from '@/utils';
import {createToast} from 'mosha-vue-toastify';
import Logo from '@/components/Logo';
import BackgroundImage from '@/components/BackgroundImage';
export default {
  name: 'SiteInfo',
  components: {
    BackgroundImage,
    Logo,
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    initRule(['min', 'max', 'required']);
    const supabase = useClient();
    const loading = ref(true);
    const app_name = ref('');
    const app_description = ref('');
    const app_address = ref('');
    const app_telephone = ref('');
    const app_cellphone = ref('');
    const app_email = ref('');
    const app_logo_url = ref('');
    const app_landing_image_url = ref('');
    const app_brief = ref('');
    async function getSiteInfos() {
      try {
        loading.value = true;
        let { data, error, status } = await supabase
            .from('site_infos')
            .select(
                `app_name, app_logo_url, app_description, app_address, app_telephone, app_cellphone, app_email, app_brief, app_landing_image_url`
            )
            .single();
        if (error && status !== 406) throw error;
        if (data) {
          app_name.value = data.app_name;
          app_logo_url.value = data.app_logo_url;
          app_landing_image_url.value = data.app_landing_image_url;
          app_description.value = data.app_description;
          app_address.value = data.app_address;
          app_telephone.value = data.app_telephone;
          app_cellphone.value = data.app_cellphone;
          app_email.value = data.app_email;
          app_brief.value = data.app_brief;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }
    async function updateSiteInfo() {
      try {
        loading.value = true;
        // eslint-disable-next-line no-unused-vars
        const { id } = '1d62bf60-05a8-4b0c-96df-64771a91f87f';
        const updates = {
          id: '1d62bf60-05a8-4b0c-96df-64771a91f87f',
          app_name: app_name.value,
          app_logo_url: app_logo_url.value,
          app_landing_image_url: app_landing_image_url.value,
          app_description: app_description.value,
          app_address: app_address.value,
          app_telephone: app_telephone.value,
          app_cellphone: app_cellphone.value,
          app_email: app_email.value,
          app_brief: app_brief.value,
          updated_at: new Date(),
        };
        let { error } = await supabase.from('site_infos').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        });
        createToast('Informations Changed',
            {
              showIcon: 'true',
              transition: 'bounce',
              type: 'success',
            });
        if (error) throw error;
      } catch (error) {
        createToast('Informations Can not be Changed',
            {
              showIcon: 'true',
              transition: 'bounce',
              type: 'danger',
            });
      } finally {
        loading.value = false;
      }
    }
    onMounted(() => {
      getSiteInfos();
    });
    return {
      loading,
      app_name,
      app_logo_url,
      app_landing_image_url,
      app_description,
      app_address,
      app_telephone,
      app_cellphone,
      app_email,
      app_brief,
      updateSiteInfo,
    };
  },
  methods: {
    fieldClasses(hasError) {
      const cls =
          'border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150';
      return !hasError ? cls : `${cls} is-error`;
    },
  },
};
</script>
