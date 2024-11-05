import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

import axios from "axios";

import { ApiUrl } from "../ApiRUL";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setUsername] = useState("");


  const SignUp = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/admin/create",
        method: "post",
        baseURL: ApiUrl.BASEURL,
        headers: { "content-type": "application/json" },
        data: { email: email, password: password, username: username },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
         
          alert(response.data.message)
          window.location.assign("/");
        } else {
          alert(response.data.error);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        className="row justify-content-center"
        style={{ alignItems: "center", height: "100vh" }}
      >
        <div className="col-10" style={{ marginTop: "" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{}} className="">
              <h1
                style={{
                  color: "#34a853",
                  fontSize: "50px",
                  textAlign: "center",
                }}
              >
                Health Consultancy
              </h1>
              <Card
                style={{
                  boxShadow: "0px 0px 5px 1px lightgray",
                  backgroundColor: "lightgrey",
                  padding: 50,
                  width: 600,
                }}
              >
                <div>
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {/* <img src="/images/hcs.png" style={{ width: "80px" }} /> */}

                    <h4 className="mt-3">Sign Up</h4>
                  </div>
                  <div className="inputlogin " style={{ marginTop: "50px" }}>
                    <div
                      class="input-group mb-4 mt-3"
                      style={{ display: "block", width: "100%" }}
                    >
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{
                          width: "60%",
                          marginLeft: "20%",
                          borderRadius: "3px",
                          borderLeft: "2px solid #34a853",
                          marginTop: "10px",
                        }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <input
                        type="text"
                        class="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{
                          width: "60%",
                          marginLeft: "20%",
                          borderRadius: "3px",
                          borderLeft: "2px solid #34a853",
                          marginTop: "10px",
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <input
                        type="password"
                        class="form-control mt-4"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{
                          width: "60%",
                          marginLeft: "20%",
                          borderRadius: "3px",
                          borderLeft: "2px solid #34a853",
                        }}
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="text-center pt-3">
                    <Button
                      style={{
                        width: "200px",
                        padding: "4px",
                        backgroundColor: "#34a853",
                        border: "none",
                        fontWeight: "bold",
                      }}
                      onClick={SignUp}
                    >
                      SignUp
                    </Button>
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    <b>Never share your login details with anyone.</b>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
