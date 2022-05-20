# recog
Image Recognition Widget

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)


## Installation

### The demo app

```bash
git clone https://github.com/krampstudio/recog.git
cd recog
npm ci
```

The widget uses the [Google Cloud Vision Api](https://cloud.google.com/vision) to detect objects in images. You'll have to [set up vision](https://cloud.google.com/vision/docs/setup) and provide an [API KEY](https://cloud.google.com/docs/authentication/api-keys) in order to connect to the service.

The key needs to be set in `config.json`.

To start the demo app:

```
npm start
```

### As a library

```bash
npm i @krampstudio/recog
```

#### Usage as a vanilla JavaScript component

```js
import RecogWidget from 'recog';

new RecogWidget({
  target: document.querySelector('.some-container'),
  props: {
    apiUrl: 'https://vision.googleapis.com/v1/images:annotate?key=<YOUR_VISION_API_KEY>'
  }
});
```


#### Usage as a Svelte component

```js
<script>
  import RecogWidget from 'recog/lib/RecogWidget.svelte';
  const apiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=<YOUR_VISION_API_KEY>'
</script>
<RecogWidget {apiUrl} />
```

#### Styling

The styles are provided by [tailwindcss](https://tailwindcss.com/). 

## Development

 - unit test : `npm test`
 - run the dev server : `npm dev`
 - lint the code : `npm lint`

## License
[MIT](https://choosealicense.com/licenses/mit/)
