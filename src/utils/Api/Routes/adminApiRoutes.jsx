const adminApiRoutes = {

    //UPLOAD IMAGE
    upload_image:`/upload-image`,

    //SERVICE ROUTES
    get_services: "/service",
    create_service:"/service",
    update_service:(id)=>`/service/${id}`,
    delete_service:(id)=>`/service/${id}`,
    update_service_order:`/service-sequence`,

    //PACKAGE ROUTES
    get_package:"/package",
    get_package_details:(id)=>`/package/${id}`,
    create_package:"/package",
    update_package:(packageId)=>`/package/${packageId}`,
    delete_package:(packageId)=>`/package/${packageId}`,

    //SLIDER ROUTES
    get_sliders:"/slider",
    create_slider:"/slider",
    update_slider:(sliderId)=>`/slider/${sliderId}`,
    delete_slider:(sliderId)=>`/slider/${sliderId}`,

    //SUCCESS STORIES
    get_success_stories:"/success-story",
    create_success_story:"/success-story",
    update_success_story:(id)=>`/success-story/${id}`,
    delete_success_story:(id)=>`/success-story/${id}`,

    //CATEGORY ROUTES
    get_categories: "/blog-category",
    create_category: "/blog-category",
    update_category: (categoryId) => `/blog-category/${categoryId}`,
    delete_category: (categoryId) => `/blog-category/${categoryId}`,

    //BLOG ROUTES
    get_blogs: "/blog",
    create_blog: "/blog",
    update_blog: (blogId) => `/blog/${blogId}`,
    delete_blog: (blogId) => `/blog/${blogId}`,

    //TEAM ROUTES
    get_team_members: "/teams",
    create_team_member: "/teams",
    update_team_member: (id) => `/teams/${id}`,
    delete_team_member: (id) => `/teams/${id}`,

    //CAREER ROUTES
    get_careers: "/jobs",
    create_career: "/jobs",
    update_career: (id) => `/jobs/${id}`,
    delete_career: (id) => `/jobs/${id}`,

    //CONTACT DETAILS ROUTES
    get_contact_details:`/contact`,
    update_contact_details:`/contact`,

    //CONSULTANTS ROUTES
    get_all_consultants:`/consultant`,
    create_consultant:`/consultant`,
    update_consultant:(id)=>`/consultant/${id}`,
    delete_consultant:(id)=>`/consultant/${id}`,

    //SMART KITCHEN CATEGORIES 
    get_sk_categories:`/item-category`,
    create_sk_category:`/item-category`,
    update_sk_category:(id)=>`/item-category/${id}`,
    delete_sk_category:(id)=>`/item-category/${id}`,

    //RECIPE ITEM ROUTES
    get_all_recipies:`/items`,
    create_recipe:`/items`,
    update_recipe:(id)=>`/items/${id}`,
    delete_recipe:(id)=>`/items/${id}`,

    //POLICIES ROUTES
    get_policy_details:(slug)=>`/cms/${slug}`,
    update_policy:(id)=>`/cms/${id}`,

    //INQUIRIES ROUTES
    get_all_inquiry:(type)=>`/inquiries/${type}`

  };
  
  export default adminApiRoutes;
  