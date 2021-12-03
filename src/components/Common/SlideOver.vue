<template>
	<div class="w-full h-full">
		<div class="bg-blue-100 h-full">
			<ul>
				<li>
					<router-link :to="{ name: 'Dashboard' }" class="nav-link">Dashboard</router-link>
				</li>

				<li>
					<router-link :to="{ name: 'SiteInfo' }" class="nav-link">SiteInfo</router-link>
				</li>

				<li>
					<router-link :to="{ name: 'Products' }" class="nav-link">Products</router-link>
				</li>

				<li>
					<router-link :to="{ name: 'Categories' }" class="nav-link">Categories</router-link>
				</li>

				<li>
					<router-link :to="{ name: 'Services' }" class="nav-link">Services</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XIcon } from '@heroicons/vue/outline';

export default {
  name: 'SlideOver',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
  },
  setup() {
    const open = ref(true);

    return {
      open,
    };
  },
};
</script>
