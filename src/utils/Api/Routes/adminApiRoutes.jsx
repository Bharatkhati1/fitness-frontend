const adminApiRoutes = {

    //SERVICE ROUTES
    get_services: "/service",
    create_service:"/service",
    update_service:(selectedSliderId)=>`/service/${selectedSliderId}`,
    delete_service:(selectedSliderId)=>`/service/${selectedSliderId}`,

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

  };
  
  export default adminApiRoutes;
  