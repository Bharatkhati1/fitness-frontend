const adminApiRoutes = {

    //SERVICE ROUTES
    get_services: "/service",
    create_service:"/service",
    update_service:(selectedSliderId)=>`/service/${selectedSliderId}`,
    delete_service:(selectedSliderId)=>`/service/${selectedSliderId}`,

    //PACKAGE ROUTES
    get_package:"/package",
    create_package:"/package",
    update_package:(packageId)=>`/package/${packageId}`,
    delete_package:(packageId)=>`/package/${packageId}`,

    //SLIDER ROUTES
    get_sliders:"/slider",
    create_slider:"/slider",
    update_slider:(sliderId)=>`/slider/${sliderId}`,
    delete_slider:(sliderId)=>`/slider/${sliderId}`,

  };
  
  export default adminApiRoutes;
  