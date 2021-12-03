<template>
	<div id="component">
		<file-pond
			name="test"
			ref="pond"
			allowMultiple="true"
			acceptedFileTypes="image/jpeg, image/png"
			:server="myServer"
			v-bind:files="myFiles"
			v-on:change="handleFileInput"
			v-on:init="handleFilePondInit"
		/>
	</div>
</template>

<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview
);
export default {
  name: 'Pond',
  data: function() {
    return {
      // fake server to simulate loading a 'local' server file and processing a file
      myServer: {
        process: (fieldName, file, metadata, load) => {
          // simulates uploading a file
          setTimeout(() => {
            load(Date.now());
          }, 1500);
        },
        load: (source, load) => {
          // simulates loading a file from the server
          fetch(source)
              .then((res) => res.blob())
              .then(load);
        },
      },
      myFiles: [
        {
          source: 'logo',

          options: {
            type: 'local'
          },
          file: {
            name: 'logo.png',
            size: 3001025,
            type: 'image/png'
          }
        }
      ],
    };
  },
  methods: {
    handleFilePondInit: function() {
      this.$refs.pond.getFiles();
      /* eslint-disable */
      console.log("FilePond has initialized");
    },
    handleFileInput: function (event) {
      this.myFiles.value = event.target.files[0];
    }
  },
  components: {
    FilePond,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
