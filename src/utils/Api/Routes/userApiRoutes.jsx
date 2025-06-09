const userApiRoutes = {
  get_sliders: `/sliders`,

  get_services: `/services`,

  get_blogs: ({ search = '', page = 1, limit = 10, category, order } = {}) => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (order) params.append("order", order);
    if (limit) params.append("limit", limit);
    if (category) params.append("category", category);

    const queryString = params.toString();
    return `/blogs${queryString ? '?' + queryString : ''}`;
  },

  get_blog_details:(slug)=>`/blogs/${slug}`,

  get_blog_categories:`/blogs-categories`,

  get_service_details:(slug)=>`/package/${slug}`,

  get_package_details:(slug)=>`/package/${slug}/details`,

  get_package_consultants:(id,type)=>`/package/${id}/consultants/${type}`,

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

  download_recipe:(id)=>`/smart-kitchen-recipe/${id}`,

  get_all_packages: ({ search = '', serviceId } = {}) => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (serviceId) params.append("serviceId", serviceId);
    return `/package${params.toString() ? '?' + params.toString() : ''}`;
  },

  get_teams:`/teams`,

  get_success_stories:`/user/success-stories`,

  send_inquiry:`/inquiry`,

  get_contact_us_details:`/contact-us`,

  social_login:`/social-login`,

  get_privacy_policy_details:`/cms-pages/privacy-policy`,

  get_refund_policy_details:`/cms-pages/return-policy`,

  get_cart_item:`/cart-items`,

  add_to_cart:`/add-to-cart`,

  remove_from_cart:(id)=>`/remove-cart-items/${id}`,

  apply_coupon:`/apply-coupon`
  
};

export default userApiRoutes;
