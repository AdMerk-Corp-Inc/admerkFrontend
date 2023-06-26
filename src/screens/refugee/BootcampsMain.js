import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import Pagination from "../../component/Pagination";
import { node_url, url } from "../../Helper/Helper";
import { userContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import InviteContactsModal from "../../component/InviteContactsModal";

function BootcampsMain() {
   const { user, setLoad } = useContext(userContext);
   const [feeds, setFeeds] = useState([]);

   const [page, setPage] = useState(1);

   async function fetchFeeds() {
      setLoad(true);

      const response = await fetch(url + "get-list", {
         headers: {
            Authorization: `Bearer ${user?.token}`,
         },
      });

      if (response.ok == true) {
         setLoad(false);
         const data = await response.json();
         console.log(data);
         if (data.status == 200) {
            setFeeds(data?.list);
         } else {
            toast.error(data?.message);
         }
      } else {
         setLoad(false);
         toast.error("Internal server error!");
      }
   }

   useEffect(() => {
      fetchFeeds();
      setLoad(false);
   }, [page]);

   //    console.log("[BootcampsMain] User: ", user);

   return (
      <div className="sponsor-dashboard-div container-lg px-3 my-5">
         <div className="row">
            <div className="col-md-9">
               <div className="dashboard-heading-div position-relative mb-4">
                  <div>
                     {/* <h2>Hello, {user?.name}</h2> */}
                     <h3>
                        Discover the bootcamps, that will help you land jobs
                     </h3>
                  </div>
               </div>

               {/* <div className="refugee-cards">
                  <div class="input-group px-4 py-3 border-bottom search-div">
                     <span class="input-group-text" id="basic-addon1"><i class="fa fa-search" aria-hidden="true"></i></span>
                     <a
                        className="filter-btn d-block d-md-none"
                        href=""
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                     >
                        <i class="fa fa-filter" aria-hidden="true"></i>
                     </a> 

                     <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                     >
                        <div class="modal-dialog modal-dialog-centered modal-xl">
                           <div class="modal-content">
                              <div class="modal-header border-0">
                                 <h5 class="modal-title" id="exampleModalLabel">
                                    Filters
                                 </h5>
                                 <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                 ></button>
                              </div>
                              <div class="modal-body">
                                 <div
                                    class="accordion"
                                    id="accordionPanelsStayOpenExample"
                                 >
                                    <div class="accordion-item">
                                       <h2
                                          class="accordion-header"
                                          id="panelsStayOpen-headingOne"
                                       >
                                          <button
                                             class="accordion-button"
                                             type="button"
                                             data-bs-toggle="collapse"
                                             data-bs-target="#panelsStayOpen-collapseOne"
                                             aria-expanded="true"
                                             aria-controls="panelsStayOpen-collapseOne"
                                          >
                                             Skills
                                          </button>
                                       </h2>
                                    </div>

                                    <div class="accordion-item">
                                       <h2
                                          class="accordion-header"
                                          id="panelsStayOpen-headingTwo"
                                       >
                                          <button
                                             class="accordion-button collapsed"
                                             type="button"
                                             data-bs-toggle="collapse"
                                             data-bs-target="#panelsStayOpen-collapseTwo"
                                             aria-expanded="false"
                                             aria-controls="panelsStayOpen-collapseTwo"
                                          >
                                             Hobby
                                          </button>
                                       </h2>
                                    </div>

                                    <div class="accordion-item">
                                       <h2
                                          class="accordion-header"
                                          id="panelsStayOpen-headingThree"
                                       >
                                          <button
                                             class="accordion-button collapsed"
                                             type="button"
                                             data-bs-toggle="collapse"
                                             data-bs-target="#panelsStayOpen-collapseThree"
                                             aria-expanded="false"
                                             aria-controls="panelsStayOpen-collapseThree"
                                          >
                                             Work Type
                                          </button>
                                       </h2>
                                    </div>

                                    <div class="accordion-item">
                                       <h2
                                          class="accordion-header"
                                          id="panelsStayOpen-headingFour"
                                       >
                                          <button
                                             class="accordion-button collapsed"
                                             type="button"
                                             data-bs-toggle="collapse"
                                             data-bs-target="#panelsStayOpen-collapseFour"
                                             aria-expanded="false"
                                             aria-controls="panelsStayOpen-collapseFour"
                                          >
                                             Location
                                          </button>
                                       </h2>
                                    </div>
                                 </div>
                              </div>
                              <div class="modal-footer">
                                 <button
                                    type="button"
                                    class="btn btn-primary"
                                    data-bs-dismiss="modal"
                                 >
                                    Apply
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div> */}

               {feeds?.length > 0 ? (
                  feeds.map((item, index) => (
                     <Link
                        key={index}
                        className="refugee-single-card px-4 py-4 text-decoration-none d-block"
                        to={`/boot-detail?id=${item?.id}`}
                     >
                        <div className="d-flex align-items-center avatar-div">
                           <div>
                              <h4>{item?.topic}</h4>
                              <h6>
                                 Payment: {item?.free == 1 ? "Free" : "Paid"}
                              </h6>
                              <h6>
                                 Owner Name:{" "}
                                 {item?.sponser_name
                                    ? item.sponser_name
                                    : item.company_name}
                              </h6>
                              <p>{item?.urls}</p>
                           </div>
                        </div>
                        {/* <div dangerouslySetInnerHTML={{ __html: feeds?.description }} /> */}
                        <span className="mb-0 mt-4">{item?.descryption}</span>
                     </Link>
                  ))
               ) : (
                  <div className="not-found">No Record Found</div>
               )}
            </div>

            <Pagination page={page} setPage={setPage} />
         </div>
      </div>
      //   </div>
   );
}

export default BootcampsMain;
