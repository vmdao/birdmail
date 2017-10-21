<template>
<v-flex xs12>
    <input :label="$t(label)" type="file" id="input-file" class="inputfile inputfile-2">
    </input>
    <label for="input-file">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
      <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z">
        </path>
        </svg>
        <span>Choose a file…</span>
    </label>
  </v-flex>
</template>

<script>

export default {

  props: {
    label: {
      type: String,
      required: false
    },
    field: {
      type: Object,
      required: true
    },
    value: {
      required: false
    }
  },
  data () {
    return {
      inputGroupClass: 'input-group input-group--dirty input-group--text-field',
      dropzoneOptions: {createImageThumbnails: false}
    }
  },
  computed: {

    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onSelectFile (e) {
      console.log('onSelectFile', e)
    },
    uploadSuccess (file, response) {
      if (response.status === 200) {
        if (!this.model) {
          this.model = [response.message.url];
        } else {
          this.model.push(response.message.url);
        }
      } else {
        console.log('uploadError', response)
      }
    },
    imageShowError (event) {
      const img = event.target;
      img.src = img.src;
    }
  },
  mounted: function () {
    let inputs = document.querySelectorAll('.inputfile');
    const {url, mailListId} = this.field;
    Array.prototype.forEach.call(inputs, function (input) {
      let label = input.nextElementSibling;
      let labelVal = label.innerHTML;
      input.addEventListener('change', function (e) {
        let fileName = '';
        if (this.files && this.files.length > 1) {
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        } else {
          fileName = e.target.value.split('\\').pop();
        } if (fileName) {
          label.querySelector('span').innerHTML = fileName;
        } else {
          label.innerHTML = labelVal;
        }
        let file = this.files[0];
        var fd = new FormData();
        fd.append("file", file);
        fd.append('mailListId', mailListId);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.upload.onprogress = function (e) {
          if (e.lengthComputable) {
            let percentComplete = (e.loaded / e.total) * 100;
            console.log(percentComplete + '% uploaded');
          }
        };
        xhr.onload = function () {
          if (this.status == 200) {
            var resp = JSON.parse(this.response);
            console.log('Server got:', resp);
          };
        };
        xhr.send(fd);
        console.log(url)
      });
      input.addEventListener('focus', function () {
        input.classList.add('has-focus');
      });
      input.addEventListener('blur', function () {
        input.classList.remove('has-focus');
      });
    });
  }
}
</script>
