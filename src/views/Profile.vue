<template>
	<form class="grid place-items-center mt-6" @submit.prevent="updateProfile">
		<logo v-model:path="avatar_url" @upload="updateProfile" :avatarImage="'rounded-full w-40'"/>
		<div>
			<label class="label-class" for="email">Email</label>
			<input class="input-class" id="email" type="text" :value="auth.user.email" disabled />
		</div>
		<div>
			<label class="label-class" for="username">Name</label>
			<input class="input-class" id="username" type="text" v-model="username" />
		</div>
		<div>
			<label class="label-class" for="website">Designation</label>
			<input class="input-class" id="website" type="text" v-model="website" />
		</div>

		<div>
			<input
				type="submit"
				class="create-button"
				:value="loading ? 'Loading ...' : 'Update'"
				:disabled="loading"
			/>
		</div>
	</form>
</template>

<script>
import useClient from '@/hooks/sb-hooks';
import { auth } from '@/auth';
import { onMounted, ref } from 'vue';
import Logo from '@/components/Logo';

const supabase = useClient();

export default {
  name: 'Profile',
  components: {
    Logo,
  },
  setup() {
    const loading = ref(true);
    const username = ref('');
    const website = ref('');
    const avatar_url = ref('');


    onMounted(() => {
      getProfile();
    });


    async function getProfile() {
      try {
        loading.value = true;
        auth.user = supabase.auth.user();

        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', auth.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          username.value = data.username;
          website.value = data.website;
          avatar_url.value = data.avatar_url;
        }
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    async function updateProfile() {
      try {
        loading.value = true;
        auth.user = supabase.auth.user();

        const updates = {
          id: auth.user.id,
          username: username.value,
          website: website.value,
          avatar_url: avatar_url.value,
          updated_at: new Date(),
        };

        let { error } = await supabase.from('profiles').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        });

        if (error) throw error;
      } catch (error) {
        alert(error.message);
      } finally {
        loading.value = false;
      }
    }

    return {
      auth,
      loading,
      username,
      website,
      avatar_url,

      updateProfile,
    };
  },
};
</script>
