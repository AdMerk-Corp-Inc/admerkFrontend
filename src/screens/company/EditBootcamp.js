import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { url } from "../../Helper/Helper";
import { userContext } from "../../context/UserContext";
import TextEditor from "../../component/TextEditor";

function EditBootcamp() {
   const { user, setLoad } = useContext(userContext);
   const [bootload, setBootLoad] = useState(true);
   const [boot, setBoot] = useState();
   const [topic, setTopic] = useState("");
   const [free, setFree] = useState(0);
   const [cost, setCost] = useState(0);
   const [urls, setUrls] = useState("");
   const [document, setDocument] = useState("");
   const [description, setDescription] = useState("");
   const [status, setStatus] = useState("live");

   function useQuery() {
      const { search } = useLocation();

      return React.useMemo(() => new URLSearchParams(search), [search]);
   }

   const id = useQuery().get("id");

   async function handleSubmit(e) {
      setLoad(true);
      e.preventDefault();

      let error = 0;

      const formData = new FormData();
      formData.append("topic", topic);
      formData.append("urls", urls);
      formData.append("free", free);
      formData.append("status", status);
      formData.append("priceInDollars", cost);
      formData.append("descryption", description);

      if (document) {
         formData.append("document", document);
      }

      if (error == 0) {
         const response = await fetch(url + `update-boot/${id}`, {
            method: "PUT",
            body: formData,
            headers: {
               Authorization: `Bearer ${user?.token}`,
            },
         });

         if (response.ok == true) {
            setLoad(false);
            const data = await response.json();
            console.log(data);

            if (data.Status == 200) {
               toast.success("BootCamp Changed Successfully!");
               window.location = window.location.origin + "/my-boots";
            } else {
               toast.error(data?.message);
            }
         }
      } else {
         setLoad(false);
         toast.error("Please fill country");
      }
   }

   async function getBoot() {
      setBootLoad(true);

      const response = await fetch(url + `get-bootcamp-details/${id}`, {
         headers: {
            Authorization: `Bearer ${user?.token}`,
         },
      });

      if (response.ok == true) {
         const data = await response.json();

         if (data.status == 200) {
            // console.log("here");
            setBoot(data.detail);
            setBootLoad(false);
         } else {
            toast.error(data?.message);
            setBootLoad(false);
         }
      }
   }

   useEffect(() => {
      getBoot();
   }, []);

   useEffect(() => {
      if (!bootload) {
         setTopic(boot.topic);
         setFree(boot.free);
         setCost(boot.priceInDollars);
         setUrls(boot.urls);
         setDescription(boot.descryption);
         setStatus(boot.status);
      }
   }, [bootload]);

   return (
      <div>
         <div className="signup-both-div">
            <section
               className="h-custom"
               style={{ backgroundColor: "#0061df08" }}
            >
               <div className="container py-5 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                     <div className="col-lg-8">
                        <div className="card rounded-3">
                           <div className="card-body p-4 p-md-5">
                              <h3 className="mb-4">Edit BootCamp</h3>

                              <form onSubmit={(e) => handleSubmit(e)}>
                                 <div className="row">
                                    <div className="filter-form-MUI-input-text col-md-6">
                                       <main class="input-div">
                                          <input
                                             class="inner-input"
                                             type="text"
                                             placeholder=" "
                                             value={topic}
                                             required
                                             onChange={(e) =>
                                                setTopic(e.target.value)
                                             }
                                          />
                                          <label for="name" class="inner-label">
                                             Topic
                                          </label>
                                          {/* <span className='required'>*Required</span> */}
                                       </main>

                                       {/* <span className='error'>it is span tag</span> */}
                                    </div>
                                    <div className="filter-form-MUI-input-text col-md-6">
                                       <main class="input-div">
                                          <input
                                             class="inner-input"
                                             type="text"
                                             placeholder=" "
                                             value={urls}
                                             required
                                             onChange={(e) =>
                                                setUrls(e.target.value)
                                             }
                                          />
                                          <label for="urls" class="inner-label">
                                             URL
                                          </label>
                                          {/* <span className='required'>*Required</span> */}
                                       </main>

                                       {/* <span className='error'>it is span tag</span> */}
                                    </div>

                                    <div className="filter-form-MUI-input-text col-md-6">
                                       <main class="input-div">
                                          <input
                                             class="inner-input"
                                             type="file"
                                             placeholder=" "
                                             id="name"
                                             autoComplete="off"
                                             onChange={(e) =>
                                                setDocument(e.target.files[0])
                                             }
                                          />
                                          <label for="name" class="inner-label">
                                             Upload Document Attchement
                                          </label>
                                       </main>
                                    </div>
                                    <div className="filter-form-MUI-input-text col-md-6">
                                       <label className="" htmlFor="">
                                          Payment
                                       </label>
                                       <select
                                          value={free}
                                          onChange={(e) =>
                                             setFree(e.target.value)
                                          }
                                          placeholder="Payment"
                                          class="form-select form-select-sm"
                                       >
                                          <option value={1}>Free</option>
                                          <option value={0}>Paid</option>
                                       </select>
                                    </div>
                                    <div className="filter-form-MUI-input-text col-md-6">
                                       <label className="" htmlFor="">
                                          Status
                                       </label>
                                       <select
                                          value={status}
                                          onChange={(e) =>
                                             setStatus(e.target.value)
                                          }
                                          placeholder="Status"
                                          class="form-select form-select-sm"
                                       >
                                          <option value={1}>Live</option>
                                          <option value={0}>Down</option>
                                       </select>
                                    </div>

                                    {free == 0 ? (
                                       <div className="filter-form-MUI-input-text col-md-6">
                                          <main class="input-div">
                                             <input
                                                class="inner-input"
                                                type="number"
                                                value={cost}
                                                name="cost"
                                                placeholder=" "
                                                id="name"
                                                autoComplete="off"
                                                onChange={(e) =>
                                                   setCost(e.target.value)
                                                }
                                             />
                                             <label
                                                for="name"
                                                class="inner-label"
                                             >
                                                Cost
                                             </label>
                                          </main>
                                       </div>
                                    ) : (
                                       <></>
                                    )}

                                    <div className="filter-form-MUI-input-text mt-3">
                                       <main class="input-div h-100">
                                          <textarea
                                             class="inner-input position-relative pt-3"
                                             type="text"
                                             placeholder=" "
                                             id="name"
                                             autoComplete="off"
                                             rows="8"
                                             value={description}
                                             onChange={(e) =>
                                                setDescription(e.target.value)
                                             }
                                          />
                                          {/* <TextEditor
                                             content={description}
                                             setContent={setDescription}
                                          /> */}
                                       </main>
                                    </div>
                                 </div>

                                 <button
                                    type="submit"
                                    className="btn custom-sm-btn btn-lg mb-1 job-submit-btn"
                                 >
                                    Change Bootcamp
                                 </button>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
}

export default EditBootcamp;
