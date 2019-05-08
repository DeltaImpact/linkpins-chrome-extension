import { parseConstants } from "../constants";
import { parseService } from "../services";

export const parseActions = {
  parse
};

function parse(dispatch) {
  let imageGetFunction = function(i) {
    return {
      src: i.src,
      height: i.height,
      width: i.width,
      naturalHeight: i.naturalHeight,
      naturalWidth: i.naturalWidth,
      x: i.x,
      y: i.y
    };
  }.toString();

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code:
            "Array.prototype.map.call(document.images, " +
            imageGetFunction +
            ");"
        },
        results => {
          if (chrome.runtime.lastError) {
            dispatch(parseImagesFailure("Couldn't execute the script at all"));
          } else if (typeof results[0] === "undefined") {
            dispatch(parseImagesFailure("Couldn't find what we wanted"));
          } else {
            //   console.log("Loaded images: " + results[0].length);
            let result = {};
            result.title = tabs[0].title;
            result.url = tabs[0].url;
            result.images = [{ src: tabs[0].favIconUrl }, ...results[0]];
            dispatch(parseImagesSuccess(result));
          }
        }
      );

      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: "document.body.innerText;"
        },
        results => {
          if (chrome.runtime.lastError) {
            dispatch(parseTextsFailure("Couldn't execute the script at all"));
          } else if (typeof results[0] === "undefined") {
            dispatch(parseTextsFailure("Couldn't find what we wanted"));
          } else {
            var elements = results[0]
              .split("\n")
              .map(e => e.trim())
              .filter(e => e.length > 80);
            let result = {};
            result.texts = elements;
            dispatch(parseTextsSuccess(result));
          }
        }
      );
    }
  );

  return parseRequest();
}

export function parseRequest() {
  return {
    type: parseConstants.PARSE_PAGE_REQUEST
  };
}

export function parseImagesSuccess(payload) {
  return {
    type: parseConstants.PARSE_IMAGES_SUCCESS,
    payload: payload
  };
}

export function parseTextsSuccess(payload) {
    return {
      type: parseConstants.PARSE_TEXTS_SUCCESS,
      payload: payload
    };
  }

export function parseImagesFailure(error) {
  return {
    type: parseConstants.PARSE_IMAGES_FAILURE,
    payload: error
  };
}

export function parseTextsFailure(error) {
    return {
      type: parseConstants.PARSE_TEXTS_FAILURE,
      payload: error
    };
  }
