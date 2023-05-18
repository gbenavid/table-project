import data from '../data/jobs.json';
import { intersection } from 'lodash';

/**
 * @typedef {object} ParamsObject
 * @property {number}   page The current page.
 * @property {number}   limit The current limit (results per page).
 * @property {string[]} functions An array of function names to filter by.
 * @property {string[]} segments An array of segment names to filter by.
 */

/**
 * Fetches the data by taking the passed in params and using them to filter our jobs json.
 *
 * @param {ParamsObject} params The params object to use for filtering results.
 * @param {string} tableId The ID of the requesting table.
 */
export const getCollection = async (params, tableId) =>
  new Promise((resolve) => {
    try {
      const functions =
        params.get(`${tableId}_functions`) === ''
          ? []
          : params.get(`${tableId}_functions`).split(',');
      const segments =
        params.get(`${tableId}_segments`) === ''
          ? []
          : params.get(`${tableId}_segments`).split(',');
      const page = +params.get(`${tableId}_page`);
      const limit = +params.get(`${tableId}_limit`);

      let filteredItems = data.items;

      if (functions?.length) {
        filteredItems = filteredItems?.filter(
          (item) => intersection(item.functions, functions).length > 0
        );
      }

      if (segments?.length) {
        filteredItems = filteredItems?.filter(
          (item) => intersection(item.segments, segments).length > 0
        );
      }

      const total = filteredItems.length;
      const skip = (page - 1) * limit;

      filteredItems = filteredItems?.slice(skip, skip + limit);

      // Simulate loading
      setTimeout(() => {
        resolve({ items: filteredItems, total });
      }, 200);
    } catch (e) {
      throw new Error(e.message);
    }
  });
