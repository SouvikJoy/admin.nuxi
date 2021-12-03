import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import router from '../router';
import useClient from '@/hooks/sb-hooks';

import { createToast } from 'mosha-vue-toastify';
import {auth} from '@/auth';


const supabase = useClient();

export default createStore({
  state: {
        user: null,
        categories: [],
        profile: {}
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_CATEGORY(state, data) {
      state.categories = data;
    },
      SET_PROFILE(state, data) {
          state.profile = data;
      }
  },
  actions: {
    async signInAction({ commit }, form) {
      try {
        const { error, user } = await supabase.auth.signIn({
          email: form.email,
          password: form.password,
        });

          if (!error) {
              createToast('Login Success',
                  {
                      type: 'success',
                      transition: 'slide',
                      showIcon: 'true',
                      hideProgressBar: 'true',
                  });
          }

        if (error) throw error;
        commit('SET_USER', user);

          await router.go();
      } catch (error) {
        createToast('Login Failed',
            {
              type: 'danger',
              transition: 'slide',
              showIcon: 'true',
              hideProgressBar: 'true',
            });

      }
    },

    async signUpAction({dispatch}, form) {
      try {
        const { error} = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        alert("You've been registered successfully");
        await dispatch('signInAction', form);
      } catch (error) {
        const {error_description, message} = error;
        alert(error_description || message);
      }
    },

    async signOutAction({ commit }) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        commit('SET_USER', null);
        createToast('Logout Success',
            {
              type: 'success',
              transition: 'slide',
              showIcon: 'true',
              hideProgressBar: 'true',
            });

        await router.go();
      } catch (error) {
        createToast('Logout Failed',
            {
              type: 'danger',
              transition: 'slide',
              showIcon: 'true',
              hideProgressBar: 'true',
            });

      }
    },

      async getAllCategories({commit}) {
          try {
              const { data, error } = await supabase
                  .from('categories')
                  .select('*');



              if (error || !data) {
                  throw error || new Error('No data');
              }
              await commit ('SET_CATEGORY', data);
          } catch (error) {
              // eslint-disable-next-line no-console
              console.log('error', error.message);
          }
      },

      async getProfile({ commit }) {
          try {
              loading.value = true;
              auth.user = supabase.auth.user();

              let { data, error, status } = await supabase
                  .from('profiles')
                  .select(`username, website, avatar_url`)
                  .eq('id', auth.user.id)
                  .single();

              if (error && status !== 406) throw error;

              await commit ('SET_PROFILE', data);
          } catch (error) {
              alert(error.message);
          } finally {
              loading.value = false;
          }
      }
  },
  modules: {
  },

  plugins: [createPersistedState()],

});
