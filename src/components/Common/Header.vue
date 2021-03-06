<template>
	<Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
		<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
			<div class="relative flex items-center justify-between h-16">
				<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
					<!-- Mobile menu button-->
					<DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
						<span class="sr-only">Open main menu</span>
						<MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
						<XIcon v-else class="block h-6 w-6" aria-hidden="true" />
					</DisclosureButton>
				</div>
				<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
					<div class="flex-shrink-0 flex items-center">
						<!--						<img class="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
						<img class="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />-->
					</div>

				</div>
				<div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
					<button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
						<span class="sr-only">View notifications</span>
						<BellIcon class="h-6 w-6" aria-hidden="true" />
					</button>

					<!-- Profile dropdown -->
					<Menu as="div" class="ml-3 relative">
						<div>
							<MenuButton class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
								<span class="sr-only">Open user menu</span>
								<Logo v-model:path="avatar_url" :avatarImage="'w-12 h-12 rounded-full'" />
							</MenuButton>
						</div>
						<transition enterActiveClass="transition ease-out duration-100" enterFromClass="transform opacity-0 scale-95" enterToClass="transform opacity-100 scale-100" leaveActiveClass="transition ease-in duration-75" leaveFromClass="transform opacity-100 scale-100" leaveToClass="transform opacity-0 scale-95">
							<MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
								<MenuItem v-slot="{ active }">
									<router-link :to="{ name: 'Profile' }" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</router-link>
								</MenuItem>
								<MenuItem v-slot="{ active }">
									<router-link :to="{ name: 'SiteInfo' }" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">App Settings</router-link>
								</MenuItem>
								<MenuItem v-slot="{ active }">
									<button @click.prevent="signOut" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</button>
								</MenuItem>
							</MenuItems>
						</transition>
					</Menu>
				</div>
			</div>
		</div>
		<DisclosurePanel class="sm:hidden">
			<div class="px-2 pt-2 pb-3 space-y-1">
				<router-link v-for="item in navigation" :key="item.name" as="a" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
			</div>
		</DisclosurePanel>

	</Disclosure>
</template>

<script>
import useClient from '@/hooks/sb-hooks';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline';
import {useStore} from 'vuex';
import {computed, onMounted, ref} from 'vue';
import {auth} from '@/auth';
import Logo from '../Logo';


export default {
  name: 'Header',
  components: {
    Logo,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const avatar_url = ref('');

    const store = useStore();

    const supabase = useClient();

    auth.user = supabase.auth.user;

    const navigation = [
      { name: 'Dashboard', href: '/', current: true },
      { name: 'Products', href: '/products', current: false },
      { name: 'Categories', href: '/categories', current: false },
      { name: 'Services', href: '/services', current: false },
    ];


    onMounted(() => {
      getProfile();
    });


    async function getProfile() {
      try {
        auth.user = supabase.auth.user();

        let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', auth.user.id)
            .single();

        if (data) {
          avatar_url.value = data.avatar_url;
        }

        if (error && status !== 406) throw error;
        console.log(data);
      } catch (error) {
        alert(error.message);
      }
    }


    const userEmail = computed(() => store.state.user);

    const signOut = () => {
      store.dispatch('signOutAction');
    };

    return {
      userEmail,
      signOut,
      navigation,
      avatar_url
    };
  },
};
</script>
