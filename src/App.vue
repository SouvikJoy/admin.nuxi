<template>
	<div v-if="auth.user" class="md:grid grid-cols-7 justify-between min-h-screen">
		<SlideOver class="md:block hidden" />
		<div class="col-span-6">
			<Header />
			<router-view />
		</div>
	</div>
	<SignIn v-else/>
</template>

<style>
</style>

<script>
import useClient from '@/hooks/sb-hooks';
import { auth } from '@/auth';
import SignIn from '@/views/SignIn';
import Header from '@/components/Common/Header';
import SlideOver from '@/components/Common/SlideOver';

const supabase = useClient();

export default {
  components: {SlideOver, Header, SignIn},
  setup() {
    auth.user = supabase.auth.user();
    return {
      auth,
    };
  },
};
</script>
