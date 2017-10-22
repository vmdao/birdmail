<template lang="pug">
v-flex
  v-select(v-if="['select', 'select2'].includes(field.type)", @input="changeSelect", item-text="name", return-object, item-value="id", v-model="model", :chips="field.options.chips", :multiple="field.options.multiple" ,:autocomplete="field.options.autocomplete" , :items='field.choices', v-bind='field')
  template(v-else-if="['checkboxes'].indexOf(field.type) > -1")
    p {{$t(field.label)}}
    v-layout(row, wrap)
      v-flex(v-bind="{[field.width]: true}", xs12, v-for='option in field.choices',:key="field.value")  
        component(
          v-model='model', 
          hide-details,
          :is="field.type == 'radios' ? 'v-radio' : 'v-checkbox'", 
          :key='option.value',
          :value='option.value', 
          :label='option.text',
        )
  template(v-else-if="['radios'].indexOf(field.type) > -1")
    p {{$t(field.label)}}
    v-layout(row, wrap)
      v-flex(v-bind="{[field.width]: true}",xs12, v-for='option in field.choices',:key="field.value")
        component(
          v-model='model', 
          hide-details,
          :is="field.type == 'radios' ? 'v-radio' : 'v-checkbox'", 
          :key='option.value',
          :value='option.value', 
          :label='option.text',
        )
  template(v-else-if="['date'].indexOf(field.type) > -1")
    v-flex
      v-menu(@increment="changeBody")
        v-text-field(slot='activator', v-model='model', :label="$t(field.label)")
        v-date-picker(v-model='model', no-title, scrollable, actions)
      //- v-menu(lazy='', :close-on-content-click='false', transition='scale-transition', offset-y='', full-width='', :nudge-right='40', max-width='290px', min-width='290px')
      //-   v-text-field(slot='activator', label='Picker in menu', v-model='time', prepend-icon='access_time', readonly='')
      //-   v-time-picker(v-model='time', autosave='')
  template(v-else-if="['date2'].indexOf(field.type) > -1")
    v-flex
      label {{$t(field.label)}}
      input(type="datetime-local", v-bind='field', v-model='model')
  div(:class="inputGroupClass", v-else-if="field.type == 'html'")
    label {{$t(field.label)}}
    div.pt-2
      quill-editor(v-model='model')
  //todo dropzone
  div(:class="inputGroupClass",v-else-if="['file', 'image', 'video'].includes(field.type)")
    label {{$t(field.label)}}
    .pt-2
      .image-list
        .image-item(v-for='image in model')
          img.image-center(:src="'http://localhost:1337' + image", @error="imageShowError")
    div.pt-2
      dropzone(:id="'dropzone_' + name", :thumbnailWidth="120", :thumbnailHeight="120", :dropzoneOptions="dropzoneOptions" :url="$store.state.config.ajaxUploadUrl", @vdropzone-success="uploadSuccess")
        input(type='hidden', v-model='model')
  div(v-else-if="['switch'].indexOf(field.type) > -1")
    p {{$t(field.label)}}
    v-switch(v-model='model')
  v-text-field(v-else, v-model='model', v-bind='field', :label="$t(field.label)" :placeholder="$t(field.placeholder)" type="text",:multiLine="field.type == 'textarea'")
</template>

<script>

export default {

  props: {
    field: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: false
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
    },
    date: {
      get () {
        return this.valueDate
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    time: {
      get () {
        return this.valueDate
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
    changeSelect (data) {
      this.$emit('increment')
      console.log(12)
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
    },
    changeBody (e) {
      console.log('change body')
    }
  }
}
</script>
