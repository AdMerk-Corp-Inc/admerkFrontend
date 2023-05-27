import React, { Fragment, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
import { GiGraduateCap } from "react-icons/gi";
import {
  HiLocationMarker,
  HiOfficeBuilding,
  HiOutlineMail,
  HiPhone,
} from "react-icons/hi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { saveAs } from "file-saver";

import { useSelector } from "react-redux";

function Resume(props) {
  const { userData } = props;
  const { uphoto } = userData;
  const [imageUrl, setImageUrl] = useState(null);
  console.log(userData);
  useEffect(() => {
    if (uphoto) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
      reader.readAsDataURL(uphoto);
    }
  }, [uphoto]);
  //   const profile = useSelector(state => state.profile)
  //   const name = profile.name.split(" ");
  //   const file = useSelector(state => state.file)
  //   const about = useSelector(state => state.about)
  //   const experienceList = useSelector(state => state.experienceList)
  //   const educationList = useSelector(state => state.educationList)
  //   const skills = useSelector(state => state.skills)

  //   const createAndDownloadPdf = () => {
  //     const data = {
  //       profile:profile,
  //       name:name,
  //       file:file,
  //       about:about,
  //       experienceList:experienceList,
  //       educationList:educationList,
  //       skills:skills
  //     }
  //     axios.post('http://localhost:5000/create-pdf', data)
  //       .then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
  //       .then((res) => {
  //         const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

  //         saveAs(pdfBlob, 'newPdf.pdf');
  //       })
  //   }

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };

  const GetIcon = (icon) => {
    switch (icon.icon) {
      case "HiOutlineMail":
        return <HiOutlineMail size={30} />;
      case "HiPhone":
        return <HiPhone size={30} />;
      case "BsLinkedin":
        return <BsLinkedin size={30} />;
      case "BsGithub":
        return <BsGithub size={30} />;
      case "BsGlobe":
        return <BsGlobe size={30} />;
      default:
        return "●";
    }
  };
  //   const GetLinks = () => {
  //     const list = [];
  //     if(profile.email){
  //       list.push({
  //         icon:"HiOutlineMail",
  //         link: profile.email,
  //       });
  //     }
  //     if(profile.contact){
  //       list.push({
  //         icon:"HiPhone",
  //         link: profile.contact,
  //       });
  //     }
  //     if(profile.linkedin){
  //       list.push({
  //         icon:"BsLinkedin",
  //         link: profile.linkedin,
  //       });
  //     }
  //     if(profile.github){
  //       list.push({
  //         icon:"BsGithub",
  //         link: profile.github,
  //       });
  //     }
  //     if(profile.website){
  //       list.push({
  //         icon:"BsGlobe",
  //         link: profile.website,
  //       });
  //     }

  //     return(
  //       list.map((item,id)=>{
  //         return(
  //           <div className={id%2===0 ? "d-flex aligh-items-start align-items-center bg-2 text-white p-3" : "d-flex aligh-items-start align-items-center bg-3 text-white p-3"} key={id}>
  //             <p className="m-0"><GetIcon icon={item.icon}/></p><span className="mx-2"></span><p className="m-0">{item.link}</p>
  //           </div>
  //         )
  //       })
  //     )

  //   }

  return (
    <Fragment>
      <div className="d-grid col-2 mx-auto mt-4">
        <button
          className="nav-link align-middle bg-dark text-white p-2 rounded"
          onClick={printDocument}
        >
          Download
        </button>
        {/* <button className="nav-link align-middle bg-dark text-white p-2 rounded mt-2" onClick={createAndDownloadPdf}>Download Version 2.0</button> */}
      </div>
      <div className="container d-flex justify-content-center p-4">
        <div className="row pdf bg-light" id="divToPrint" size="A4">
          <div className="d-flex align-items-center justify-content-center col-md-5 bg-1 p-0 py-2">
            <div>
              <div className="d-flex justify-content-center">
                <img
                  src={imageUrl}
                  className="pdf-profile-image"
                  alt="..."
                ></img>
              </div>

              <Stack className="text-center">
                <span className="font-bold m-0 firstname">
                  {userData.Uname}
                </span>
                {/* <span className="font-thin m-0">name1</span> */}
                <p></p>
                <p className="m-0">
                  <HiOfficeBuilding size={20} />
                  {userData.ucity.label}
                </p>
                <p>
                  <HiLocationMarker size={20} />
                  {userData.ustate.label}:{userData.ucountry.label}
                </p>
              </Stack>
              <br></br>
              {/* <GetLinks/> */}

              <Stack className="p-3">
                <h4 className="title">Skills</h4>
                <div className="skills-container">
                  {userData.uskills.map((items, id) => {
                    return (
                      <p className="technology rounded" key={id}>
                        {items.label}
                      </p>
                    );
                  })}
                </div>
              </Stack>
              <Stack className="p-3">
                <h4 className="title">Technical Skills</h4>
                <div className="skills-container">
                  {userData.utechskills.map((items, id) => {
                    return (
                      <p className="technology rounded" key={id}>
                        {items.label}
                      </p>
                    );
                  })}
                </div>
              </Stack>
            </div>
          </div>
          <div className="d-flex align-items-center col-md-7 p-0 py-4">
            <div>
              <div className="px-4 py-1">
                <h4 className="title">About Me</h4>
                <p className="text-break">{userData.udescription}</p>
                <hr></hr>
              </div>

              <div className="px-4">
                <h4 className="title">Experience</h4>
                <div className="d-flex justify-content-start py-1">
                  <HiOfficeBuilding size={30} />
                  <div className="px-3">
                    {/* <h4>{item.title}</h4> */}
                    <p className="m-0">
                      {userData.ulastjob} • {userData.uyearsofexp + " Years"}
                    </p>
                    {/* <p className="m-0">{item.location}</p> */}
                    {/* <p>{item.description}</p> */}
                  </div>
                </div>
                {/* {
                  experienceList.map((item,id)=>{
                    return(
                      <div className="d-flex justify-content-start py-1" key={id}>
                        <HiOfficeBuilding size={30}/>
                        <div className="px-3">
                          <h4>{item.title}</h4>
                          <p className="m-0">{item.company} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - "+item.endMonth+" "+item.endYear }`}</p>
                          <p className="m-0">{item.location}</p>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    )
                  })
                } */}

                <hr></hr>
              </div>

              <div className="px-4">
                <h4 className="title">Education</h4>
                <div className="d-flex justify-content-start py-1">
                  <GiGraduateCap size={40} />
                  <div className="px-3">
                    {/* <h4>{item.institute}</h4> */}
                    <p className="m-0">{userData.ueducation}</p>
                    <p>{userData.ugraduation}</p>
                  </div>
                </div>
                {/* {
                  educationList.map((item,id)=>{
                    return(
                      <div className="d-flex justify-content-start py-1" key={id}>
                        <GiGraduateCap size={40}/>
                        <div className="px-3">
                          <h4>{item.institute}</h4>
                          <p className="m-0">{item.degree} • {item.fieldOfStudy}</p>
                          <p>{item.startYear} - {item.endYear} • Grade: {item.grade}</p>
                        </div>
                      </div>
                    )
                  })
                } */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    // <h1>Hi!</h1>
  );
}

export default Resume;
