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
            {data.map(
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
      </div>
    </>
  );
}

export default SiteMap;
