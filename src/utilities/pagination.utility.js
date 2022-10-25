const paginationUtility = {
  getPagination: (page, size) => {
    page = parseInt(page);
    size = parseInt(size);

    const limit = size ? size : 1;
    const offset = page ? (page - 1) * limit : 0;

    return { limit, offset };
  },

  getPagingData: (data, page, limit) => {
    const { count: total_items, rows: current_items } = data;
    const current_page = page ? page : 0;
    const total_pages = Math.ceil(total_items / limit);

    return { total_items, total_pages, current_page, current_items };
  },
};

module.exports = paginationUtility;
