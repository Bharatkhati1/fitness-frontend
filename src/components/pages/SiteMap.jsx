import React, { useEffect, useState } from "react";
import sitemapbanner from "../../../public/assets/img/sitemapbanner.jpg";
import { webAxios } from "../../utils/constants";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function SiteMap() {
  const [data, setData] = useState([]);
  const fetchSiteMapdata = async () => {
    try {
      const res = await webAxios.get(userApiRoutes.get_site_map);
      setData(res.data.data);
    } catch (error) {
      toast.error("Server Error");
    }
  };
  useEffect(() => {
    fetchSiteMapdata();
  }, []);
  console.log(data);
  return (
    <>
      <section className="innerbanner">
        <figure>
          <img src={sitemapbanner} />
        </figure>
        <div className="container">
          <div className="innerbannerContent">
            <h2>Site Map</h2>
            <p>
              A site map is a structured list or diagram of all the pages and
              content on a website.
            </p>
          </div>
        </div>
      </section>

      <div className="sitemain mt-4">
        <div className="container">
          <div class="PageTitle text-left mb-0">
            <h2>OUR SERVICES</h2>
          </div>

          <hr></hr>

          <ul className="sitelist">
            {data?.services?.map(
              (details) =>
                details.Packages.length > 0 && (
                  <li>
                    <div className="sitelistsec">
                      <h4>{details.name}</h4>
                      <ul className="sitelistinner">
                        {details.Packages.map((pkg) => (
                          <li>
                            <Link to={`/package/${pkg.slug}`}>{pkg.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="container">
          <div class="PageTitle text-left mb-0">
            <h2>Blogs</h2>
          </div>
          <hr></hr>
          <ul className="sitelist">
            {data?.blogs?.map(
              (details) =>
                details.Blogs.length > 0 && (
                  <li>
                    <div className="sitelistsec">
                      <h4>{details.name}</h4>
                      <ul className="sitelistinner">
                        {details.Blogs.map((pkg) => (
                          <li>
                            <Link to={`/blog/${pkg.slug}`}>{pkg.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="container">
          <div class="PageTitle text-left mb-0">
            <h2>News</h2>
          </div>
          <hr></hr>
          <ul className="sitelist">
            {data?.news?.map((details) => (
               <li>
               <div className="sitelistsec">
                 <ul className="sitelistinner">
                     <li>
                     <Link to={`/blog/${details.Blogs[0].slug}`}>
                       {details.Blogs[0].title}
                     </Link>
                   </li>
                 </ul>
               </div>
             </li>
          
            ))}
          </ul>
        </div>
        <div className="container">
          <div class="PageTitle text-left mb-0">
            <h2>Services</h2>
          </div>
          <hr></hr>
          <ul className="sitelist">
            {data?.services?.map(
              (details) =>
                details.Packages.length > 0 && (
                  <li>
                    <div className="sitelistsec">
                      <h4>{details.name}</h4>
                      <ul className="sitelistinner">
                        {details.Packages.map((pkg) => (
                          <li>
                            <Link to={`/package/${pkg.slug}`}>{pkg.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="container">
          <div class="PageTitle text-left mb-0">
            <h2>Smart Kitchen</h2>
          </div>
          <hr></hr>
          <ul className="sitelist">
            {data?.smartKitchen?.map(
              (details) =>
                details.Items?.length > 0 && (
                  <li>
                    <div className="sitelistsec">
                      <h4>{details.name}</h4>
                      <ul className="sitelistinner">
                        {details.Items.map((pkg) => (
                          <li>
                            <Link>{pkg.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SiteMap;
