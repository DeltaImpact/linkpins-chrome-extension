import { createReducer } from "../../utils/misc";

const reducerInitialState = {
  loading: e => loadingImages || loadingTexts,
  loadingImages: null,
  loadingTexts: null,
  title: null,
  url: null,
  images: null,
  texts: null,
  previewImage: null,
  previewTexts: false,
  imagesError: null,
  textsError: null
};

export default createReducer(reducerInitialState, {
  PARSE_PAGE_REQUEST: state =>
    Object.assign({}, state, {
      loadingImages: true,
      loadingTexts: true,
      title: null,
      url: null,
      images: null,
      texts: null,
      previewImage: null,
      previewTexts: null,
      imagesError: null,
      textsError: null
    }),
  PARSE_IMAGES_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      title: payload.title,
      url: payload.url,
      images: payload.images,
      loadingImages: false
    }),
  PARSE_TEXTS_SUCCESS: (state, payload) =>
    Object.assign({}, state, {
      loadingTexts: false,
      texts: payload.texts
    }),
  PARSE_IMAGES_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      loadingImages: false,
      imagesError: payload
    }),
  PARSE_TEXTS_FAILURE: (state, payload) =>
    Object.assign({}, state, {
      loadingTexts: false,
      textsError: payload
    })
});
