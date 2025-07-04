const adminApiRoutes = {
  //UPLOAD IMAGE
  upload_image: `/upload-image`,

  //SERVICE ROUTES
  get_services: "/service?limit=1000",
  create_service: "/service",
  update_service: (id) => `/service/${id}`,
  delete_service: (id) => `/service/${id}`,
  update_service_order: `/service-sequence`,

  //PACKAGE ROUTES
  get_package: "/package",
  get_package_details: (id) => `/package/${id}`,
  create_package: "/package",
  update_package: (packageId) => `/package/${packageId}`,
  delete_package: (packageId) => `/package/${packageId}`,

  //SLIDER ROUTES
  get_sliders:(slug)=> `/slider?slug=${slug}`,
  create_slider: "/slider",
  update_slider: (sliderId) => `/slider/${sliderId}`,
  delete_slider: (sliderId) => `/slider/${sliderId}`,
  set_primary_slider:(id)=> `/slider-primary/${id}`,
  update_slider_sequence:`/slider-sequence`,

  //SUCCESS STORIES
  get_success_stories: "/success-story",
  create_success_story: "/success-story",
  update_success_story: (id) => `/success-story/${id}`,
  delete_success_story: (id) => `/success-story/${id}`,

  //CATEGORY ROUTES
  get_categories: "/blog-category",
  create_category: "/blog-category",
  update_category: (categoryId) => `/blog-category/${categoryId}`,
  delete_category: (categoryId) => `/blog-category/${categoryId}`,

  //BLOG ROUTES
  get_blogs:(slug)=> `/blog?type=${slug}&limit=1000`,
  create_blog: "/blog",
  update_blog: (blogId) => `/blog/${blogId}`,
  delete_blog: (blogId) => `/blog/${blogId}`,

  //TEAM ROUTES
  get_team_members: "/teams",
  create_team_member: "/teams",
  update_team_member: (id) => `/teams/${id}`,
  delete_team_member: (id) => `/teams/${id}`,

  //EVENT ROUTES
  get_events: "/events",
  create_events: "/events",
  update_events: (id) => `/events/${id}`,
  delete_events: (id) => `/events/${id}`,

  //CAREER ROUTES
  get_careers: "/jobs",
  create_career: "/jobs",
  update_career: (id) => `/jobs/${id}`,
  delete_career: (id) => `/jobs/${id}`,

  //CONTACT DETAILS ROUTES
  get_contact_details: `/contact`,
  update_contact_details: `/contact`,

  //CONSULTANTS ROUTES
  get_all_consultants: `/consultant`,
  create_consultant: `/consultant`,
  update_consultant: (id) => `/consultant/${id}`,
  delete_consultant: (id) => `/consultant/${id}`,

  //CONSULTANTS LEAVES ROUTES
  get_consultant_leaves: (consultantId) =>
    consultantId ? `/consultant-leave?consultantId=${consultantId}` : `/consultant-leave`,  
  create_consultant_leave: `/consultant-leave`,
  update_consultant_leave: (id) => `/consultant-leave/${id}`,
  delete_consultant_leave: (id) => `/consultant-leave/${id}`,
  update_availibility:(id)=>`/consultant-availability/${id}`,

  //SMART KITCHEN CATEGORIES
  get_sk_categories: `/item-category`,
  create_sk_category: `/item-category`,
  update_sk_category: (id) => `/item-category/${id}`,
  delete_sk_category: (id) => `/item-category/${id}`,

  //RECIPE ITEM ROUTES
  get_all_recipies: `/items`,
  create_recipe: `/items`,
  update_recipe: (id) => `/items/${id}`,
  delete_recipe: (id) => `/items/${id}`,

  //COUPONS ROUTES
  create_coupon: "/coupons",
  get_all_coupons: "/coupons",
  update_coupon: (id) => `/coupons/${id}`,
  delete_coupon: (id) => `/coupons/${id}`,

  //PARTNERS ROUTES
  create_partner: "/partners",
  get_all_partners: "/partners",
  update_partner: (id) => `/partners/${id}`,
  delete_partner: (id) => `/partners/${id}`,
  
  //MASTERS CATEGORY ROUTES
  create_master_category: "/masters",
  get_master_category:(slug)=> `/masters?slug=${slug}`,
  update_master_category: (id) => `/masters/${id}`,
  delete_master_category: (id) => `/masters/${id}`,

  //POLICIES ROUTES
  get_policy_details: (slug) => `/cms/${slug}`,
  update_policy: (id) => `/cms/${id}`,
  delete_optional_images:(id)=>`/cms-optional-image/${id}`,

  //INQUIRIES ROUTES
  get_all_inquiry: (type) => `/inquiries/${type}`,
  get_applied_jobs:`/jobs/applied`,
  export_inquiry:(type)=>`/export-inquiries/${type}`,

  //USER HANDLE ROUTES
  get_all_users: `/users`,
  update_status: (id) => `/users/${id}`,

  //PARTNER COMPONENT ROUTES
  get_partner_coupon:`/partner-coupons`,
  get_coupon_usage:`/partner-coupon-usage`,
  partner_payment_history:(id)=>id?`/partner-payment-history?partnerId=${id}`:`/partner-payment-history`,

  //CONSULTANT COMPONENT ROUTES
  get_consultant_appointments:`/consultant-appointments`,
  consultant_payment_history:(id)=>id ?`/consultant-appointments-payment?consultantId=${id}`:`/consultant-appointments-payment`,
  
  //ALL ORDERS AND APPOINTMENTS ADMIN
  get_all_orders:`/orders`,
  get_all_appointments:`/appointments`,
  get_testimonials:`/feedbacks`,
  update_testimonialStatus:(id)=>`/feedbacks/${id}`,

  //PAY PARTNER/CONSULTANTS
  add_debit:(type)=>`/add-debit/${type}`
};

export default adminApiRoutes;
