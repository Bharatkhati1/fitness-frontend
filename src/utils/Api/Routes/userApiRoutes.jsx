const userApiRoutes = {
  get_sliders: `/sliders`,

  get_services: `/services`,

  get_blogs: ({ search = '', page = 1, limit = 10, category } = {}) => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (category) params.append("category", category);

    const queryString = params.toString();
    return `/blogs${queryString ? '?' + queryString : ''}`;
  },

  get_blog_details:(slug)=>`/blogs/${slug}`,

  get_blog_categories:`/blogs-categories`,

  get_service_details:(slug)=>`/package/${slug}`,

  get_package_details:(slug)=>`/package/${slug}/details`,

  get_package_consultants:(id)=>`/package/${id}/consultants`,

  get_kitchen_items: ({ search = '', page = 1, limit = 10, category, type } = {}) => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (category) params.append("categoryId", category);
    if (type) params.append("type", type);

    const queryString = params.toString();
    return `/smart-kitchen-items${queryString ? '?' + queryString : ''}`;
  },

  get_kitchen_categories:`/smart-kitchen-category`,

  download_recipe:(id)=>`/smart-kitchen-category/${id}`
};

export default userApiRoutes;
