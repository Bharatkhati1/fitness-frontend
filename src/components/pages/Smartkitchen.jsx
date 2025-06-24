import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchKitchenCategories,
  getKitchenData,
} from "../../store/auth/AuthExtraReducers";

import OwlCarousel from "react-owl-carousel";
import searchIcon from "../../../public/assets/img/searchIcon.png";
import kichinbanner from "../../../public/assets/img/kichinbanner.png";
import leftp from "../../../public/assets/img/leftp.png";
import leftR from "../../../public/assets/img/rightp.png";
import BannerUpper from "./smartkichinbtext.png";
import { webAxios } from "../../utils/constants";
import userApiRoutes from "../../utils/Api/Routes/userApiRoutes";
import { toast } from "react-toastify";
import EmailRequiredPopup from "../authorized/UserUI/EmailRequiredpopup";
import useDebounce from "../Hooks/useDebounce";

import ficoninsta from "../../../public/assets/img/f-icon-insta.png";
import ficonyoutube from "../../../public/assets/img/f-icon-youtube.png";
import { Link } from "react-router-dom";
import userAxios from "../../utils/Api/userAxios";

function Smartkitchen() {
  const dispatch = useDispatch();
  const {
    kitchenData = { items: [], totalPages: 1 },
    kicthenCategories = [],
    isLoggedIn,
    user,
    contactUsDetails = {},
  } = useSelector((state) => state.auth);
  const [openEmailRequiredPopup, setOpenEmailRequiredPopup] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [filterCategories, setFilterCategories] = useState([])

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    dispatch(getKitchenData({ search: debouncedSearch, page, category, type }));
  }, [debouncedSearch, page, category, type]);

  useEffect(() => {
     if(type==""){
      setFilterCategories(kicthenCategories)
     }else if(type == "veg"){
      const filtered = kicthenCategories?.filter((cat)=> cat.type == "veg")
      setFilterCategories(filtered)
     }else{
      const filtered = kicthenCategories?.filter((cat)=> cat.type == "non-veg")
      setFilterCategories(filtered)
     }
  }, [kicthenCategories, type]);

  useEffect(() => {
    dispatch(fetchKitchenCategories());
  }, []);

  const handleCategoryClick = (catId) => {
    setCategory(catId);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleTypeClick = (t) => {
    setType(t === type ? "" : t); // toggle
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= kitchenData.totalPages) {
      setPage(newPage);
    }
  };

  const downloadRecipe = async (id) => {
    setSelectedRecipeId(id);
    if (!isLoggedIn) {
      setOpenEmailRequiredPopup(true);
      return;
    }

    const promise = webAxios.post(userApiRoutes.download_recipe(id), {
      email: user?.email,
    });

    toast.promise(promise, {
      pending: "Downloading recipe...",
      success: "Recipe downloaded successfully!",
      error: {
        render({ data }) {
          return (
            data?.response?.data?.message || "Failed to download : Server Error"
          );
        },
      },
    });

    try {
      await promise;
    } catch (error) {
      // error is already handled by toast.promise
    }
  };

  const onGetRecipe = async (email) => {
    const promise = webAxios.post(
      userApiRoutes.download_recipe(selectedRecipeId),
      { email }
    );

    toast.promise(promise, {
      pending: "Sending recipe to your email...",
      success: "Recipe sent successfully!",
      error: {
        render({ data }) {
          return (
            data?.response?.data?.message || "Failed to send : Server Error"
          );
        },
      },
    });

    try {
      await promise;
    } catch (error) {
      // error is already handled by toast.promise
    }
  };

  console.log(filterCategories)
  return (
    <>
      <EmailRequiredPopup
        visible={openEmailRequiredPopup}
        onClose={() => setOpenEmailRequiredPopup(false)}
        onGetRecipe={onGetRecipe}
      />
      <section className="innerbanner blogbanner smartkitchein-banner">
        <h3 className="blogbannertitle">recipe - method - knowledge</h3>
        <figure>
          <img src={kichinbanner} alt="Smart Kitchen Banner" />
        </figure>

        <div className="container ">
          <div className="innerbannerContent">
            <span className="bannerup">
              <img src={BannerUpper} />
            </span>
            <div className="searcwithbtn d-flex">
              <div className="SearchBox">
                <input
                  type="text"
                  placeholder="Search here"
                  className="form-control"
                  value={search}
                  onChange={handleSearchChange}
                />
                <button className="SearchBtn">
                  <img src={searchIcon} />
                </button>
              </div>
              <div className="btnserch d-flex align-items-center">
                <a
                  className={`btn  ${type === "veg" ? "VegBtn" : ""}`}
                  onClick={() => handleTypeClick("veg")}
                >
                  Veg
                </a>
                <a
                  className={`btn  ${type === "non-veg" ? "VegBtn" : ""}`}
                  onClick={() => handleTypeClick("non-veg")}
                >
                  non Veg
                </a>
              </div>
            </div>
            <div className="FOLLOWUS bannerfollow">
              <h3>follow us </h3>
              <ul className="FOLLOWUSlist d-flex">
                <li>
                  <Link to={contactUsDetails?.kitchenInstagram}>
                    <img src={ficoninsta}></img>
                  </Link>
                </li>
                <li>
                  <Link to={contactUsDetails?.kitchenYoutube}>
                    <img src={ficonyoutube}></img>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Category Slider */}
      <section className="SmartKichin">
        <div className="container">
        { filterCategories&&filterCategories.length>0 && <div className="SmartKichinslider">
            <OwlCarousel
              className="owl-theme"
              dots={false}
              items={7}
              nav
              margin={10}
            >
              {filterCategories?.map((cat) => (
                <div className="item" key={cat.id}>
                  <div
                    className={`SmartKichinbox ${
                      category === cat.id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    <figure>
                      <img
                        crossOrigin="anonymous"
                        src={cat.image_url}
                        alt={cat.name}
                      />
                    </figure>
                    <p>{cat.name}</p>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>}
        </div>
      </section>

      {/* Recipe Cards */}
      <section className="SmartKichinlist">
        <div className="container">
          <div className="row row-cols-5 SmartKichinlistrow">
            {kitchenData?.length > 0 ? (
              kitchenData?.map((item) => (
                <div className="col" key={item.id}>
                  <figure>
                    <img
                      crossOrigin="anonymous"
                      src={item.image_url}
                      alt={item.name}
                    />
                  </figure>
                  <figcaption>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <a
                      onClick={() => downloadRecipe(item.id)}
                      className="btn btn-primary xm-btn hvr-shutter-out-horizontal"
                    >
                      Download Recipe
                    </a>
                  </figcaption>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h5>No item found.</h5>
              </div>
            )}
          </div>
        </div>
        <div className="container ">
          <div className="paginationfooter d-flex align-items-center justify-content-center">
            <div className="paginationBox d-flex justify-content-center">
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <a
                    className="page-link"
                    onClick={() => handlePageChange(page - 1)}
                  >
                    <img src={leftp} />
                  </a>
                </li>
                {[...Array(kitchenData.totalPages)].map((_, idx) => (
                  <li
                    key={idx}
                    className={`page-item ${page === idx + 1 ? "active" : ""}`}
                  >
                    <a
                      className="page-link"
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    page === kitchenData.totalPages ? "disabled" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    <img src={leftR} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="FOLLOWUS">
              <h3>follow us </h3>
              <ul className="FOLLOWUSlist d-flex">
                <li>
                  <Link to={contactUsDetails?.kitchenInstagram}>
                    <img src={ficoninsta}></img>
                  </Link>
                </li>
                <li>
                  <Link to={contactUsDetails?.kitchenYoutube}>
                    <img src={ficonyoutube}></img>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Smartkitchen;
